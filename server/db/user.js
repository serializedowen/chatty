const pool = require("./pool");
const user = Object.create({});

module.exports = user;

user.createUser = (username, password) => {
  let query = `
    INSERT INTO chatty.user 
    (username, password) 
    VALUES
    (?, ?);`;

  return new Promise((resolve, reject) => {
    pool.getConnection((err, conn) => {
      if (err) {
        return reject("Database connection failed");
      } else {
        conn.query(
          {
            sql: query,
            values: [pool.escape(username), pool.escape(password)]
          },
          (err, rows, fields) => {
            if (err) {
              return reject(err);
            } else {
              return resolve(rows);
            }
          }
        );
        conn.release();
      }
    });
  });
};
