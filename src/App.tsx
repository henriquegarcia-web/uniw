import { StatusBar } from 'expo-status-bar'
import { useFonts } from 'expo-font'

import { Routes } from '@/navigation'
import { AuthProvider } from '@/contexts/ClientAuthProvider'
import { MenuProvider } from '@/contexts/MenuProvider'
import { SideMenu } from './components/SideMenu'
import SplashScreen from './screens/SplashScreen'

export default function App() {
  const [fontsLoaded] = useFonts({
    'Montserrat-Thin': require('@/assets/fonts/Montserrat-Thin.ttf'),
    'Montserrat-ExtraLight': require('@/assets/fonts/Montserrat-ExtraLight.ttf'),
    'Montserrat-Light': require('@/assets/fonts/Montserrat-Light.ttf'),
    'Montserrat-Regular': require('@/assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-Medium': require('@/assets/fonts/Montserrat-Medium.ttf'),
    'Montserrat-SemiBold': require('@/assets/fonts/Montserrat-SemiBold.ttf'),
    'Montserrat-Bold': require('@/assets/fonts/Montserrat-Bold.ttf'),
    'Montserrat-ExtraBold': require('@/assets/fonts/Montserrat-ExtraBold.ttf'),
    'Montserrat-Black': require('@/assets/fonts/Montserrat-Black.ttf'),
  })

  if (!fontsLoaded) {
    return <SplashScreen />
  }

  return (
    <AuthProvider>
      <MenuProvider>
        <StatusBar style="auto" />
        <Routes />
        <SideMenu />
      </MenuProvider>
    </AuthProvider>
  )
}
