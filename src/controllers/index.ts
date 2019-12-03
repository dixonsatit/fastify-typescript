async function routes(fastify, opts, next) {
    fastify.get('/', async (req, res) => {
        res.status(200).send({ status: '200 Ok', message: 'Highway Line bot API' });
    });
}
module.exports = routes;