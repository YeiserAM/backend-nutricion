const Pool = require('pg').Pool

const pool = new Pool({
    host: 'ec2-3-216-167-65.compute-1.amazonaws.com',
    user: 'gteiyscefprcgx',
    password: 'cbf409d0c595bc2657d24a0d36d7561ade3773743863df91b439dc02aa89eb89',
    database: 'dee4os3atfjhkj',
    port: 5432,
    ssl: { rejectUnauthorized: false }
})

module.exports = pool;