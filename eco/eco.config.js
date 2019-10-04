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
  ],
};
