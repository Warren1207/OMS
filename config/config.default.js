'use strict';
const path = require('path');

module.exports = appInfo => {
    const config = exports = {
        mysql: {
            // 单数据库信息配置
            client: {
                // host
                host: 'db.dffsoft.com',
                // 端口号
                port: '3306',
                // 用户名
                user: 'oms',
                // 密码
                password: 'X$Pkz]x8RY',
                // 数据库名
                database: 'oms',
            },
            // 是否加载到 app 上，默认开启
            app: true,
            // 是否加载到 agent 上，默认关闭
            agent: false,
        }
    };

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1520910446428_2760';

    config.static = {
        prefix: '/',
        dir: path.join(appInfo.baseDir, 'app/web')
    }

    // add your config here
    config.middleware = ['errorHandler', 'saveSession', 'compress'];

    config.compress = {
        threshold: 1024,
    }

    //允许跨域
    config.security = {
        csrf: {
            enable: false,
        }
    };

    return config;
};
