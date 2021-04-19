const { Pool, Client } = require('pg');
const connectionString = 'postgresql://e-parts-admin:072228ZH@localhost:50709/Eparts';
const pool = new Pool({
  connectionString: connectionString,
});

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  }
};
module.exports = pool;