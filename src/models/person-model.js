import Sequelize from 'sequelize';
import {sequelize} from '../database/database';

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

module.exports = Person;