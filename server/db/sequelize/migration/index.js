const sequelize = require("../index");

// Object.keys(sequelize.models).forEach(model => sequelize.models[model].sync());
Object.keys(sequelize.models).forEach(model =>
  sequelize.models[model].sync({ force: true })
);
