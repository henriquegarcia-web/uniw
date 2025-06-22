import { Feather, MaterialCommunityIcons } from '@expo/vector-icons'

export type FeatherIcon = keyof typeof Feather.glyphMap
export type MaterialCommunityIconsIcon = keyof typeof MaterialCommunityIcons.glyphMap

export interface FormattedOption {
  label: string
  color?: string
  icon?: FeatherIcon
}
