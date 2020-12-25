import app from './server';
import '@babel/polyfill';
import sequelize from './database/database'
async function main() {
    await app.listen(3000);
    console.log('server on port 3000');
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

main();