module.exports = {
    proxyList: {
        '/apis': {
            // 测试环境
            target: 'http://172.16.156.67:5202', // 接口域名
            changeOrigin: false, //是否跨域
            pathRewrite: {
                '^/apis': '' //需要rewrite重写的,
            }
        }
    }
}