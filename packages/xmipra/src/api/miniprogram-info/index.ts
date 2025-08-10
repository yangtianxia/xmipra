import taro from '@tarojs/taro'
import { isNil } from '@txjs/bool'

type InstanceResult = ReturnType<typeof taro.getAccountInfoSync>

type MiniProgramInfo = InstanceResult['miniProgram']

function formatEnvVersion(env: string) {
  switch (env) {
    case 'production':
      return 'release'
    case 'development':
      return 'develop'
    case 'preview':
      return 'trial'
  }
}

let miniProgramInfo: MiniProgramInfo

export function getMiniProgramInfo() {
  if (isNil(miniProgramInfo)) {
    if (process.env.TARO_ENV === 'tt') {
      const { microapp } = taro.getEnvInfoSync()
      miniProgramInfo = {
        appId: microapp.appId,
        envVersion: formatEnvVersion(microapp.mpVersion)!,
        version: microapp.mpVersion,
      }
    } else {
      if (taro.canIUse('getAccountInfoSync')) {
        miniProgramInfo = taro.getAccountInfoSync().miniProgram
      }
    }
  }
  return miniProgramInfo || {}
}
