import Sequelize from 'sequelize';
import sequelize from '../database/database';

import billDetail from './bill-detail-model'
import Discount from './discount-model';
const ServicesType = sequelize.define("SERVICE_TYPE", {
    ID_SERVICE_TYPE: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
    },
    TYPE: {
        type: Sequelize.TEXT,
    },
    ID_SERVICE: {
        type: Sequelize.BIGINT
    },
    PRICE: {
        type: Sequelize.NUMBER
    },
    DISCOUNT: {
        type: Sequelize.SMALLINT
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

ServicesType.hasMany(billDetail,{foreignKey: 'ID_SERVICE_TYPE', sourceKey: 'ID_SERVICE_TYPE'});
billDetail.belongsTo(ServicesType,{foreignKey: 'ID_SERVICE_TYPE', sourceKey: 'ID_SERVICE_TYPE'});


ServicesType.hasMany(Discount, {foreignKey:'ID_SERVICE_TYPE', sourceKey:'ID_SERVICE_TYPE'});
Discount.belongsTo(ServicesType, {foreignKey:'ID_SERVICE_TYPE', sourceKey:'ID_SERVICE_TYPE'});



module.exports = ServicesType;