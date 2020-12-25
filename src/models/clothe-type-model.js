import Sequelize, { Model } from 'sequelize';
import sequelize from '../database/database';
import billDetail from './bill-detail-model';
const ClotheType =  sequelize.define('clothe_type', {
    id_clothe_type: {
        type: Sequelize.BIGINT,
        primarykey: true,
    },
    clothe_type: {
        type: Sequelize.TEXT,
    },
    notes: {
        type: Sequelize.TEXT,
    },

},{
    schema: "LavApp Schema",
    tableName: "PERSON",
    freezeTableName: true,
    timestamps: false
});

ClotheType.hasMany(billDetail, { foreignKey: 'id_clothe_type', suorceKey: 'id_clothe_type'});
billDetail.belongsTo(ClotheType, { foreignKey: 'id_clothe_type', suorceKey: 'id_clothe_type'});

module.exports = ClotheType;