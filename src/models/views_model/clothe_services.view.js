import { text } from 'express';
import Sequelize, { DataTypes } from 'sequelize';
import sequelize from '../../database/database';
const clotheServicesType = sequelize.define('SERVICES_VIEW', {
    CLOTHE_TYPE: {
        type: Sequelize.TEXT,
        
    },
    ID_SERVICE_TYPE: {

        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    TYPE: {
        type: DataTypes.TEXT,
    },
    PRICE: {
        type: Sequelize.NUMBER,
    },
    DISCOUNT: {
        type: Sequelize.INTEGER
    },
    
    ID_SERVICE: {
        type: Sequelize.INTEGER
    },
    SERVICE: {
        type: Sequelize.TEXT
    },
    active: {
        type: Sequelize.BOOLEAN,
    },
}, {
    schema: "LavApp Schema",
    freezeTableName: true,
    timestamps: false
});
module.exports = clotheServicesType;