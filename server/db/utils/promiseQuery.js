const pool = require("../pool");

module.exports = ({ sql, values }) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, conn) => {
      if (err) {
        return reject("Database connection failed");
      } else {
        conn.query(
          {
            sql: sql,
            values: values
          },
          (err, results, fields) => {
            if (err) {
              return reject(err);
            } else {
              console.log(results);
              return resolve({ results, fields });
            }
          }
        );
        conn.release();
      }
    });
  });
};
