const { Pool, Client } = require('pg');
const connectionString = 'postgresql://postgres:vasanth7788@localhost:5432/Eparts';
const pool = new Pool({
  connectionString: connectionString,
});

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  }
};
module.exports = pool;