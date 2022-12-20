const Pool = require('pg').Pool

const pool = new Pool({
    host: 'ec2-52-3-60-53.compute-1.amazonaws.com',
    user: 'ymwjzplxmgagpo',
    password: '940beb3583db5ec3d8df450ee0e5d59a66a465a3020375cee2342b8825143619',
    database: 'dast13dufsnsof',
    port: 5432,
    ssl: { rejectUnauthorized: false }
});

module.exports = pool;