const Pool = require('pg').Pool

const pool = new Pool({
    host: 'bxjfyeaysrvjslyk5kqm-postgresql.services.clever-cloud.com',
    user: 'uxfvq8owbmmevzo3ak0d',
    password: 'DC5ywzTH6Bm63rlYoAXv',
    database: 'bxjfyeaysrvjslyk5kqm',
    port: 5432,
    ssl: { rejectUnauthorized: false }
});

module.exports = pool;