import Sequelize from 'sequelize';
import {sequelize} from '../database/database';


const Rfid = sequelize.define('rfid', {
    id_rfid: {
        type: Sequelize.BIGINT,
        primarykey: true,
    },
    date: {
        type: Sequelize.DATE,
    },
    id_current_detp: {
        type: Sequelize.BIGINT,
    },
    is_active: {
        type: Sequelize.BOOLEAN,
    },
    id_bill_detail: {
        type: Sequelize.BIGINT,
    },
    time: {
        type: Sequelize.DATE
    }


});

module.exports = Rfid;