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
    splash: {
      image: './src/assets/uniw_logo.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './src/assets/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      edgeToEdgeEnabled: true,
    },
    web: {
      favicon: './src/assets/favicon.png',
    },
    plugins: ['expo-font'],
    extra: {
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
