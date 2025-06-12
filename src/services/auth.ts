import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  type User as FirebaseUser,
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
} from 'firebase/auth'
import {
  ref,
  set,
  get,
  child,
  equalTo,
  orderByChild,
  query,
  update,
} from 'firebase/database'

import { auth, database, storage } from './firebaseConfig'
import { IUser, IBaseProfile, UserRole, UserStatus, AuthProvider } from '@/types/auth'
import {
  getDownloadURL,
  uploadBytes,
  ref as storageRef,
  deleteObject,
} from 'firebase/storage'

export async function isEmailInUse(email: string): Promise<boolean> {
  try {
    const usersRef = ref(database, 'users')
    const cpfQuery = query(usersRef, orderByChild('baseProfile/email'), equalTo(email))
    const snapshot = await get(cpfQuery)
    return snapshot.exists()
  } catch (error) {
    console.error('Erro ao verificar EMAIL:', error)
    return false
  }
}

export async function isCpfInUse(cpf: string): Promise<boolean> {
  try {
    const cleanedCpf = cpf.replace(/\D/g, '')
    const usersRef = ref(database, 'users')
    const cpfQuery = query(usersRef, orderByChild('baseProfile/cpf'), equalTo(cleanedCpf))
    const snapshot = await get(cpfQuery)
    return snapshot.exists()
  } catch (error) {
    console.error('Erro ao verificar CPF:', error)
    return false
  }
}

export async function signUp(
  nome: string,
  email: string,
  cpf: string,
  password: string,
): Promise<IUser> {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const firebaseUser = userCredential.user

    const now = Date.now()
    const newUser: IUser = {
      id: firebaseUser.uid,
      role: UserRole.CLIENTE,
      status: UserStatus.ATIVO,
      baseProfile: {
        nome,
        email,
        cpf: cpf.replace(/\D/g, ''),
        foto: null,
        telefone: null,
        dataNascimento: null,
        endereco: {
          cep: null,
          rua: null,
          numero: null,
          bairro: null,
          cidade: null,
          estado: null,
        },
        authProviders: [
          {
            providerId: AuthProvider.EMAIL,
            uid: firebaseUser.uid,
            email: firebaseUser.email,
          },
        ],
      },
      clienteProfile: {
        favoritos: null,
        historicoCompras: null,
        historicoAgendamentos: null,
        cartoesSalvos: null,
      },
      createdAt: now,
      updatedAt: now,
    }

    const userRef = ref(database, `users/${firebaseUser.uid}`)
    await set(userRef, newUser)

    return newUser
  } catch (error: any) {
    throw new Error('Não foi possível registrar o usuário.')
  }
}

export async function signIn(email: string, password: string): Promise<FirebaseUser> {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return userCredential.user
  } catch (error: any) {
    throw new Error('E-mail ou senha inválidos.')
  }
}

export async function logout(): Promise<void> {
  try {
    await signOut(auth)
  } catch (error: any) {
    throw new Error('Não foi possível fazer logout.')
  }
}

export async function resetPassword(email: string): Promise<void> {
  try {
    await sendPasswordResetEmail(auth, email)
  } catch (error: any) {
    throw new Error('Não foi possível enviar o e-mail de redefinição.')
  }
}

export async function getFullUserData(userId: string): Promise<IUser | null> {
  try {
    const dbRef = ref(database)
    const snapshot = await get(child(dbRef, `users/${userId}`))
    if (snapshot.exists()) {
      return snapshot.val() as IUser
    }
    return null
  } catch (error) {
    return null
  }
}

export async function updateProfile(
  userId: string,
  data: Partial<Pick<IBaseProfile, 'telefone' | 'endereco'>>,
): Promise<void> {
  try {
    if ('telefone' in data && data.telefone !== undefined) {
      const telefoneRef = ref(database, `/users/${userId}/baseProfile/telefone`)
      await set(telefoneRef, data.telefone)
    }

    if (data.endereco) {
      for (const [key, value] of Object.entries(data.endereco)) {
        if (value !== undefined) {
          const enderecoFieldRef = ref(
            database,
            `/users/${userId}/baseProfile/endereco/${key}`,
          )
          await set(enderecoFieldRef, value)
        }
      }
    }

    const updatedAtRef = ref(database, `/users/${userId}/updatedAt`)
    await set(updatedAtRef, Date.now())
  } catch (error: any) {
    console.error('Erro ao atualizar o perfil:', error.message)
    throw new Error('Não foi possível atualizar os dados do perfil.')
  }
}

export async function updateUserName(userId: string, newName: string): Promise<void> {
  try {
    const updates: { [key: string]: any } = {}
    updates[`/users/${userId}/baseProfile/nome`] = newName
    updates[`/users/${userId}/updatedAt`] = Date.now()

    const dbRef = ref(database)
    await update(dbRef, updates)
  } catch (error: any) {
    console.error('Erro ao atualizar o nome:', error.message)
    throw new Error('Não foi possível atualizar o nome do usuário.')
  }
}

export async function updateUserProfilePicture(
  userId: string,
  imageUri: string,
): Promise<string> {
  try {
    const response = await fetch(imageUri)
    const blob = await response.blob()

    const fileExtension = imageUri.split('.').pop()
    const fileName = `profile_${Date.now()}.${fileExtension}`
    const imageRef = storageRef(storage, `profile_pictures/${userId}/${fileName}`)

    await uploadBytes(imageRef, blob)

    const downloadURL = await getDownloadURL(imageRef)

    const updates: { [key: string]: any } = {}
    updates[`/users/${userId}/baseProfile/foto`] = downloadURL
    updates[`/users/${userId}/updatedAt`] = Date.now()

    const dbRef = ref(database)
    await update(dbRef, updates)

    return downloadURL
  } catch (error: any) {
    console.error('Erro ao fazer upload da foto de perfil:', error.message)
    throw new Error('Não foi possível atualizar a foto de perfil.')
  }
}

export async function removeUserProfilePicture(
  userId: string,
  photoUrl: string,
): Promise<void> {
  try {
    const imageRef = storageRef(storage, photoUrl)

    await deleteObject(imageRef)

    const updates: { [key: string]: any } = {}
    updates[`/users/${userId}/baseProfile/foto`] = null
    updates[`/users/${userId}/updatedAt`] = Date.now()

    const dbRef = ref(database)
    await update(dbRef, updates)
  } catch (error: any) {
    if (error.code === 'storage/object-not-found') {
      console.log('Arquivo já não existia no Storage, limpando apenas o banco de dados.')
      const updates: { [key: string]: any } = {}
      updates[`/users/${userId}/baseProfile/foto`] = null
      updates[`/users/${userId}/updatedAt`] = Date.now()
      await update(ref(database), updates)
    } else {
      console.error('Erro ao remover a foto de perfil:', error.message)
      throw new Error('Não foi possível remover a foto de perfil.')
    }
  }
}

export async function reauthenticate(currentPassword: string): Promise<void> {
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
