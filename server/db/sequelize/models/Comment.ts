import { Model, DataTypes, Sequelize } from "sequelize";

export class Comment extends Model {
  id!: number;
  firstName!: string;
  lastName!: string;
  /* some other properties*/

  verifyPassword: (password: string) => boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default (sequelize: Sequelize) => {
  Comment.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
      },
      firstName: {
        type: DataTypes.STRING
      },
      lastName: {
        type: DataTypes.STRING
      }
    },
    { tableName: "Comment", sequelize }
  );

  Comment.create({ 1: 2 });
};

Comment.prototype.verifyPassword = function(password: string) {
  return true;
  /* code here ... */
};
