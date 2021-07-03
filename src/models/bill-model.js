import Sequelize from 'sequelize';
import sequelize from '../database/database'

import billDetail from './bill-detail-model';
import User from './user-model';
const Bill = sequelize.define("BILL", {
    ID_BILL: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        unique:true,
        autoIncrement: true,
    },
    CUSTOMER: {
        type: Sequelize.BIGINT,

    },
    CURRENT_DATE: {
        type: Sequelize.DATE
    },
    DATE_DELIVER: {
        type: Sequelize.DATE,
    },
    SUB_TOTAL: {
        type: Sequelize.NUMBER,
    },
    DISCOUNT: {
        type: Sequelize.NUMBER,
    },
    ITBIS: {
        type: Sequelize.NUMBER
    },
    active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,   
    }, 
    employee: {
        type: Sequelize.INTEGER,
    }
},{
    schema: "LavApp Schema",
    freezeTableName: true,
    timestamps: false,
});

// Bill.belongsTo(User, {foreignKey: 'CUSTOMER', sourceKey: 'ID_USER'});
// User.hasMany(Bill, { as: 'CUSTUMER', foreignKey: 'CUSTOMER', sourceKey: 'ID_USER'});


// Bill.belongsTo(User, {foreignKey: 'employee', sourceKey: 'ID_USER'});
// User.hasMany(Bill, { as:'employee', foreignKey: 'employee', sourceKey: 'ID_USER'});

Bill.hasMany(billDetail, {foreignKey: 'ID_BILL', sourceKey:'ID_BILL'});
// billDetail.hasOne(Bill, {foreignKey: 'ID_BILL', sourceKey:'ID_BILL'});

// billDetail.belongsTo(Bill, {foreignKey: 'ID_BILL_DETAIL', sourceKey:'ID_BILL'});

// Bill.hasMany(User, {foreignKey: 'ID_USER', sorceKey: 'CUSTOMER'})
// User.belongsTo(Bill, {foreignKey: 'CUSTOMER', sorceKey: 'ID_USER'})


module.exports = Bill;