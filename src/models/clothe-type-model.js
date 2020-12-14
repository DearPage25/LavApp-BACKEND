import Sequelize, { Model } from 'sequelize';
import {sequelize} from '../database/database';

const ClotheType =  sequelize.define('clothe_type', {
    id_clothe_type: {
        type: Sequelize.BIGINT,
        primarykey: true,
    },
    clothe_type: {
        type: Sequelize.TEXT,
    },
    notes: {
        type: Sequelize.TEXT,
    },

}, {
    timestamps: false
});

module.exports = ClotherType;