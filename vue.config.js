const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

module.exports = {
  pluginOptions: {
    quasar: {
      theme: 'mat'
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        quasar: `node_modules/quasar-framework/dist/quasar.mat.esm.js`
      }
    },
    plugins: [new BundleAnalyzerPlugin()]
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
