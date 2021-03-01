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
    IS_EMPLOYEE: {
        type: Sequelize.BOOLEAN
    },
    VERIFIED:{
        type: Sequelize.BOOLEAN
    },
    IS_ADMIN:{
        type: Sequelize.BOOLEAN
    },
    ID_PERSON:{
        type: Sequelize.BIGINT
    },
    ID_DEPARTMENT: {
        type: Sequelize.BIGINT
    },
    is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
    }
    ,
    ACTIVE: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,   
    },
    ROLE: {
        type: Sequelize.TEXT,
        defaultValue: "CL",

    }
}, {
    schema: "LavApp Schema",
    freezeTableName: true,
    timestamps: false
});
User.prototype.toJSON =  function () {
    var values = Object.assign({}, this.get());
  
    delete values.PASSWORD;
    return values;
}

User.hasMany(Bill, {foreignKey: 'CUSTOMER', sourceKey: 'ID_USER'});
Bill.belongsTo(User, {foreignKey: 'CUSTOMER', sourceKey: 'ID_USER'});


User.hasMany(Bill, {foreignKey: 'employee', sourceKey: 'ID_USER'});
Bill.belongsTo(User, {foreignKey: 'employee', sourceKey: 'ID_USER'});

User.hasMany(Discount, {foreignKey: 'ID_USER', sourceKey: 'ID_USER'});
Discount.belongsTo(User, {foreignKey: 'ID_USER', sourceKey: 'ID_USER'});

export default User;