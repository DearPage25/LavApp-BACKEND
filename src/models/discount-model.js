import Sequelize from 'sequelize';
import {sequelize} from '../database/database';

const Discount = sequelize.define('discount', {
    id_discount: {
        type: Sequelize.BIGINT,
        primarykey: true,
    },
    id_service_type: {
        type: Sequelize.BIGINT
    },
    date_limit: {
        type: Sequelize.DATE,
    },
    id_user: {
        type: Sequelize.BIGINT,
    },
    discount_percent: {
        type: Sequelize.SMALLINT,
    },
    notes: {
        type: Sequelize.TEXT
    }

});

module.exports = Discount;