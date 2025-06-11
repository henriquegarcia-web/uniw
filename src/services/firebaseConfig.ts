import Constants from 'expo-constants'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { initializeApp, getApps, getApp } from 'firebase/app'
import { initializeAuth, getReactNativePersistence } from 'firebase/auth'
import { getDatabase } from 'firebase/database'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: Constants.expoConfig?.extra?.firebaseApiKey,
  authDomain: Constants.expoConfig?.extra?.firebaseAuthDomain,
  databaseURL: Constants.expoConfig?.extra?.firebaseDatabaseURL,
  projectId: Constants.expoConfig?.extra?.firebaseProjectId,
  storageBucket: Constants.expoConfig?.extra?.firebaseStorageBucket,
  messagingSenderId: Constants.expoConfig?.extra?.firebaseMessagingSenderId,
  appId: Constants.expoConfig?.extra?.firebaseAppId,
  measurementId: Constants.expoConfig?.extra?.firebaseMeasurementId,
}

// --- INICIALIZAÇÃO SEGURA E COM PERSISTÊNCIA ---

let app

// Padrão Singleton: Verifica se o app já foi inicializado para evitar erros
if (!getApps().length) {
  app = initializeApp(firebaseConfig)
} else {
  app = getApp()
}

// Inicializa o Auth com persistência para React Native, exatamente como o erro sugere
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
})

// Inicializa os outros serviços
const database = getDatabase(app)
const storage = getStorage(app)

// Exporta as instâncias prontas para uso
export { auth, database, storage }
