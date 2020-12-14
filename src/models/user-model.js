import Sequelize from 'sequelize';
import {sequelize} from '../database/database';

import Bill from './bill-model'
import Discount from './discount-model'
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

//TODO: DOS RELACIONES A UNA MISMA TABLA [X]
User.hasMany(Bill, {foreignKey: 'customer', sourceKey: 'id_user'});
Bill.belongsTo(User, {foreignKey: 'customer', sourceKey: 'id_user'});
User.hasMany(Bill, {foreignKey: 'employee', sourceKey: 'id_user'});
Bill.belongsTo(User, {foreignKey: 'employee', sourceKey: 'id_user'});


User.hasMany(Discount, {foreignKey: 'id_user', sourceKey: 'id_user'});
Discount.belongsTo(User, {foreignKey: 'id_user', sourceKey: 'id_user'});

module.exports = User;