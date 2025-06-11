import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  type User as FirebaseUser,
} from 'firebase/auth'
import { ref, set, get, child } from 'firebase/database'

import { auth, database } from './firebaseConfig'
import {
  IUser,
  IBaseProfile,
  IClienteProfile,
  UserRole,
  UserStatus,
  AuthProvider,
} from '@/types/auth'

export async function signUp(
  nome: string,
  email: string,
  password: string,
): Promise<IUser> {
  try {
    // 1. Cria o usuário no Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const firebaseUser = userCredential.user

    // 2. Prepara os dados do perfil para o Realtime Database
    const now = Date.now()
    const newUser: IUser = {
      id: firebaseUser.uid,
      role: UserRole.CLIENTE, // Define o papel padrão como Cliente
      status: UserStatus.ATIVO, // Define o status padrão como Ativo
      baseProfile: {
        nome,
        email,
        cpf: '', // Coletar em outra etapa do cadastro
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

    // 3. Salva o perfil do usuário no Realtime Database
    const userRef = ref(database, `users/${firebaseUser.uid}`)
    await set(userRef, newUser)

    return newUser
  } catch (error: any) {
    // Aqui você pode tratar erros específicos do Firebase (ex: email já em uso)
    console.error('Erro no cadastro:', error.message)
    throw new Error('Não foi possível registrar o usuário.')
  }
}

export async function signIn(email: string, password: string): Promise<FirebaseUser> {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return userCredential.user
  } catch (error: any) {
    // Trata erros como senha incorreta ou usuário não encontrado
    // console.error('Erro no login:', error.message)
    throw new Error('E-mail ou senha inválidos.')
  }
}

export async function logout(): Promise<void> {
  try {
    await signOut(auth)
  } catch (error: any) {
    // console.error('Erro ao fazer logout:', error.message)
    throw new Error('Não foi possível fazer logout.')
  }
}

export async function resetPassword(email: string): Promise<void> {
  try {
    await sendPasswordResetEmail(auth, email)
  } catch (error: any) {
    // console.error('Erro ao redefinir senha:', error.message)
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
    // console.error('Erro ao buscar dados do usuário:', error)
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
