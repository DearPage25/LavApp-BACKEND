import Sequelize from 'sequelize';

const  sequelize = new Sequelize(
    
    'LavApp',
    'DearPage25',
    'Odalmi16',
    {
        host: 'mitechy.com',
        dialect: 'postgres',
        port: 5533,
        pool:{
            max: 5,
            min: 0,
            require: 30000,
            idle: 10000,
        },
        logging: false
    }
);




module.exports = sequelize;
