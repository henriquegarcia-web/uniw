import { Feather } from '@expo/vector-icons'

type FeatherIconName = keyof typeof Feather.glyphMap

export interface FormattedOption {
  label: string
  color?: string
  icon?: FeatherIconName
}
