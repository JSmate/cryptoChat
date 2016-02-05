module.exports = {
    mysql: {
        host     : '10.20.11.101',
        user     : 'reserver_app',
        password : 'wuQfnTahx5WuWKhw',
        database : 'reserver_app'
    },

    redis: {
        host: 'localhost',
        port: 6379
    },

    stripe: {
        secretKey: 'sk_test_mVtbZIZHpfyxtOaTOKUtXSUh'
    },

    constants: {
        'REDIS_PREFIX_DELIMITER': '_',
        'QUEUED_PAYERS': 'queuedPayers'
    }
};