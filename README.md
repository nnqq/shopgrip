# ShopGrip eshop price monitoring

VK-bot which receive a link to some stuff in eshop, and when price goes down, it will send a message to you

## Parsing logic

Parsing title and price priority:
1. Microdata
2. HTML tags
3. Custom parsing for several websites

So ~90% eshops are included by design. Also it cuts link with Admitad API to get referral revenue. But it's friendly for non-Admitad eshops - if bot can't get referral link from Admitad for certain eshop, it adds stuff to your watch list

## Stack
* TypeScript
* MongoDB
* MoleculerJS microservices
* NATS transport

## Contact author

[Telegram](https://t.me/aveDenis)
