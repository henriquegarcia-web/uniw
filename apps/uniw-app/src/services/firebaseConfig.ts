import Constants from 'expo-constants'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getReactNativePersistence } from 'firebase/auth'

import { initializeFirebase, FirebaseConfig } from '@uniw/shared-services'

export const firebaseConfig: FirebaseConfig = {
  apiKey: Constants.expoConfig?.extra?.firebaseApiKey,
  authDomain: Constants.expoConfig?.extra?.firebaseAuthDomain,
  databaseURL: Constants.expoConfig?.extra?.firebaseDatabaseURL,
  projectId: Constants.expoConfig?.extra?.firebaseProjectId,
  storageBucket: Constants.expoConfig?.extra?.firebaseStorageBucket,
  messagingSenderId: Constants.expoConfig?.extra?.firebaseMessagingSenderId,
  appId: Constants.expoConfig?.extra?.firebaseAppId,
  measurementId: Constants.expoConfig?.extra?.firebaseMeasurementId,
}

const persistence = getReactNativePersistence(AsyncStorage)

initializeFirebase(firebaseConfig, persistence)
