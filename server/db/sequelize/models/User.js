const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Sequelize.Model {}
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        validate: {
          isUUID: 4
        }
      },
      // attributes
      username: {
        type: DataTypes.STRING(16),
        allowNull: false
      },
      salt: {
        type: DataTypes.STRING(12),
        allowNull: false
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      email: {
        type: DataTypes.STRING(255)
      },
      hash_id: {
        type: DataTypes.STRING(45),
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: "User"
      // options
    }
  );
};
