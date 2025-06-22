import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons'
// import { Svg, Path } from 'react-native-svg'

import { themeApp, colors } from '@uniw/shared-constants'

import { CommonActions } from '@react-navigation/native'
import { MaterialCommunityIconsIcon } from '@uniw/shared-types'

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
        <Feather name="shopping-cart" size={26} color={colors.ui.background} />
      </TouchableOpacity>

      {/* Fundo da TabBar com SVG
      <Svg width={width} height={SVG_HEIGHT} style={styles.svgBackground}>
        <Path d={d} fill={colors.ui.background} stroke={colors.ui.border} />
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
              <MaterialCommunityIcons
                name={iconName}
                size={iconName === 'home-outline' ? 26 : 24}
                color={isFocused ? colors.text.secondary : colors.text.secondary}
              />
              <Text
                style={[
                  styles.tabLabel,
                  {
                    color: isFocused ? colors.text.secondary : colors.text.secondary,
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
const getIconName = (routeName: string): MaterialCommunityIconsIcon => {
  switch (routeName) {
    case 'HomeStack':
      return 'home-outline'
    case 'Favoritos':
      return 'heart-outline'
    case 'CategoryStack':
      return 'view-grid-outline'
    case 'ProfileStack':
      return 'account-circle-outline'
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
    backgroundColor: colors.ui.background,
    borderTopWidth: 1,
    borderColor: colors.ui.border,
    paddingBottom: themeApp.spacing.sm,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontFamily: themeApp.fonts.family.medium,
    fontSize: themeApp.fonts.size.xs,
    marginTop: 4,
  },
  centerButton: {
    top: -15,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.brand.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    shadowColor: colors.brand.secondary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    zIndex: 10,
  },
})
