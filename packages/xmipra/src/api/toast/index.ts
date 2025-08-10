import taro from '@tarojs/taro'
import { shallowMerge } from '@txjs/shared'
import { isString } from '@txjs/bool'
import type { UnknownCallback } from '@txjs/types'
import { logger } from '../../shared'

type ToastType = 'toast' | 'loading'

type ToastOption = NonNullable<Parameters<typeof taro.showToast>[0]>

type ToastEvent = 'success' | 'fail' | 'complete'

type ToastTitle = ToastOption['title']

type ToastIcon = ToastOption['icon']

type ToastImage = ToastOption['image']

type LoadingOption = NonNullable<Parameters<typeof taro.showLoading>[0]>

type LoadingTitle = LoadingOption['title']

class Toast {
  #locked = false
  #show = false
  #type?: ToastType
  #timer: any
  option: Omit<ToastOption, ToastEvent> = {
    title: '',
    icon: 'none',
    mask: true,
    duration: 1500,
  }

  constructor(option?: Partial<ToastOption>) {
    this.setConfig(option || {})
  }

  #setType(type?: ToastType, show = false) {
    this.#type = type
    this.#show = show
  }

  #showToast(partial: ToastTitle | ToastOption) {
    const option = { ...this.option } as ToastOption

    if (isString(partial)) {
      option.title = partial
    } else {
      shallowMerge(option, partial)
    }

    const { success, fail, duration } = option

    option.success = (res) => {
      this.#setType('toast', true)
      clearTimeout(this.#timer)
      this.#timer = setTimeout(() => {
        this.#setType()
      }, duration)
      success?.(res)
    }

    option.fail = (error) => {
      this.#setType()
      fail?.(error)
    }

    taro.showToast(option)
  }

  #hideToast(complete?: UnknownCallback) {
    try {
      taro.hideToast({
        noConflict: true,
        complete: (res) => {
          this.#locked = false
          this.#setType()
          complete?.(res)
        },
      })
    } catch (error) {
      logger.warn('toast', '异常调用hideToast方法', '\n', error)
    }
  }

  #showLoading(partial?: LoadingTitle | LoadingOption) {
    const option = {
      ...this.option,
      title: '',
    } as ToastOption

    if (process.env.TARO_ENV === 'tt') {
      option.title = '正在加载'
    }

    if (isString(partial)) {
      option.title = partial
    } else if (partial) {
      shallowMerge(option, partial)
    }

    const { success, fail } = option

    option.success = (res) => {
      this.#setType('loading', true)
      success?.(res)
    }

    option.fail = (error) => {
      this.#setType()
      fail?.(error)
    }

    taro.showLoading(option)
  }

  #hideLoading(complete?: UnknownCallback) {
    try {
      taro.hideLoading({
        noConflict: true,
        complete: (res) => {
          this.#locked = false
          this.#setType()
          complete?.(res)
        },
      })
    } catch (error) {
      logger.warn('toast', '异常调用hideLoading方法', '\n', error)
    }
  }

  #hide(complete?: UnknownCallback) {
    switch (this.#type) {
      case 'toast':
        this.#hideToast(complete)
        break
      case 'loading':
        this.#hideLoading(complete)
        break
    }
  }

  #makeIcon(icon: ToastIcon) {
    return (partial: ToastTitle | Omit<ToastOption, 'icon' | 'image'>) => {
      if (isString(partial)) {
        partial = { title: partial }
      }
      this.info({
        ...partial,
        icon,
        image: undefined,
      })
    }
  }

  makeImage(image: ToastImage) {
    return (partial: ToastTitle | Omit<ToastOption, 'icon' | 'image'>) => {
      if (isString(partial)) {
        partial = { title: partial }
      }
      this.info({
        ...partial,
        icon: undefined,
        image,
      })
    }
  }

  error = this.#makeIcon('error')

  success = this.#makeIcon('success')

  info(partial: ToastTitle | ToastOption) {
    if (this.#show) {
      this.hide()
    }
    this.#showToast(partial)
  }

  loading(partial?: LoadingTitle | LoadingOption) {
    if (this.#show) {
      this.hide()
    }
    this.#showLoading(partial)
  }

  liteLoading() {
    this.loading('正在加载')
  }

  hide(complete?: UnknownCallback) {
    if (this.#show && !this.#locked) {
      this.#locked = true
      this.#hide(complete)
    }
  }

  setConfig(option: Partial<Omit<ToastOption, ToastEvent>>) {
    shallowMerge(this.option, option)
  }
}

export default new Toast()
