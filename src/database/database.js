import Sequelize from 'sequelize';

const  sequelize = new Sequelize(
    
    'LavApp',
    'dp14',
    'dp14',
    {
        host: 'api.mitechy.com',
        dialect: 'postgres',
        port: 5533,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        logging: false,
    }
);


module.exports = sequelize;


