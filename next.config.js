//const withCss = require('@zeit/next-css')
//const withSass = require('@zeit/next-sass')
/* if (typeof require !== 'undefined') {
    require.extensions['.css'] = File => {

    }
} */

/* module.exports = withSass({
    //cssModules: true
}) */

const withCss = require('@zeit/next-css')

const configs = {
    // 编辑文件的输出目录
    distDir: 'dest',

    // 是否给每个路由生成Etag
    generateEtags: true,

    // 页面内容缓存配置 开发时的

    onDemandEntries: {
        // 内容再内存中缓存的时长(ms)
        maxInactiveAge: 25* 1000,
        // 同时缓存多少个页面
        pagesBufferLength: 2,
    },

    // in pages目录下那种后缀的文件会被认为是页面

    pageExtensions: ['jsx', 'js'],

    //  配置buildID,配置多个节点的时候用的到
    generateBuildId: async ()=> {
        if(process.env.YOUR_BUILD_ID) {
            return process.env.YOUR_BUILD_ID
        }
        //返回null use default unique id
        return null
    },

    // 手动修改webpack config

    webpack(config, options) {
        return config
    },

    // 修改webpackDevmiddleware
    webpackDevMiddleware: config =>{
        return config
    },

    // 可以page上通过process.env.customKey 获取value
    env: {
        customKey: 'value',
    },

    // 下面是两个要通过 'next/config' 来读取

    // 只有再服务端渲染时才会获取的配置
    serverRuntimeConfig: {
        mySecret: 'secret',
        secondSecret: process.env.SECOND_SECRET,
    },
    // 再服务器端和客户端渲染时都可以获取到的配置
    publicRuntimeConfig: {
        staticFolder: '/static',
    }
}