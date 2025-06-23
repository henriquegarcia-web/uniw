// import { SignInSchemaType } from '@uniw/shared-schemas'
import { AuthProvider, IUser, UserRole, UserStatus } from '@uniw/shared-types'
import { getFirebaseAuth, getFirebaseDb, getFirebaseStorage } from './firebase'
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
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  Unsubscribe,
  type User as FirebaseUser,
} from '@firebase/auth'
import {
  getDownloadURL,
  uploadBytes,
  ref as storageRef,
  deleteObject,
} from '@firebase/storage'

export async function isEmailInUse(email: string): Promise<boolean> {
  try {
    // 2. Chame o getter para obter a instância do banco de dados.
    const database = getFirebaseDb()
    const usersRef = ref(database, 'users')
    const emailQuery = query(usersRef, orderByChild('baseProfile/email'), equalTo(email))
    const snapshot = await get(emailQuery)
    return snapshot.exists()
  } catch (error) {
    console.error('Erro ao verificar EMAIL:', error)
    return false
  }
}

export async function isCpfInUse(cpf: string): Promise<boolean> {
  try {
    // Chame o getter novamente aqui.
    const database = getFirebaseDb()
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

// =================================================== COMMON

export function listenForAuthChanges(
  callback: (authData: { user: IUser | null; token: string | null }) => void,
): Unsubscribe {
  const auth = getFirebaseAuth()

  const unsubscribe = onAuthStateChanged(
    auth,
    async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        // Usuário está logado
        const [fullUser, token] = await Promise.all([
          getFullUserData(firebaseUser.uid),
          firebaseUser.getIdToken(),
        ])
        callback({ user: fullUser, token })
      } else {
        // Usuário está deslogado
        callback({ user: null, token: null })
      }
    },
  )

  return unsubscribe
}

export async function logout(): Promise<void> {
  try {
    const auth = getFirebaseAuth()
    await signOut(auth)
  } catch (error: any) {
    throw new Error('Não foi possível fazer logout.')
  }
}

export async function resetPassword(email: string): Promise<void> {
  try {
    const auth = getFirebaseAuth()
    await sendPasswordResetEmail(auth, email)
  } catch (error: any) {
    throw new Error('Não foi possível enviar o e-mail de redefinição.')
  }
}

export async function getFullUserData(userId: string): Promise<IUser | null> {
  try {
    const database = getFirebaseDb()
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

export async function updateUserName(userId: string, newName: string): Promise<void> {
  try {
    const database = getFirebaseDb()

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
    const database = getFirebaseDb()
    const storage = getFirebaseStorage()

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
  const database = getFirebaseDb()
  const storage = getFirebaseStorage()

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

// =================================================== APP (CLIENTE)

export async function clientSignIn(
  email: string,
  password: string,
): Promise<FirebaseUser> {
  try {
    const auth = getFirebaseAuth()
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return userCredential.user
  } catch (error: any) {
    throw new Error('E-mail ou senha inválidos.')
  }
}

export async function clientSignUp(
  nome: string,
  email: string,
  cpf: string,
  password: string,
): Promise<IUser> {
  try {
    const auth = getFirebaseAuth()
    const database = getFirebaseDb()

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
        verificacoes: {
          identidade: false,
          telefone: false,
        },
        authProviders: [
          {
            providerId: AuthProvider.EMAIL,
            uid: firebaseUser.uid,
            email: firebaseUser.email,
          },
        ],
      },
      clientProfile: {
        favoritos: null,
        historicoCompras: null,
        historicoAgendamentos: null,
        clube: null,
        fidelidade: {
          pointsBalance: 0,
          pointsHistory: null,
          coupons: null,
        },
        notifications: null,
        notificationsSettings: {
          promotions: {
            push: false,
            email: false,
            whatsapp: false,
          },
          orderUpdates: {
            push: false,
            email: false,
            whatsapp: false,
          },
          announcements: {
            push: false,
            email: false,
            whatsapp: false,
          },
        },
        cartoesSalvos: null,
        enderecosSalvos: null,
      },
      partnerProfile: null,
      providerProfile: null,
      adminProfile: null,
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

// =================================================== WEB (ADMIN, PARCEIRO E FORNECEDOR)

// export type WebLoginPayload = SignInSchemaType & {
//   roleToValidate: UserRole
// }

export async function webLoginUser({ email, password, roleToValidate }: any) {
  const auth = getFirebaseAuth()
  const database = getFirebaseDb()

  const cred = await signInWithEmailAndPassword(auth, email, password)
  const uid = cred.user.uid
  const userSnap = await get(ref(database, `users/${uid}`))

  if (!userSnap.exists()) {
    throw new Error('Usuário não encontrado no banco de dados.')
  }

  const user = userSnap.val() as IUser

  if (user.role !== roleToValidate) {
    throw new Error('Acesso negado.')
  }

  const token = await cred.user.getIdToken()

  return {
    user,
    token,
  }
}
