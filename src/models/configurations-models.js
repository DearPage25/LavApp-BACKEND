import Sequelize from 'sequelize';
import sequelize from '../database/database';

const Config = sequelize.define('configurations', {
    id_configuration: {
        type: Sequelize.BIGINT,
        primarykey: true,
    },
    itbis: {
        type: Sequelize.SMALLINT,
    },

},{
    schema: "LavApp Schema",
    tableName: "PERSON",
    freezeTableName: true,
    timestamps: false
});
module.exports = Config;