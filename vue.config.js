module.exports = {
  pluginOptions: {
    quasar: {
      theme: 'mat',
      importAll: true
    }
  },
  filenameHashing: false,
  productionSourceMap: false,
  pwa: {
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'src/sw.js'
    }
  },
  transpileDependencies: [/[\\\/]node_modules[\\\/]quasar-framework[\\\/]/]
};
