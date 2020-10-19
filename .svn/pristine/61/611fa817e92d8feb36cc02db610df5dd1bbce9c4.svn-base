module.exports = {
  //部署应用包时的基本url。
  publicPath: './',
  //默认情况下，Vue CLI 会假设你的应用是被部署在一个域名的根路径上，例如 https://www.my-app.com/。
  //如果应用被部署在一个子路径上，你就需要用这个选项指定这个子路径。例如，如果你的应用被部署在 https://www.my-app.com/my-app/，则设置 publicPath 为 /my-app/。
  //这个值也可以被设置为空字符串 ('') 或是相对路径 ('./')，这样所有的资源都会被链接为相对路径，这样打出来的包可以被部署在任意路径，也可以用在类似 Cordova hybrid 应用的文件系统中。
  //也可以使用三元运算符配置开发和正式环境上不同的路径

  outputDir: "dist", //打包后生成的生产环境构建文件的目录，dist是默认值。默认情况下每次打包都会清空上次打包文件（构建时传入 --no-clean 可关闭该行为）。
  //官方提示:始终使用outputDir，而不要修改 webpack 的 output.path。
  assetsDir: "assets", //放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
  indexPath: "index.html", //指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径。
  filenameHashing: true, //默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存。然而，这也要求 index 的 HTML 是被 Vue CLI 自动生成的。如果你无法使用 Vue CLI 生成的 index HTML，你可以通过将这个选项设为 false 来关闭文件名哈希。


  lintOnSave: true, //在保存后eslint检查代码。将值设置为'error'是把错误直接输出为编译错误。process.env.NODE_ENV !== 'production'，在生产环境上设为false。


  runtimeCompiler: false, //是否使用包含运行时编译器的 Vue 构建版本。设置为 true 后你就可以在 Vue 组件中使用 template 选项了，但是这会让你的应用额外增加 10kb 左右。
  transpileDependencies: [], //默认情况下 babel-loader 会忽略所有 node_modules 中的文件。如果你想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来。
  productionSourceMap: false, //如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  //在打包完成后文件夹中有.map文件，他的作用是在打包完成后，如果运行时报错，没有.map文件不能找到报错信息的准确位置。


  //支持的 loader 有：css-loader,postcss-loader,sass-loader,less-loader,stylus-loader

  devServer: {
    open: true,
    host: '0.0.0.0',
    port: 8080,
    https: false,
    hotOnly: false,
    proxy: null, // string | Object
    before: app => {},
    // proxy: {
    //   '/api': {
    //     target: 'http://192.168.1.19:8080/', // 在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
    //     changeOrigin: true,
    //     ws: true,
    //     pathRewrite: {
    //       // 替换target中的请求地址，也就是说以后你在请求http://api.jisuapi.com/XXXXX这个地址的时候直接写成/api即可
    //       '^/api': '/'
    //     }
    //   }
    // }
  }
}
