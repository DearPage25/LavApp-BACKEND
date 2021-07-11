import Sequelize from 'sequelize';
import sequelize from '../database/database';
import ServicesType from './services-type-model';
const Services = sequelize.define('SERVICES', {
    ID_SERVICE: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        unique: true,
        //TODO: autoIncrement no esta, asi 
        // las compañias pueden crear su propia codificacion
    },
    SERVICE: {
        type: Sequelize.TEXT,
    },
    DEP_PROCESS:{
        type: Sequelize.BIGINT,
    },
},{
    schema: "LavApp Schema",
    tableName: "SERVICES",
    freezeTableName: true,
    timestamps: false
});

// Services.hasMany(ServicesType, { foreignKey: 'ID_SERVICE', source: 'ID_SERVICES' });
// ServicesType.belongsTo(Services, { foreignKey: 'ID_SERVICE', source: 'ID_SERVICES' });

module.exports = Services;