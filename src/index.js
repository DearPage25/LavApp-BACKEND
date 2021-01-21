import app from './server';
import '@babel/polyfill';
import sequelize from './database/database'
async function main() {
    await app.listen(process.env.PORT );
    console.log('server on port:', process.env.PORT );
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

main();