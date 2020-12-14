import Sequelize from 'sequelize';
import {sequelize} from '../database/database'

const Bill = sequelize.define('bill', {
    id_bill: {
        type: Sequelize.BIGINT,
        primarykey: true
    },
    customer: {
        type: Sequelize.BIGINT,

    },
    employee: {
        type: Sequelize.BIGINT,

    },
    current_date: {
        type: Sequelize.DATE
    },
    date_deliver: {
        type: Sequelize.DATE,
    },
    sub_total: {
        type: Sequelize.NUMBER,
    },
    discount: {
        type: Sequelize.NUMBER,
    },
    itbis: {
        type: Sequelize.NUMBER
    }
});


module.exports = Bill;