import { StatusBar } from 'expo-status-bar'
import { useFonts } from 'expo-font'

import { Routes } from '@/navigation'
import { AuthProvider } from '@/contexts/ClientAuthProvider'
import { ProfileProvider } from '@/contexts/ClientProfileProvider'
import { MenuProvider } from '@/contexts/MenuProvider'
import { SideMenu } from './components/SideMenu'
import { SearchProvider } from '@/contexts/SearchProvider'
import { HelpCenterProvider } from '@/contexts/HelpCenterProvider'
import { FirebaseProvider } from '@/contexts/FirebaseContext'
import SplashScreen from '@/screens/SplashScreen'

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
    <FirebaseProvider>
      <AuthProvider>
        <HelpCenterProvider>
          <ProfileProvider>
            <MenuProvider>
              <SearchProvider>
                <StatusBar style="auto" />
                <Routes />
                <SideMenu />
              </SearchProvider>
            </MenuProvider>
          </ProfileProvider>
        </HelpCenterProvider>
      </AuthProvider>
    </FirebaseProvider>
  )
}
