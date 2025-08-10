/// <reference types="vue/jsx" />
/// <reference types="@tarojs/taro" />
/// <reference types="@tarojs/components/types/index.vue3" />

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production'
    }
  }

  interface IUserInfo {
    [x: string]: any
  }

  interface IPageQuery {
    [x: string]: any
  }

  interface IPageRes<T> {
    records: T[]
    total: number
    size: number
    current: number
    pages: number
  }
}

export {}
