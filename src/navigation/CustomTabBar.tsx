import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { Feather } from '@expo/vector-icons'
import { Svg, Path } from 'react-native-svg'

import { theme } from '@/styles/theme'

const { width } = Dimensions.get('window')
const TAB_BAR_HEIGHT = 65
const SVG_HEIGHT = TAB_BAR_HEIGHT + 20

export const CustomTabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  // SVG Path para a forma da TabBar com o recorte no meio
  const d = `M0,20 Q0,0 20,0 H${width / 2 - 40} Q${width / 2 - 20},0 ${width / 2 - 15},15 L${width / 2},50 L${width / 2 + 15},15 Q${width / 2 + 20},0 ${width / 2 + 40},0 H${width - 20} Q${width},0 ${width},20 V${SVG_HEIGHT} H0 Z`

  return (
    <View style={styles.container}>
      {/* Botão central flutuante */}
      <TouchableOpacity
        style={styles.centerButton}
        onPress={() => navigation.navigate('CartStack')}
        activeOpacity={0.8}
      >
        <Feather name="shopping-cart" size={26} color={theme.colors.background} />
      </TouchableOpacity>

      {/* Fundo da TabBar com SVG */}
      <Svg width={width} height={SVG_HEIGHT} style={styles.svgBackground}>
        <Path d={d} fill={theme.colors.background} />
      </Svg>

      {/* Container dos ícones */}
      <View style={styles.tabBarInner}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key]
          const label = options.title !== undefined ? options.title : route.name
          const isFocused = state.index === index
          const iconName = getIconName(route.name)

          // Oculta o botão do carrinho do meio, pois já temos o flutuante
          if (route.name === 'CartStack') {
            return <View key={route.key} style={styles.tabItem} />
          }

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            })

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name)
            }
          }

          return (
            <TouchableOpacity key={route.key} style={styles.tabItem} onPress={onPress}>
              <Feather
                name={iconName}
                size={24}
                color={isFocused ? theme.colors.secondary : theme.colors.text_secondary}
              />
              <Text
                style={[
                  styles.tabLabel,
                  {
                    color: isFocused
                      ? theme.colors.secondary
                      : theme.colors.text_secondary,
                  },
                ]}
              >
                {label}
              </Text>
            </TouchableOpacity>
          )
        })}
      </View>
    </View>
  )
}

// Função auxiliar para mapear nomes de rota para nomes de ícones
const getIconName = (routeName: string): keyof typeof Feather.glyphMap => {
  switch (routeName) {
    case 'HomeStack':
      return 'home'
    case 'Wishlist':
      return 'heart'
    case 'Search':
      return 'search'
    case 'SettingsStack':
      return 'settings'
    default:
      return 'circle'
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: TAB_BAR_HEIGHT,
    alignItems: 'center',
  },
  svgBackground: {
    position: 'absolute',
    top: -20,
    elevation: 8, // Sombra para Android
    shadowColor: '#000', // Sombra para iOS
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tabBarInner: {
    position: 'absolute',
    bottom: 0,
    height: TAB_BAR_HEIGHT,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: 10,
    marginTop: 4,
    fontFamily: theme.fonts.family.medium,
  },
  centerButton: {
    top: -15,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: theme.colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    shadowColor: theme.colors.secondary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    zIndex: 10,
  },
})
