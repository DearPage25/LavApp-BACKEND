import Sequelize from 'sequelize';
import sequelize from '../database/database';
import billDetail from './bill-detail-model';

const Rfid = sequelize.define("RFID", {
    ID_RFID: {
        type: Sequelize.BIGINT,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    },
    DATE: {
        type: Sequelize.DATE,
    },
    ID_CURRENT_DEPT: {
        type: Sequelize.BIGINT,
    },
    IS_ACTIVE: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
    },
    ID_BILL_DETAIL: {
        type: Sequelize.BIGINT,
    },
    TIME: {
        type: Sequelize.DATE
    },
    active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,   
    }

},{
    schema: "LavApp Schema",
    freezeTableName: true,
    timestamps: false
});

module.exports = Rfid;