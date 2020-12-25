import Sequelize from 'sequelize';
import sequelize from '../database/database';
import Rfid from './RFID-model';
const billDetail = sequelize.define('bill_detail', {
    id_bill_detail: {
        type: Sequelize.BIGINT,
        primarykey: true,
    },
    id_bill: {
        type: Sequelize.BIGINT,
    },
    id_service_type: {
        type: Sequelize.BIGINT,
    },
    service_type_price: {
        type: Sequelize.NUMBER,
    },
    id_clothe_type: {
        type: Sequelize.BIGINT,
    },
    current_dept:{
        type: Sequelize.BIGINT,
    },
    last_update: {
        type: Sequelize.DATE,
    },

    proccessing_time: {
        type: Sequelize.DATE,
    }, 
}, {
    schema: "LavApp Schema",
    tableName: "PERSON",
    freezeTableName: true,
    timestamps: false
});

billDetail.hasMany(Rfid,   {foreignKey: 'id_bill_detail', source: 'id_bill_detail'} )
Rfid.belongsTo(billDetail, {foreignKey: 'id_bill_detail', source: 'id_bill_detail'} )
module.exports = billDetail;