const { defineConfig } = require('@vue/cli-service')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = defineConfig({
  transpileDependencies: true,
  //关闭eslint校验工具
  lintOnSave: false,
  devServer: {
    // 解决浏览器跨域问题
    proxy: {
      '/api': {
        target: 'http://gmall-h5-api.atguigu.cn'
      }
    }
  },
  outputDir: './dist',
  configureWebpack: {
    entry: './src/main.js',
    plugins: [
      new BundleAnalyzerPlugin()
    ]
    
  }
})
