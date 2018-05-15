const express = require('express');
const routes = express.Router();

routes.get('/', (req, res) => { res.render('auth/signin') });

module.exports = routes;
