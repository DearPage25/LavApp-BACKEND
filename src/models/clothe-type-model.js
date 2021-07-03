import Sequelize from 'sequelize';
import sequelize from '../database/database';
import billDetail from './bill-detail-model';
const ClotheType = sequelize.define('clothe_type', {
    ID_CLOTHE_TYPE: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
    },
    CLOTHE_TYPE: {
        type: Sequelize.TEXT,
    },
    active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,   
    }

}, {
    schema: "LavApp Schema",
    tableName: "CLOTHE_TYPE",
    freezeTableName: true,
    timestamps: false
});

// ClotheType.hasMany(billDetail, { foreignKey: 'ID_CLOTHE_TYPE', suorceKey: 'ID_CLOTHE_TYPE' });
// billDetail.belongsTo(ClotheType, { foreignKey: 'ID_CLOTHE_TYPE', suorceKey: 'ID_CLOTHE_TYPE' });

module.exports = ClotheType;