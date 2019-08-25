const User = {};
const crypto = require("crypto");
const promiseQuery = require("./utils/promiseQuery");
const escape = require("mysql").escape;
const key = require("../config/key");

module.exports = User;

User.findUser = ({ fieldName, value }) => {
  /**
   * ?? escape input as column name, ? escape as value
   * https://github.com/mysqljs/mysql#escaping-query-identifiers
   */

  let query = `
  SELECT * 
  FROM
  chatty.user
  WHERE ?? = ?
  `;
  return promiseQuery({ sql: query, values: [fieldName, value] });
};

User.createUser = (username, password) => {
  let query = `
    INSERT INTO chatty.user 
    (username, password, hash_id, salt) 
    VALUES
    (?, ?, ?, ?);`;

  let salt = crypto.randomBytes(8).toString("base64");
  let salted = password.concat(salt);
  // console.log(salted);

  return promiseQuery({
    sql: query,
    values: [
      username,
      crypto
        .createHmac("sha256", key)
        .update(salted)
        .digest("base64"),
      crypto
        .createHash("md5")
        .update(username)
        .digest("hex"),
      salt
    ]
  });
};
