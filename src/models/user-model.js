import Sequelize from 'sequelize';
import {sequelize} from '../database/database';

const User = sequelize.define('user', {
    id_user: {
        type: Sequelize.BIGINT,
        primarykey: true
    },
    email: {
        type: Sequelize.TEXT
    },
    username: {
        type: Sequelize.TEXT
    },
    password: {
        type: Sequelize.TEXT
    },
    is_employee: {
        type: Sequelize.BOOLEAN
    },
    verified:{
        type: Sequelize.BOOLEAN
    },
    is_admin:{
        type: Sequelize.BOOLEAN
    },
    id_person:{
        type: Sequelize.BIGINT
    },
    id_department: {
        type: Sequelize.BIGINT
    },
}, {
    timestamps: false
});

module.exports = User;