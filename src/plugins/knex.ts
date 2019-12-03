import fp from 'fastify-plugin';
import knex from 'knex';

async function dbConnector(fastify, options, next) {
  try {
    const db = knex(options);
    fastify.decorate('knex', db);
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = fp(dbConnector);