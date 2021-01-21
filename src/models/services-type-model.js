import Sequelize from 'sequelize';
import sequelize from '../database/database';

import billDetail from './bill-detail-model'
import Discount from './discount-model';
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
    schema: "LavApp Schema",
    tableName: "PERSON",
    freezeTableName: true,
    timestamps: false
});

ServicesType.hasMany(billDetail,{foreignKey: 'id_service_type', sourceKey: 'id_service_type'});
billDetail.belongsTo(ServicesType,{foreignKey: 'id_service_type', sourceKey: 'id_service_type'});


ServicesType.hasMany(Discount, {foreignKey:'id_service_type', sourceKey:'id_service_type'});
Discount.belongsTo(ServicesType, {foreignKey:'id_service_type', sourceKey:'id_service_type'});



module.exports = ServicesType;