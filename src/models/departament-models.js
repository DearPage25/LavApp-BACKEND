import Sequelize from 'sequelize';
import sequelize from '../database/database';

import User from './user-model';
// import Rfid from './RFID-model';

import billDetail from './bill-detail-model'
const Departament = sequelize.define("DEPARTMENT", {
    ID_DEPARTMENT: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
    },
    DEPARTMENT_NAME: {
        type: Sequelize.TEXT,
    },
    DEPARTMENT_DESCR: {
        type: Sequelize.TEXT
    }
},{
    schema: "LavApp Schema",
    freezeTableName: true,
    timestamps: false
});
Departament.hasMany(User, { foreignKey: 'ID_DEPARTMENT', sourceKey: 'ID_DEPARTMENT' });
User.hasOne(Departament, { foreignKey: 'ID_DEPARTMENT', sourceKey: 'ID_DEPARTMENT' });

Departament.hasMany(billDetail, { foreignKey: 'CURRENT_DEPT', sourceKey: 'ID_DEPARTMENT' });
billDetail.belongsTo(Departament, { foreignKey: 'CURRENT_DEPT', sourceKey: 'ID_DEPARTMENT' });

module.exports = Departament;