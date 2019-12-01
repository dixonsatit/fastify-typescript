
import { UserModel } from '../models/user';

const userModel = new UserModel();

async function routes(fastify, opts, next) {
    fastify.get('/', async (request, reply) => {
        let data = userModel.findAll();
        return { hello: 'Hello World Line bot', data: data }
    })
    fastify.get('/v1', async (request, reply) => {
        return { hello: 'v1' }
    })
}

module.exports = routes