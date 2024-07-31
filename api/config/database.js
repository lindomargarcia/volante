import { Sequelize } from "sequelize";

const db = new Sequelize({
  storage: './database.db',
  dialect: 'sqlite',
});

export default db