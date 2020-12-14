import Sequelize from 'sequelize';
import { sequelize } from '../database/database';

import User from './user-model';
import Rfid from './RFID-model';

const Departament = sequelize.define('departament', {
    id_departament: {
        type: Sequelize.BIGINT,
        primarykey: true,
    },
    departament_name: {
        type: Sequelize.TEXT,
    },
    departament_descr: {
        type: Sequelize.TEXT
    }
}, {
    timestamps: false,
});

Departament.hasMany(User, { foreignKey: 'id_department', sourceKey: 'id_departament' });
User.belongsTo(Departament, { foreignKey: 'id_department', sourceKey: 'id_departament' });

Departament.hasMany(Rfid, { foreignKey: 'id_current_detp', sourceKey: 'id_departament' });
Rfid.belongsTo(Departament, { foreignKey: 'id_current_detp', sourceKey: 'id_departament' });

module.exports = Departament;