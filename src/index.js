import app from './server';
import '@babel/polyfill';
import Sequelize from 'sequelize';
async function main() {
    await app.listen(300);
    console.log('server on port 3000');

}

main();