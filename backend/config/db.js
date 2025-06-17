// const { Pool } = require('pg');
// require('dotenv').config();

// console.log('DB_HOST:', process.env.DB_HOST);
// console.log('DB_USER:', process.env.DB_USER);
// console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
// console.log('DB_NAME:', process.env.DB_NAME);
// console.log('DB_PORT:', process.env.DB_PORT);

// const pool = new Pool({
//   host: process.env.DB_HOST || 'localhost',
//   user: process.env.DB_USER || 'postgres',
//   password: String(process.env.DB_PASSWORD || ''),
//   database: process.env.DB_NAME || 'auth_db',
//   port: parseInt(process.env.DB_PORT, 10) || 5432,
// });

// // pool.on('error', (err) => {
// //   console.error('Unexpected error on idle client', err);
// //   process.exit(-1);
// // });

// pool.connect((err) => {
//   if (err) console.error('Database connection error:', err.stack);
//   else console.log('Database connected successfully');
// });

// module.exports = pool;

const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
   ssl: {
    rejectUnauthorized: false, // important for Render!
  },
});

pool.on('connect', () => {
  console.log('Connected to the database');
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool
};