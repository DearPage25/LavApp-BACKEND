import Sequelize from 'sequelize';
import { sequelize } from '../database/database';
import User from './user-model';
const Person = sequelize.define('person', {
    id_person: {
        type: Sequelize.BIGINT,
        primarykey: true,
    },
    first_name: {
        type: Sequelize.TEXT,
    },
    last_name: {
        type: Sequelize.TEXT,
    },
    birth_date: {
        type: Sequelize.DATE,
    },
    tel_number: {
        type: Sequelize.TEXT
    },
    address: {
        type: Sequelize.TEXT
    },
});

Person.hasMany(User, { foreignKey: 'id_person', sourceKey: 'id_person' });
User.belongsTo(Person, { foreignKey: 'id_person', sourceKey: 'id_person' });



module.exports = Person;