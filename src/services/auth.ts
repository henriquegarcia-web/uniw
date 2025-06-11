import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  type User as FirebaseUser,
  fetchSignInMethodsForEmail,
} from 'firebase/auth'
import { ref, set, get, child, equalTo, orderByChild, query } from 'firebase/database'

import { auth, database } from './firebaseConfig'
import { IUser, IBaseProfile, UserRole, UserStatus, AuthProvider } from '@/types/auth'

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
  data: Partial<IBaseProfile>, // Exemplo usando apenas o perfil base
): Promise<void> {
  // TODO: Implementar a lógica de atualização usando a função `update` do Firebase Realtime Database.
  // Ex: const userRef = ref(database, `users/${userId}/baseProfile`);
  // await update(userRef, data);
  // console.log('Atualizando perfil para o usuário:', userId, 'com dados:', data)
}
