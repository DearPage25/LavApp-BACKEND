import Sequelize from 'sequelize';
import sequelize from '../database/database';
import Rfid from './RFID-model';
import ServicesType from './services-type-model';
import Bill from './bill-model';
const billDetail = sequelize.define('BILL_DETAIL', {
    ID_BILL_DETAIL: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
    },
    ID_BILL: {
        type: Sequelize.BIGINT,
    },
    ID_SERVICE_TYPE: {
        type: Sequelize.BIGINT,
    },
    SERVICE_TYPE_PRICE: {
        type: Sequelize.NUMBER,
    },
    CURRENT_DEPT:{
        type: Sequelize.BIGINT,
    },
    LAST_UPDATE: {
        type: Sequelize.DATE,
    },

    PROCESSING_TIME: {
        type: Sequelize.DATE,
    },
}, {
    schema: "LavApp Schema",
    tableName: "BILL_DETAIL",
    freezeTableName: true,
    timestamps: false
});
billDetail.belongsTo(ServicesType, {foreignKey: 'ID_SERVICE_TYPE', source: 'ID_SERVICE_TYPE'});
ServicesType.hasMany(billDetail, {foreignKey: 'ID_SERVICE_TYPE', source: 'ID_SERVICE_TYPE'});
// billDetail.hasMany(Rfid,   {foreignKey: 'ID_BILL_DETAIL', source: 'ID_BILL_DETAIL'} )
// Rfid.belongsTo(billDetail, {foreignKey: 'ID_BILL_DETAIL', source: 'ID_BILL_DETAIL'} )


module.exports = billDetail;