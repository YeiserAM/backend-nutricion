const Pool = require('pg').Pool

const pool = new Pool({
    host: 'ec2-3-225-213-67.compute-1.amazonaws.com',
    user: 'yldvcbwdpwvyyb',
    password: '7c3717fbf633c58af9e7dc596586f2257602245cc22e14a0beab9351ac4e68f2',
    database: 'dce8i9oub03tbd',
    port: 5432,
    ssl: { rejectUnauthorized: false }
})

module.exports = pool;