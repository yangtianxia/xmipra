import 'components/style/global.less'
import '@/global.less'

import { createApp } from 'vue'
import router from '@/router'

const App = createApp({
  onShow() {},
})

App.use(router)

export default App
