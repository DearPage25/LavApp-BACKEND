import Sequelize from 'sequelize';
import {sequelize} from '../database/database';

const ServicesType = sequelize.define('service_type', {
    id_service_type: {
        type: Sequelize.BIGINT,
        primarykey: true
    },
    type: {
        type: Sequelize.TEXT,
    },
    id_service: {
        type: Sequelize.BIGINT
    },
    price: {
        type: Sequelize.NUMBER
    },
    discount: {
        type: Sequelize.SMALLINT
    }
},{
    timestamps: false
});

module.exports = ServicesType;