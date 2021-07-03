import Sequelize from 'sequelize';
import sequelize from '../database/database';

import Bill from './bill-model'
import Discount from './discount-model'
import Person from './person-model'

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
        isIn:[['ADMIN','EMP', 'SUP','CL']],
        //ADMIN = ADMINISTRADOR
        //EMP = EMPPLOYEE
        //SUP = SUPERVISOR
        //CL = CLIENTE
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

// Bill.belongsTo(User, {foreignKey: 'CUSTOMER', sourceKey:'ID_USER'});
// User.hasMany(Bill, {foreignKey: 'ID_USER', sourceKey:'CUSTOMER'} )

// Bill.belongsTo(User, {foreignKey: 'employee', source: 'ID_USER'});
// User.hasMany(Bill, {foreignKey: 'employee', source: 'ID_USER'});

User.hasMany(Bill,{as: 'cliente',foreignKey: 'CUSTOMER', sourceKey: 'ID_USER', });
Bill.belongsTo(User, {as: 'cliente', foreignKey: 'CUSTOMER', sourceKey: 'ID_USER', });


User.hasMany(Bill, { as: 'trabajador',foreignKey: 'employee', sourceKey: 'ID_USER',});
Bill.belongsTo(User, {as:'trabajador',foreignKey: 'employee', sourceKey: 'ID_USER',});

// User.hasMany(Discount, {foreignKey: 'ID_USER', sourceKey: 'ID_USER'});
// Discount.belongsTo(User, {foreignKey: 'ID_USER', sourceKey: 'ID_USER'});

User.hasOne(Person, { foreignKey: 'ID_PERSON', sourceKey: 'ID_PERSON' });
Person.hasOne(User, { foreignKey: 'ID_PERSON', sourceKey: 'ID_PERSON' });


export default User;