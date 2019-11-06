import Sequelize from "sequelize";
import InitUser from "./models/User";
import InitMessage from "./models/Message";
import InitRoom from "./models/Room";
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

// sequelize.import(__dirname + "/models/User");
// sequelize.import(__dirname + "/models/Room");
// sequelize.import(__dirname + "/models/Message");

const DBInstance = {
  sequelize,
  User: InitUser(sequelize),
  Message: InitMessage(sequelize),
  Room: InitRoom(sequelize)
};

/**
 *
 * Define our associations here
 * */

// 1 * n relations
DBInstance.User.hasMany(DBInstance.Message);

// n * m relations
DBInstance.Room.belongsToMany(DBInstance.User, { through: "UserRoom" });
DBInstance.User.belongsToMany(DBInstance.Room, { through: "UserRoom" });
DBInstance.Message.belongsToMany(DBInstance.Room, { through: "MessageRoom" });
DBInstance.Room.belongsToMany(DBInstance.Message, { through: "MessageRoom" });

sequelize.sync();

// module.exports = sequelize;

export default sequelize;

export { DBInstance };
