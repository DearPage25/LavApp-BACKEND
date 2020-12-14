import Sequelize from 'sequelize';
import {sequelize} from '../database/database';

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
},{
    timestamps: false,
});


module.exports = Departament;