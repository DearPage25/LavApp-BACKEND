import Sequelize from 'sequelize';
import sequelize from '../database/database';
import User from './user-model';
const Person = sequelize.define("PERSON", {
  
    ID_PERSON: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        unique: true,
        autoIncrement: true,

    },
    FIRST_NAME: {
        type: Sequelize.TEXT,
    },
    LAST_NAME: {
        type: Sequelize.TEXT,
    },
    BIRTH_DATE: {
        type: Sequelize.DATE,
    },
    TEL_NUMBER: {
        type: Sequelize.TEXT
    },
    ADDRESS: {
        type: Sequelize.TEXT
    },
},{
    schema: "LavApp Schema",
    tableName: "PERSON",
    freezeTableName: true,
    timestamps: false
});

// Person.sync({force:true});

Person.hasMany(User, { foreignKey: 'ID_PERSON', sourceKey: 'ID_PERSON' });
User.belongsTo(Person, { foreignKey: 'ID_PERSON', sourceKey: 'ID_PERSON' });



module.exports = Person;