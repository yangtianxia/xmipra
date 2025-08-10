import { format } from 'prettier'
import dayjs from 'dayjs'

export default async function generateConfig(theme: object, plugins?: string) {
  return await format(
    `
    /**
     * This is the automatically generated tailwindcss configuration file.
     * https://v3.tailwindcss.com/docs/presets#extending-multiple-presets
     * generated form [@xmipra/plugins]
     * @date ${dayjs().format('YYYY-MM-DD HH:mm:ss').toString()}
     */
    ${plugins ? `import plugin from 'tailwindcss/plugin'` : ''}
    import colors from 'tailwindcss/colors'

    /** @type import('tailwindcss').Config */
    export default {
      darkMode: 'media',
      content: ['./src/**/*.{html,vue,js,ts,jsx,tsx}'],
      corePlugins: {
        preflight: false,
      },
      theme: {
        colors: {
          inherit: colors.inherit,
          transparent: colors.transparent,
          current: colors.current,
          white: colors.white,
          black: colors.black,
          gray: colors.gray
        },
        extend: ${JSON.stringify(theme)}
      },
      ${plugins ? `plugins: ${plugins}` : ''}
    }
    `,
    {
      parser: 'typescript',
      semi: false,
      tabWidth: 2,
      useTabs: false,
      singleQuote: true,
      printWidth: 80,
      endOfLine: 'auto',
    }
  )
}
