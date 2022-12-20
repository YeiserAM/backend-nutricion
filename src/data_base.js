const Pool = require('pg').Pool

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'root',
    database: 'bdnutricion',
    port: 5432,
    ssl: { rejectUnauthorized: false }
});

module.exports = pool;