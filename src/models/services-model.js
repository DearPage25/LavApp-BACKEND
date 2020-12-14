import Sequelize from 'sequelize';
import { sequelize } from '../database/database';

const Services = sequelize.define('services', {
    id_service: {
        type: Sequelize.BIGINT,
        primarykey: true,
    },
    service: {
        type:  Sequelize.TEXT,
    },
    description: {
        type: Sequelize.TEXT,
    },
},{
    timestamps: false
});

module.exports = Services;