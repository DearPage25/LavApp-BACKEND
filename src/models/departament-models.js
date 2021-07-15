import Sequelize from 'sequelize';
import sequelize from '../database/database';

import User from './user-model';
import Rfid from './RFID-model';

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
    },
    USE_SCANNER: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,   
    }
},{
    schema: "LavApp Schema",
    freezeTableName: true,
    timestamps: false
});
Departament.hasMany(User, { foreignKey: 'ID_DEPARTMENT', sourceKey: 'ID_DEPARTMENT' });
User.hasOne(Departament, { foreignKey: 'ID_DEPARTMENT', sourceKey: 'ID_DEPARTMENT' });

// Departament.hasMany(Rfid, { foreignKey: 'ID_CURRENT_DETP', sourceKey: 'ID_DEPARTMENT' });
// Rfid.belongsTo(Departament, { foreignKey: 'ID_DEPARTMENT', sourceKey: 'ID_CURRENT_DETP' });

module.exports = Departament;