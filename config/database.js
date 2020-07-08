import * as Sequelize from "sequelize";
import * as path from "path";

import * as connection from "./connection";

let database;

switch (process.env.NODE_ENV) {
  default:
    database = new Sequelize(
      connection.development.database,
      connection.development.username,
      connection.development.password,
      {
        host: connection.development.host,
        dialect: connection.development.dialect,
        pool: {
          max: 5,
          min: 0,
          idle: 10000,
        },
        storage: path.join(process.cwd(), "db", "database.sqlite"),
      }
    );
}

module.exports = database;
