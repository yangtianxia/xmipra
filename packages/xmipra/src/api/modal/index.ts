import taro from '@tarojs/taro'
import { shallowMerge, omit } from '@txjs/shared'
import { isString } from '@txjs/bool'

declare module '@tarojs/taro' {
  namespace showModal {
    interface Option {
      /** 是否显示输入框 */
      editable?: boolean
      /** 显示输入框时的提示文本 */
      placeholderText?: string
      /**
       * @supported alipay
       * @default 请输入内容
       */
      message?: string
      /**
       * @supported alipay
       * @default center
       */
      align?: 'left' | 'center' | 'right'
    }

    interface SuccessCallbackResult {
      /** editable 为 true 时，用户输入的文本 */
      content?: string
    }
  }
}

type ModalOptionBase = NonNullable<Parameters<typeof taro.showModal>[0]>

type ModalEvent = 'success' | 'fail' | 'complete'

type ModalContent = ModalOptionBase['content']

interface ModalCancelEvent {
  onCancel?(): void
}

interface ModalOption extends ModalOptionBase, ModalCancelEvent {
  onOk?(): void
}

interface ModalEditableOption extends ModalOptionBase, ModalCancelEvent {
  onOk?(content?: string): void
  onCancel?(): void
}

interface ModalExpandOption extends ModalOptionBase {
  defaultConfirmText: string
}

class Modal {
  #option: Omit<ModalExpandOption, ModalEvent> = {
    confirmColor: '#576b95',
    defaultConfirmText: '我知道了',
  }

  constructor(option?: Partial<ModalOptionBase>) {
    this.setConfig(option || {})
  }

  get option() {
    return omit(this.#option, ['defaultConfirmText'])
  }

  get #defaultConfirmText() {
    return this.#option.defaultConfirmText
  }

  #showModal(
    partial:
      | NonNullable<ModalContent>
      | Omit<ModalOption, 'placeholderText' | 'message' | 'align'>
  ) {
    const option = { ...this.option } as ModalOption

    if (isString(partial)) {
      option.content = partial
    } else if (partial) {
      shallowMerge(option, partial)
    }

    const { onOk, onCancel, ...rest } = option

    taro.showModal({
      ...rest,
      editable: false,
      success(res) {
        const { confirm, cancel } = res
        if (confirm) {
          onOk?.()
        } else if (cancel) {
          onCancel?.()
        }
        option.success?.(res)
      },
    })
  }

  #showPrompt(partial: ModalEditableOption) {
    const option = shallowMerge({}, this.option, partial)
    const { onOk, onCancel, message, align, ...rest } = option

    if (process.env.TARO_ENV === 'alipay') {
      my.prompt({
        title: rest.title!,
        align: align,
        message: message,
        /** @ts-ignore */
        inputValue: rest.content,
        placeholder: rest.placeholderText,
        confirmColor: rest.confirmText,
        cancelColor: rest.cancelColor,
        okButtonText: rest.confirmText,
        cancelButtonText: rest.cancelText,
        success({ ok, inputValue }) {
          if (ok) {
            onOk?.(inputValue)
          } else {
            onCancel?.()
          }
        },
        fail({ error, errorMessage }) {
          rest.fail?.({ errMsg: `${error}:${errorMessage}` })
        },
        complete(res) {
          /** @ts-ignore */
          rest.complete?.(res)
        },
      })
    } else {
      taro.showModal({
        ...rest,
        editable: true,
        success(res) {
          const { confirm, cancel, content } = res
          if (confirm) {
            onOk?.(content)
          } else if (cancel) {
            onCancel?.()
          }
          option.success?.(res)
        },
      })
    }
  }

  propmt(partial: Omit<ModalEditableOption, 'editable'>) {
    this.#showPrompt(partial)
  }

  confirm(
    partial:
      | NonNullable<ModalContent>
      | Omit<ModalOption, 'editable' | 'placeholderText' | 'message' | 'align'>
  ) {
    if (isString(partial)) {
      partial = { content: partial }
    }
    this.#showModal(partial)
  }

  info(
    partial:
      | NonNullable<ModalContent>
      | Omit<
          ModalOption,
          'showCancel' | 'editable' | 'placeholderText' | 'message' | 'align'
        >
  ) {
    if (isString(partial)) {
      partial = { content: partial }
    }
    if (!partial.confirmText) {
      partial.confirmText = this.#defaultConfirmText
    }
    this.#showModal({
      ...partial,
      showCancel: false,
    })
  }

  setConfig(option: Partial<Omit<ModalExpandOption, ModalEvent>>) {
    shallowMerge(this.#option, option)
  }
}

export default new Modal()
