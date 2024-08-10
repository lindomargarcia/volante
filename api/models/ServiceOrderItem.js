import { DataTypes } from "sequelize";
import db from "../config/database.js";
import { ServiceOrder } from "./ServiceOrder.js";
import { Catalog } from "./Catalog.js";

export const ServiceOrderItem = db.define('ServiceOrderItem', {
    serviceOrderId: {
        type: DataTypes.NUMBER,
        allowNull: false,
        references: {
            model: ServiceOrder,
            key: 'id'
        }
    },
    catalogItemId: {
        type: DataTypes.NUMBER,
        allowNull: true,
        references: {
            model: Catalog,
            key: 'id'
        }
    },
    description:{
        type: DataTypes.STRING,
        allowNull: false
    },
    value:{
        type: DataTypes.NUMBER,
        allowNull: false,
    },
    quantity:{
        type: DataTypes.NUMBER,
        allowNull: false,
        defaultValue: 1
    },
    discount: {
        type: DataTypes.NUMBER,
        allowNull: true
    },
    total: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'service_order_items'
})