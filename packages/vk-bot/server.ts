import express from 'express';
import bodyParser from 'body-parser';
import RedisSession from 'node-vk-bot-api-session-redis';
import VkBot from 'node-vk-bot-api';
import Stage from 'node-vk-bot-api/lib/stage';
import { auth } from './middlewares/auth';
import { broker } from './broker';
import { main } from './controllers/main';
import {
  BOT_TOKEN, BOT_GROUP_ID, BOT_CONFIRMATION, BOT_SECRET,
} from './constants';
import { buttons } from './middlewares/buttons';
import { getUrls } from './scenes/getUrls';
import { deleteUrl } from './scenes/deleteUrl';

const stage = new Stage(getUrls, deleteUrl);

const session = new RedisSession({
  host: process.env.DOKKU_REDIS_SHOPGRIP_REDIS_PORT_6379_TCP_ADDR,
  port: process.env.DOKKU_REDIS_SHOPGRIP_REDIS_PORT_6379_TCP_PORT,
});

const bot = new VkBot({
  token: BOT_TOKEN,
  group_id: BOT_GROUP_ID,
  confirmation: BOT_CONFIRMATION,
  secret: BOT_SECRET,
});

bot.use(session.middleware());
bot.use(auth);
bot.use(stage.middleware());
bot.use(buttons);
bot.use(main);

const app = express();
app.use(bodyParser.json());
app.post('/85ead762-1494-4ef2-9114-3f7e9ffd105f', bot.webhookCallback);
app.listen(process.env.PORT);

broker.start();
