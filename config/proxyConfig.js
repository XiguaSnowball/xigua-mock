module.exports = {
    proxyList: {
        '/apis': {
            // 测试环境
            target: 'http://10.7.8.14:5202', // 接口域名
            changeOrigin: false, //是否跨域
            pathRewrite: {
                '^/apis': '' //需要rewrite重写的,
            }
        }
    }
}