import fastify from 'fastify'
import helmet from 'fastify-helmet'
import cors from 'fastify-cors'

require("dotenv").config();

const app = fastify({ logger: true })

app.register(helmet)
app.register(cors)
app.register(require("fastify-rate-limit"), {
    max: +process.env.MAX_CONNECTION_PER_MINUTE || 1000,
    timeWindow: "1 minute"
});

app.register(require('./routes/linebot-route'), {'prefix':'/line'});

app.get('/', (req, res) => {
    res.status(200).send({msg:`Hello World`})
})

const start = async () => {
    const port = +process.env.PORT || 3000;
    try {
      let address = await app.listen(port)
      console.log(`Server listening on ${address}`)
    } catch (err) {
      app.log.error(err)
      process.exit(1)
    }
  }
start()