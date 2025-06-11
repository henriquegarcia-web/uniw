// src/screens/OnBoardingScreen.tsx

import React from 'react'
import {
  StyleSheet,
  SafeAreaView,
  Text,
  ImageBackground,
  View,
  StatusBar,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

import type { OnboardingScreenProps } from '@/navigation/types'
import { theme } from '@/styles/theme'
import { useClientAuth } from '@/contexts/ClientAuthProvider'
import { Button } from '@/components/forms/Button'

const OnboardingScreen = ({ navigation }: OnboardingScreenProps) => {
  const { completeOnboarding } = useClientAuth()

  const handleStart = () => {
    completeOnboarding()
  }

  return (
    <ImageBackground
      source={require('@/assets/backgrounds/onboarding-background.jpg')}
      resizeMode="cover"
      style={styles.background}
    >
      <StatusBar barStyle="light-content" />

      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.6)', 'rgba(0,0,0,0.8)']}
        style={styles.gradient}
      />

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Unindo clientes e negócios!</Text>
          <Text style={styles.subtitle}>Encontre seu produto, compre agora!</Text>

          <View>
            <Button title="Iniciar" variant="secondary" onPress={handleStart} />
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '50%',
  },
  safeArea: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
  },
  contentContainer: {
    maxWidth: 280,
  },
  title: {
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
    fontFamily: theme.fonts.family.semiBold,
    fontSize: theme.fonts.size['2xl'],
    color: theme.colors.background,
  },
  subtitle: {
    color: theme.colors.background,
    fontFamily: theme.fonts.family.regular,
    fontSize: theme.fonts.size.sm,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  },
})

export default OnboardingScreen
