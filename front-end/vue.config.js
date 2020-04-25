module.exports = {
  chainWebpack: config => {
    config.module.rules.delete('eslint')
  },
  productionSourceMap: false,
  configureWebpack: {
  }
}
