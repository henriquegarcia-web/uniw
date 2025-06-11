// src/navigation/index.tsx

import React from 'react'
import { NavigationContainer } from '@react-navigation/native'

import { AuthStack } from '@/navigation/AuthStack'
import { MainTabNavigator } from '@/navigation/MainTabNavigator'
import { OnBoardingStack } from '@/navigation/OnBoardingStack'

import { useClientAuth } from '@/contexts/ClientAuthProvider'

export function Routes() {
  const { isAuthenticated, hasCompletedOnboarding } = useClientAuth()

  return (
    <NavigationContainer>
      {!hasCompletedOnboarding ? (
        <OnBoardingStack />
      ) : isAuthenticated ? (
        <MainTabNavigator />
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  )
}
