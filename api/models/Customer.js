import { DataTypes } from "sequelize";
import db from "../config/database.js";


export const Customer = db.define('customer', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cpf:{
    type: DataTypes.STRING(15),
    allowNull: true,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true
  },
  phone:{
    type: DataTypes.STRING(15),
    allowNull: true
  },
}, {
  tableName: 'customers'
});

