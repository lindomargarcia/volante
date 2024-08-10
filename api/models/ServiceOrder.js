import { DataTypes } from "sequelize";
import db from "../config/database.js";
import { Customer } from "./Customer.js";
import { Vehicle } from "./Vehicle.js";
import { InsuranceCompany } from "./InsuranceCompany.js"

export const ServiceOrder = db.define("ServiceOrder", {
    status:{
        type: DataTypes.STRING,
        allowNull: false
    },
    customerId:{
        type: DataTypes.STRING,
        allowNull: false,
        references:{
            model: Customer,
            key: 'id'
        }
    },
    vehicleId:{
        type: DataTypes.STRING,
        allowNull: false,
        references:{
            model: Vehicle,
            key: 'id'
        }
    },
    insuranceCompanyId:{
        type: DataTypes.STRING,
        allowNull: true,
        references: {
            model: InsuranceCompany,
            key: 'id'
        }
    },
    durationQuantity:{
        type: DataTypes.NUMBER,
        allowNull: true
    },
    durationType:{
        type: DataTypes.STRING,
        allowNull: true
    }
},{
    tableName: 'service_orders'
})