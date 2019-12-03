require('dotenv').config();

import fastify from 'fastify';
import helmet from 'fastify-helmet';
import cors from 'fastify-cors';

const app = fastify({ logger: true });

app.register(helmet);
app.register(cors);
app.register(require('fastify-rate-limit'), {
  max: +process.env.MAX_CONNECTION_PER_MINUTE || 1000,
  timeWindow: '1 minute'
});
app.register(require('./plugins/knex'), {
  client: 'mysql',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: +process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  }
});

app.register(require('./controllers/index'));
app.register(require('./controllers/linebot'), { 'prefix': '/line' });

const start = async () => {
  const port = +process.env.PORT || 3000;
  try {
    const address = await app.listen(port);
    console.log(`Server listening on ${address}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();