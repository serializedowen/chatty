const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Room extends Sequelize.Model {}
  Room.init(
    {
      // attributes
      name: {
        type: DataTypes.STRING(255),
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: "Room"
      // options
    }
  );
};
