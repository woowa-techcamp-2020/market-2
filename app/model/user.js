import { DataTypes } from "sequelize";
import sequelize from "../../config/database";

const hooks = {
  //패스워드 암호화
  beforeCreate(user) {},
};

const tableName = "users";

const User = sequelize.define(
  "User",
  {
    uid: {
      type: DataTypes.STRING(20),
      primaryKey: true,
      validate: {
        is: /^[a-z0-9_-]{4,20}$/i,
      },
    },
    email: {
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: {
        not: /[~!@#$%^&*()_+|<>?:{}]/i,
        not: /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/i,
        is: /^.*(?=.*[a-zA-Z])(?=.*[0-9]).{8,20}$/i,
      },
    },
    phone: {
      type: DataTypes.STRING(15),
      unique: true,
      allowNull: false,
    },
    fullName: {
      type: DataTypes.STRING(10),
      allowNull: false,
      validate: {
        not: /[^가-힣a-zA-Z]/i,
      },
    },
    address: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    advertiseAgree: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  { hooks, tableName, timestamps: true }
);

User.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  delete values.password;

  return values;
};

module.exports = User;
