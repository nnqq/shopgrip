# ShopGrip eshop price monitoring

VK bot which receive a link to some stuff in eshop, and when price goes down, it will send a message to you. Bot is just separated service, as way of interaction with user, easy to add API and connect it to website

## Stack
* TypeScript
* MongoDB
* MoleculerJS microservices
* NATS transport

## Parsing logic

Parsing title and price priority:
1. Microdata
2. HTML tags
3. Custom parsing for several websites

So ~90% eshops are included by design. Also it cuts link with Admitad API to get referral revenue. But it's friendly for non-Admitad eshops - if bot can't get referral link from Admitad for certain eshop, it adds stuff to your watch list

## Run

### Dev env

Fill `eco/eco.config.js` with your vars and run:

```
npm i
```

And this will start all services locally:

```
npm run pm2Debug
```

### Prod env

Deploy flow for [dokku](http://dokku.viewdocs.io/dokku/):

Every microservice in `packages` folder have npm script `deploy*ServiceName*` (don't forget to change `ssh root@shopgrip.ru` with your domain), for example run this to delpoy `admitad` service to [dokku](http://dokku.viewdocs.io/dokku/) server. 

```
npm run deployAdmitad
```

## Contact author

[Telegram](https://t.me/aveDenis)
