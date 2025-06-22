import 'dotenv/config'

export default {
  expo: {
    name: 'uniw-app',
    slug: 'uniw-app',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './src/assets/uniw_logo.png',
    userInterfaceStyle: 'light',
    newArchEnabled: true,
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ['**/*'],
    splash: {
      image: './src/assets/backgrounds/splash-background.png',
      resizeMode: 'cover',
      backgroundColor: '#ffffff',
    },
    ios: {
      supportsTablet: true,
    },
    android: {
      package: 'com.uniw.app',
      adaptiveIcon: {
        foregroundImage: './src/assets/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      edgeToEdgeEnabled: true,
    },
    web: {
      favicon: './src/assets/favicon.png',
    },
    plugins: ['expo-font', 'expo-dev-client', '@react-native-firebase/app'],
    extra: {
      eas: {
        projectId: '812553f4-aa20-4fba-b088-aa0528af72b3',
      },
      firebaseApiKey: process.env.FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
      firebaseDatabaseURL: process.env.FIREBASE_DATABASE_URL,
      firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
      firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      firebaseAppId: process.env.FIREBASE_APP_ID,
      firebaseMeasurementId: process.env.FIREBASE_MEASUREMENT_ID,
    },
  },
}
