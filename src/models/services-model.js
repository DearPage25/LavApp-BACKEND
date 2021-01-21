import Sequelize from 'sequelize';
import sequelize from '../database/database';
import ServicesType from './services-type-model';
const Services = sequelize.define('SERVICES', {
    ID_SERVICE: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        unique: true,
    },
    SERVICE: {
        type: Sequelize.TEXT,
    },
    DESCRIPTION: {
        type: Sequelize.TEXT,
    },
},{
    schema: "LavApp Schema",
    tableName: "SERVICES",
    freezeTableName: true,
    timestamps: false
});

Services.hasMany(ServicesType, { foreignKey: 'ID_SERVICE', source: 'ID_SERVICES' });
ServicesType.belongsTo(Services, { foreignKey: 'ID_SERVICE', source: 'ID_SERVICES' });

module.exports = Services;