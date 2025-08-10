export default {
  name: 'mipra',
  build: {
    srcDir: 'src',
    tagPrefix: 'xmi-',
    namedExport: true,
    packageManager: 'pnpm',
    css: {
      preprocessor: 'less',
      removeSourceFile: true
    },
    bundleOptions: []
  }
}
