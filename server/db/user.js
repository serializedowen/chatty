const pool = require("./pool");
const user = {};
const crypto = require("crypto");
const promiseQuery = require("./utils/promiseQuery");
module.exports = user;

user.findUser = username => {
  let query = `
  SELECT username, email, hash_id 
  FROM
  chatty.user
  WHERE username = (?)
  `;
  return promiseQuery({ sql: query, values: [username] });
};

user.createUser = (username, password) => {
  let query = `
    INSERT INTO chatty.user 
    (username, password, hash_id) 
    VALUES
    (?, ?, ?);`;

  return promiseQuery({
    sql: query,
    values: [
      pool.escape(username),
      pool.escape(password),
      crypto
        .createHash("md5")
        .update(password)
        .digest("hex")
    ]
  });
  // return new Promise((resolve, reject) => {
  //   pool.getConnection((err, conn) => {
  //     if (err) {
  //       return reject("Database connection failed");
  //     } else {
  //       conn.query(
  //         {
  //           sql: query,
  //           values: [
  //             pool.escape(username),
  //             pool.escape(password),
  //             crypto.update(username).digest("hex")
  //           ]
  //         },
  //         (err, rows, fields) => {
  //           if (err) {
  //             return reject(err);
  //           } else {
  //             return resolve(rows);
  //           }
  //         }
  //       );
  //       conn.release();
  //     }
  //   });
  // });
};
