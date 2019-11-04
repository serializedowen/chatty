import Sequelize from "sequelize";
import InitUser from "./models/User";
import config from "../../config/db";

const sequelize = new Sequelize("chatty", config.username, config.password, {
  host: "localhost",
  dialect: "mysql" /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });

sequelize.import(__dirname + "/models/User");
sequelize.import(__dirname + "/models/Room");

const dbInstance = {
  sequelize,
  User: InitUser(sequelize)
};

// module.exports = sequelize;
export default sequelize;
