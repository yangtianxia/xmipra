import type { TaroEnv } from './utils'
import type { ConditionItem } from '../plugins/condition'
import type {
  SeedToken as SeedToken2,
  MapToken as MapToken2,
} from '../plugins/theme/themes/interface'

interface SeedToken extends Record<TaroEnv, Partial<SeedToken2>>, SeedToken2 {}

interface ThemeMapToken {
  light: Partial<MapToken2>
  dark: Partial<MapToken2>
}

interface MapToken
  extends Record<TaroEnv, Partial<ThemeMapToken>>,
    ThemeMapToken {
  seedToken: Partial<SeedToken>
}

export interface Config {
  condition: ConditionItem[]
  theme: Partial<MapToken>
}

export function defineConfig(callback: () => Partial<Config>) {
  return callback
}
