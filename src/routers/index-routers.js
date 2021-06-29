import express from 'express';
const app = express();

app.use(require ('./user-routers'));
app.use(require ('./person-routers'));
app.use(require ('./departament-routers'));
app.use(require ('./services-routers'));
app.use(require ('./clothe-type-routers'));
app.use(require ('./RFID-routers'));
app.use(require ('./bill-routers'));
app.use(require ('./bill-detail-routers'));
app.use(require ('./services-type-routers'));
app.use(require ('./view-routers'));

module.exports = app;