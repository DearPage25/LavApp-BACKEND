import Sequelize from 'sequelize';
import sequelize from '../database/database';
import ServicesType from './services-type-model';
const Services = sequelize.define('services', {
    id_service: {
        type: Sequelize.BIGINT,
        primarykey: true,
    },
    service: {
        type: Sequelize.TEXT,
    },
    description: {
        type: Sequelize.TEXT,
    },
},{
    schema: "LavApp Schema",
    tableName: "PERSON",
    freezeTableName: true,
    timestamps: false
});

Services.hasMany(ServicesType, { foreignKey: 'id_service', source: 'id_services' });
ServicesType.belongsTo(Services, { foreignKey: 'id_service', source: 'id_services' });

module.exports = Services;