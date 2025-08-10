declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV?: 'production' | 'development'
      TARO_ENV?: 'weapp' | 'alipay' | 'tt'
    }
  }
}

export {}
