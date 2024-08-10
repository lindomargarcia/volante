import { DataTypes } from "sequelize";
import db from "../config/database.js";

export const Catalog = db.define('Catalog', {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        unique: true,
        primaryKey: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    sku: {
        type: DataTypes.STRING(25),
        allowNull: true,
        unique: true,
        primaryKey: true
    },
    value:{
        type: DataTypes.NUMBER,
        allowNull: false
    },
    type:{
        type: DataTypes.STRING,
        allowNull:false
    },
    hasConditionalPrice: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
},{
    tableName: 'catalog'
})