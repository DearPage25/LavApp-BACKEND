import Sequelize from 'sequelize';
import sequelize from '../database/database';

const Config = sequelize.define('configurations', {
    ID_CONFIGURATION: {
        type: Sequelize.BIGINT,
        primaryKey: true
    },
    ITBIS: {
        type: Sequelize.SMALLINT,
    },
    sequence: {
        type: [Sequelize.BIGINT],
    },
    active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,   
    }
},{
    schema: "LavApp Schema",
    tableName: "CONFIGURATIONS",
    freezeTableName: true,
    timestamps: false
});
module.exports = Config;