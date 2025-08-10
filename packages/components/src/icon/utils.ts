import { numericProp } from '../utils/props'

export const iconSharedProps = {
  icon: String,
  iconSize: numericProp,
  iconPrefix: String,
}

export type IconPropKeys = Array<keyof typeof iconSharedProps>

export const iconPropKeys = Object.keys(iconSharedProps) as IconPropKeys
