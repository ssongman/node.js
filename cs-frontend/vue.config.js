module.exports = {
  transpileDependencies: ["vuetify"],
  devServer: {
    disableHostCheck: true,
    proxy: {
      "/apis": {
        target: "http://kangws-pythonwas-kangwoosik.container.ipc.kt.com/",
        changeOrigin: true,
        pathRewrite: {
          "^/apis": ""
        }
      }
    }
  }
};
