import Sequelize from 'sequelize';
import sequelize from '../database/database';

import billDetail from './bill-detail-model'
import Discount from './discount-model';
import ClotheType from './clothe-type-model';
import Services from './services-model';

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
    ID_CLOTHE_TYPE: {
        type: Sequelize.INTEGER,
    }
    
},{
    schema: "LavApp Schema",
    freezeTableName: true,
    timestamps: false
});

ServicesType.hasOne(ClotheType, {foreignKey: 'ID_CLOTHE_TYPE', sourceKey: 'ID_CLOTHE_TYPE'});
ClotheType.hasMany(ServicesType, {foreignKey: 'ID_CLOTHE_TYPE', sourceKey: 'ID_CLOTHE_TYPE'})
// ServicesType.hasMany(billDetail, {foreignKey: 'ID_SERVICE_TYPE', source: 'ID_SERVICE_TYPE'});
// ServicesType.belongsTo(billDetail);
ServicesType.hasOne(Services, { foreignKey: 'ID_SERVICE', source: 'ID_SERVICES' });
Services.hasMany(ServicesType, { foreignKey: 'ID_SERVICE', source: 'ID_SERVICES' });

// ServicesType.belongsTo(Services, { foreignKey: 'ID_SERVICE', source: 'ID_SERVICES' });


// ServicesType.hasMany(billDetail,{foreignKey: 'ID_SERVICE_TYPE', sourceKey: 'ID_SERVICE_TYPE'});


// ServicesType.hasMany(Discount, {foreignKey:'ID_SERVICE_TYPE', sourceKey:'ID_SERVICE_TYPE'});
// Discount.belongsTo(ServicesType, {foreignKey:'ID_SERVICE_TYPE', sourceKey:'ID_SERVICE_TYPE'});



module.exports = ServicesType;