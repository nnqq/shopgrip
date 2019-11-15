module.exports = {
  apps: [
    {
      name: 'users',
      script: './packages/users/server.ts',
      watch: true,
      env: {
        NODE_ENV: 'development',
        NATS_URL: 'nats://0.0.0.0:4222',
        MONGO_URL: 'mongodb://0.0.0.0:27017/shopgrip-users',
      },
    },
    {
      name: 'vk-bot',
      script: './packages/vk-bot/server.ts',
      watch: true,
      env: {
        NODE_ENV: 'development',
        NATS_URL: 'nats://0.0.0.0:4222',
        DOKKU_REDIS_SHOPGRIP_REDIS_VK_BOT_PORT_6379_TCP_ADDR: '0.0.0.0',
        DOKKU_REDIS_SHOPGRIP_REDIS_VK_BOT_PORT_6379_TCP_PORT: '6379',
        BOT_TOKEN: '',
        BOT_GROUP_ID: '',
        BOT_CONFIRMATION: '',
        BOT_SECRET: '',
        PORT: '3000',
      },
    },
    {
      name: 'parser',
      script: './packages/parser/server.ts',
      watch: true,
      env: {
        NODE_ENV: 'development',
        NATS_URL: 'nats://0.0.0.0:4222',
        MONGO_URL: 'mongodb://0.0.0.0:27017/shopgrip-parser',
        VK_TOKEN: '',
      },
    },
    {
      name: 'admitad',
      script: './packages/admitad/server.ts',
      watch: true,
      env: {
        NODE_ENV: 'development',
        NATS_URL: 'nats://0.0.0.0:4222',
        ADMITAD_AUTH_BASE64: '',
        ADMITAD_CLIENTID: '',
        ADMITAD_WEBSITEID: '',
      },
    },
  ],
};
