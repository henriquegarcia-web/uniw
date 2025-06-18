import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { Feather } from '@expo/vector-icons'
// import { Svg, Path } from 'react-native-svg'

import { theme } from '@/styles/theme'
import { CommonActions } from '@react-navigation/native'

const { width } = Dimensions.get('window')
const TAB_BAR_HEIGHT = 75
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

      {/* Fundo da TabBar com SVG
      <Svg width={width} height={SVG_HEIGHT} style={styles.svgBackground}>
        <Path d={d} fill={theme.colors.background} stroke={theme.colors.border} />
      </Svg> */}

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
            const isFocused = state.index === index

            // Previne a ação padrão de toque na aba
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            })

            if (!event.defaultPrevented) {
              // Esta é a ação que navega E reseta a pilha
              navigation.dispatch({
                ...CommonActions.navigate(route.name, route.params),
                target: state.key,
              })
            }
          }

          // const onPress = () => {
          //   const event = navigation.emit({
          //     type: 'tabPress',
          //     target: route.key,
          //     canPreventDefault: true,
          //   })

          //   if (!isFocused && !event.defaultPrevented) {
          //     navigation.navigate(route.name)
          //   }
          // }

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
    case 'Favoritos':
      return 'heart'
    case 'CategoryStack':
      return 'grid'
    case 'ProfileStack':
      return 'user'
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
    backgroundColor: 'white',
  },
  tabBarInner: {
    position: 'absolute',
    bottom: 0,
    height: TAB_BAR_HEIGHT,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    borderTopWidth: 1,
    borderColor: theme.colors.border,
    paddingBottom: theme.spacing.sm,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontFamily: theme.fonts.family.medium,
    fontSize: theme.fonts.size.xs,
    marginTop: 4,
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
