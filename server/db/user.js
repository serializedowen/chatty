const User = {};
const crypto = require("crypto");
const promiseQuery = require("./utils/promiseQuery");
const escape = require("mysql").escape;
const key = require("../config/key");

const UsernameAlreadyExistsError = require("../errors/usernameAlreadyExists");
const LoginFailureError = require("../errors/loginFailureError");

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

User.login = async (username, hashed) => {
  let res = await User.findUser({ fieldName: "username", value: username });
  if (res.results && res.results.length === 0) {
    throw LoginFailureError;
  } else {
    let { password, salt } = res.results[0];
    console.log(password, salt);
  }
};

User.createUser = async (username, password) => {
  let res = await User.findUser({ fieldName: "username", value: username });
  if (res.results && res.results.length != 0) {
    throw UsernameAlreadyExistsError;
  }

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
