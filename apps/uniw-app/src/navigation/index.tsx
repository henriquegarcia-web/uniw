// src/navigation/index.tsx

import React from 'react'
import { NavigationContainer } from '@react-navigation/native'

import { AuthStack } from '@/navigation/AuthStack'
import { OnBoardingStack } from '@/navigation/OnBoardingStack'

import SplashScreen from '@/screens/SplashScreen'
import { useClientAuth } from '@/contexts/ClientAuthProvider'
import { navigationRef, onNavigationReady } from '@/services/navigation'
import { AppStack } from './AppStack'

export function Routes() {
  const { isAuthenticated, isLoadingAuth, hasCompletedOnboarding, isLoadingOnboarding } =
    useClientAuth()

  if (isLoadingAuth || isLoadingOnboarding) {
    return <SplashScreen />
  }

  return (
    <NavigationContainer ref={navigationRef} onReady={onNavigationReady}>
      {!hasCompletedOnboarding ? (
        <OnBoardingStack />
      ) : isAuthenticated ? (
        <AppStack />
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  )
}
