module.exports = {
  presets: [
    [
      'taro',
      {
        framework: 'vue3',
        ts: true,
        vueJsx: {
          isCustomElement: (tag) => tag.startsWith('custom'),
        },
      },
    ],
  ],
}
