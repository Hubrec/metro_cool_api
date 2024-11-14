module.exports = {
    apps: [
        {
            name: 'metro-cool-api',
            script: './bin/www',
            instances: 2,
            exec_mode: 'cluster',
            env: {
                NODE_ENV: 'development',
                PORT: 3000
            },
            env_production: {
                NODE_ENV: 'production',
                PORT: 3000
            }
        }
    ]
};