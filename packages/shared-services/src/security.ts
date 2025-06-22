import { getFirebaseAuth, getFirebaseDb } from './firebase'
import { ref, set, update } from 'firebase/database'
import {
  deleteUser,
  EmailAuthProvider,
  PhoneAuthProvider,
  reauthenticateWithCredential,
  sendEmailVerification,
  updateEmail,
  updatePassword,
  updatePhoneNumber,
} from '@firebase/auth'

export async function reauthenticate(currentPassword: string): Promise<void> {
  const auth = getFirebaseAuth()

  const user = auth.currentUser
  if (!user || !user.email) {
    throw new Error('Nenhum usuário encontrado para reautenticação.')
  }

  const credential = EmailAuthProvider.credential(user.email, currentPassword)

  try {
    await reauthenticateWithCredential(user, credential)
  } catch (error: any) {
    console.error('Falha na reautenticação:', error)
    if (error.code === 'auth/wrong-password') {
      throw new Error('A senha atual está incorreta.')
    }
    throw new Error('Não foi possível verificar sua identidade.')
  }
}

export async function changePassword(newPassword: string): Promise<void> {
  const auth = getFirebaseAuth()

  const user = auth.currentUser
  if (!user) {
    throw new Error('Nenhum usuário autenticado para alterar a senha.')
  }

  try {
    await updatePassword(user, newPassword)
  } catch (error: any) {
    console.error('Erro ao alterar a senha:', error)
    throw new Error('Não foi possível alterar a senha.')
  }
}

export async function updateUserEmail(userId: string, newEmail: string): Promise<void> {
  const auth = getFirebaseAuth()
  const user = auth.currentUser
  if (!user) {
    throw new Error('Nenhum usuário autenticado.')
  }

  try {
    const database = getFirebaseDb()

    // 1. Atualiza o e-mail no Firebase Authentication
    await updateEmail(user, newEmail)

    // 2. Atualiza o e-mail no Realtime Database
    const updates: { [key: string]: any } = {}
    updates[`/users/${userId}/baseProfile/email`] = newEmail
    updates[`/users/${userId}/updatedAt`] = Date.now()

    await update(ref(database), updates)

    // 3. Envia um e-mail de verificação para o novo endereço (boa prática)
    await sendEmailVerification(user)
  } catch (error: any) {
    console.error('Erro ao atualizar e-mail:', error.message)
    if (error.code === 'auth/email-already-in-use') {
      throw new Error('Este e-mail já está em uso por outra conta.')
    }
    if (error.code === 'auth/requires-recent-login') {
      throw new Error(
        'Esta operação é sensível e requer autenticação recente. Por favor, faça login novamente.',
      )
    }
    throw new Error('Não foi possível atualizar o e-mail.')
  }
}

export async function startPhoneNumberVerification(
  phoneNumber: string,
  recaptchaVerifier: any,
): Promise<string> {
  try {
    const auth = getFirebaseAuth()

    const phoneProvider = new PhoneAuthProvider(auth)
    const verificationId = await phoneProvider.verifyPhoneNumber(
      phoneNumber,
      recaptchaVerifier,
    )
    return verificationId
  } catch (error: any) {
    console.error('Erro ao iniciar verificação de telefone:', error)
    throw new Error('Não foi possível iniciar a verificação. Tente novamente.')
  }
}

export async function confirmPhoneNumberUpdate(
  userId: string,
  verificationId: string,
  otpCode: string,
  newPhone: string,
): Promise<void> {
  const auth = getFirebaseAuth()
  const user = auth.currentUser
  if (!user) {
    throw new Error('Nenhum usuário autenticado.')
  }

  try {
    const database = getFirebaseDb()

    const credential = PhoneAuthProvider.credential(verificationId, otpCode)
    await updatePhoneNumber(user, credential)

    // Se a atualização no Auth funcionou, atualiza no DB
    const updates: { [key: string]: any } = {}
    updates[`/users/${userId}/baseProfile/telefone`] = newPhone.replace('+55', '')
    updates[`/users/${userId}/baseProfile/verificacoes/telefone`] = true
    updates[`/users/${userId}/updatedAt`] = Date.now()

    await update(ref(database), updates)
  } catch (error: any) {
    console.error('Erro ao confirmar o código OTP:', error)
    if (error.code === 'auth/invalid-verification-code') {
      throw new Error('O código de verificação é inválido.')
    }
    throw new Error('Não foi possível atualizar o número de telefone.')
  }
}

export async function clientDeleteUserAccount(currentPassword: string): Promise<void> {
  const auth = getFirebaseAuth()
  const database = getFirebaseDb()

  const user = auth.currentUser
  if (!user || !user.email) {
    throw new Error('Nenhum usuário autenticado para excluir.')
  }

  try {
    const credential = EmailAuthProvider.credential(user.email, currentPassword)
    await reauthenticateWithCredential(user, credential)

    const userDbRef = ref(database, `users/${user.uid}`)
    await set(userDbRef, null)

    await deleteUser(user)
  } catch (error: any) {
    console.error('Erro ao excluir a conta:', error.message)
    if (error.code === 'auth/wrong-password') {
      throw new Error('A senha está incorreta. Não foi possível excluir a conta.')
    }
    throw new Error('Ocorreu um erro e não foi possível excluir sua conta.')
  }
}
