// src/screens/SplashScreen.tsx

import React from 'react'
import { StyleSheet, SafeAreaView } from 'react-native'

import { globalStyles } from '@/styles/global'
import { theme } from '@/styles/theme'

const SplashScreen = () => {
  return <SafeAreaView style={styles.safeArea}></SafeAreaView>
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
})

export default SplashScreen
