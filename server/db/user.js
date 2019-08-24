const User = {};
const crypto = require("crypto");
const promiseQuery = require("./utils/promiseQuery");
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
    (username, password, hash_id) 
    VALUES
    (?, ?, ?);`;

  return promiseQuery({
    sql: query,
    values: [
      username,
      password,
      crypto
        .createHash("md5")
        .update(username)
        .digest("hex")
    ]
  });
};
