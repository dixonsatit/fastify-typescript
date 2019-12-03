
var knex = require('knex')({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        port: 3306,
        password: 'root',
        database: 'db'
    },
    debug: true
});

async function abc() {
    knex('users').then(result => {
        console.log(result);
    });
    let result = await knex('users');
    console.log(result);
};
abc();