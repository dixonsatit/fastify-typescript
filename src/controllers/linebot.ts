import * as line from '@line/bot-sdk';
import * as request from 'request';

const LINE_MESSAGING_API = 'https://api.line.me/v2/bot/message/';

const config = {
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.CHANNEL_SECRET,
};

const LINE_HEADER = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${config.channelAccessToken}`
};

function curl(method, body) {
    request.post({
        url: LINE_MESSAGING_API + method,
        headers: LINE_HEADER,
        body: body
    }, (err, res, body) => {
        console.log('status = ' + res.statusCode);
    });
}

function reply(reply_token, msg) {
    const body = JSON.stringify({
        // reply body
        replyToken: reply_token,
        messages: [
            {
                type: 'text',
                text: msg
            },
            {
                type: 'text',
                text: 'Hello'
            },
            {
                type: 'text',
                text: 'How are you?'
            }
        ]
    });
    curl('reply', body);
}

async function routes(fastify, opts, next) {
    fastify.post('/webhook', async (req, res) => {
        const reply_token = req.body.events[0].replyToken;
        const msg = req.body.events[0].message.text;
        reply(reply_token, msg);
        res.status(200).send({ data: req.body });
    });
}

module.exports = routes;