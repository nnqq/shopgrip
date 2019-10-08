module.exports = {
  apps: [
    {
      name: 'users',
      script: './packages/users/server.ts',
      watch: true,
      env: {
        NODE_ENV: 'development',
        NATS_URI: 'nats://0.0.0.0:4222',
        MONGO_URI: 'mongodb://0.0.0.0:27017/shopgrip-users',
      },
    },
    {
      name: 'vk-bot',
      script: './packages/vk-bot/server.ts',
      watch: true,
      env: {
        NODE_ENV: 'development',
        NATS_URI: 'nats://0.0.0.0:4222',
        REDIS_HOST: '0.0.0.0',
        REDIS_PORT: '6379',
        BOT_TOKEN: '85a192c99e3cce1ad22a920f9d9cbc8b68e03dfa1758f8ead382ae9fe32b8150de8c6c37cb6140eedc3a7',
        BOT_GROUP_ID: '187263181',
        BOT_CONFIRMATION: '8045cd4a',
        BOT_SECRET: 'e4284a7e40a141f1b16320aeee7f9f38',
        HTTP_PORT: '3000',
      },
    },
    {
      name: 'parser',
      script: './packages/parser/server.ts',
      watch: true,
      env: {
        NODE_ENV: 'development',
        NATS_URI: 'nats://0.0.0.0:4222',
        MONGO_URI: 'mongodb://0.0.0.0:27017/shopgrip-parser',
      },
    },
    {
      name: 'admitad',
      script: './packages/admitad/server.ts',
      watch: true,
      env: {
        NODE_ENV: 'development',
        NATS_URI: 'nats://0.0.0.0:4222',
        ADMITAD_AUTH_BASE64: 'ZTEzNjdlN2NjNTdlZjcxNjExNDVmMjU2ZDlhNmZlOmU4NjI0ZGVhMTA2MGE4ZmQ3OTBmNTdiNmJiODI1MQ==',
        ADMITAD_CLIENTID: 'e1367e7cc57ef7161145f256d9a6fe',
        ADMITAD_WEBSITEID: '1156135',
      },
    },
  ],
};
