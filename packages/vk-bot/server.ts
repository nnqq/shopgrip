import express from 'express';
import bodyParser from 'body-parser';
import RedisSession from 'node-vk-bot-api-session-redis';
import VkBot from 'node-vk-bot-api';
import Stage from 'node-vk-bot-api/lib/stage';

const stage = new Stage(/* Тут сцены */);

const session = new RedisSession({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

const bot = new VkBot({
  token: process.env.BOT_TOKEN,
  group_id: process.env.BOT_GROUP_ID,
  confirmation: process.env.BOT_CONFIRMATION,
  secret: process.env.BOT_SECRET,
});

bot.use(session.middleware());
bot.use(stage.middleware());

const app = express();
app.use(bodyParser.json());
app.post('/85ead762-1494-4ef2-9114-3f7e9ffd105f', bot.webhookCallback);
app.listen(process.env.PORT);
