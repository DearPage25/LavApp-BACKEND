import Sequelize from 'sequelize';
import sequelize from '../database/database';

import Bill from './bill-model'
import Discount from './discount-model'


const User = sequelize.define("USERS", {
    ID_USER: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
    },
    EMAIL: {
        type: Sequelize.TEXT
    },
    USERNAME: {
        type: Sequelize.TEXT
    },
    PASSWORD: {
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
    ID_PERSON:{
        type: Sequelize.BIGINT
    },
    id_department: {
        type: Sequelize.BIGINT
    },
}, {
    schema: "LavApp Schema",
    tableName: "PERSON",
    freezeTableName: true,
    timestamps: false
});
// TODO: DOS RELACIONES A UNA MISMA TABLA [X]
User.hasMany(Bill, {foreignKey: 'customer', sourceKey: 'ID_USER'});
Bill.belongsTo(User, {foreignKey: 'customer', sourceKey: 'ID_USER'});
User.hasMany(Bill, {foreignKey: 'employee', sourceKey: 'ID_USER'});
Bill.belongsTo(User, {foreignKey: 'employee', sourceKey: 'ID_USER'});


User.hasMany(Discount, {foreignKey: 'ID_USER', sourceKey: 'ID_USER'});
Discount.belongsTo(User, {foreignKey: 'ID_USER', sourceKey: 'ID_USER'});

export default User;