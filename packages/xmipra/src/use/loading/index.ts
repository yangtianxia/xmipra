import { ref } from 'vue'

export function useLoading(defaultVal = false) {
  const loading = ref(defaultVal)
  return {
    show() {
      loading.value = true
    },
    hide() {
      loading.value = false
    },
    toggle() {
      loading.value = !loading.value
    },
    get value() {
      return loading.value
    },
  }
}
