'use strict';

const indexRouter = require('./routers/index.router');
const dizimoRouter = require('./routers/dizimo.router');
const admRouter = require('./routers/adm.router');
const app = require('./init.app');

// Router
app.use('/', indexRouter);
app.use('/dizimo', dizimoRouter);
app.use('/dizimo/adm', admRouter);

module.exports = app;