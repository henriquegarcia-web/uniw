import { initializeApp, getApp, getApps, FirebaseApp } from 'firebase/app'
import { getAuth, initializeAuth, Persistence, Auth } from 'firebase/auth'
import { getDatabase, Database } from 'firebase/database'
import { getStorage, FirebaseStorage } from 'firebase/storage'

export interface FirebaseConfig {
  apiKey?: string
  authDomain?: string
  databaseURL?: string
  projectId?: string
  storageBucket?: string
  messagingSenderId?: string
  appId?: string
  measurementId?: string
}

// 1. Crie variáveis no escopo do módulo para armazenar as instâncias.
let firebaseApp: FirebaseApp
let auth: Auth
let database: Database
let storage: FirebaseStorage

// A função de inicialização agora popula essas variáveis em vez de retornar.
export const initializeFirebase = (config: FirebaseConfig, persistence?: Persistence) => {
  if (!getApps().length) {
    firebaseApp = initializeApp(config)
  } else {
    firebaseApp = getApp()
  }

  // Popula as variáveis do módulo
  auth = persistence ? initializeAuth(firebaseApp, { persistence }) : getAuth(firebaseApp)
  database = getDatabase(firebaseApp)
  storage = getStorage(firebaseApp)

  console.log('Firebase services initialized successfully.')
}

// 2. Crie e exporte "getters" para acessar as instâncias de forma segura.
export const getFirebaseAuth = (): Auth => {
  if (!auth) {
    throw new Error('Firebase Auth not initialized. Call initializeFirebase() first.')
  }
  return auth
}

export const getFirebaseDb = (): Database => {
  if (!database) {
    throw new Error('Firebase Database not initialized. Call initializeFirebase() first.')
  }
  return database
}

export const getFirebaseStorage = (): FirebaseStorage => {
  if (!storage) {
    throw new Error('Firebase Storage not initialized. Call initializeFirebase() first.')
  }
  return storage
}
