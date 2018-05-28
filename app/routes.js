const express = require('express');

const routes = express.Router();

// Middlewares
const authMiddleware = require('./middlewares/auth');
const guestMiddleware = require('./middlewares/guest');

// Controllers
const authController = require('./controllers/authController');
const dashboardController = require('./controllers/dashboardController');
const projectController = require('./controllers/projectController');
const sectionController = require('./controllers/sectionController');

// Messages
routes.use((req, res, next) => {
  res.locals.flashSuccess = req.flash('success');
  res.locals.flashError = req.flash('error');
  next();
});

// Auth
routes.get('/', guestMiddleware, authController.signin);
routes.get('/signup', guestMiddleware, authController.signup);
routes.get('/signout', authController.signout);

routes.post('/register', authController.register);
routes.post('/authenticate', authController.authenticate);

// Dashboard
routes.use('/app', authMiddleware);
routes.get('/app/dashboard', dashboardController.index);

// Projects
routes.get('/app/projects/:id', projectController.show);
routes.post('/app/projects/create', projectController.store);

// Sections
routes.get('/app/projects/:projectId/sections/new', sectionController.view);
//routes.get('/app/projects/:projectId/sections/:id', sectionController.show);
routes.post('/app/projects/:projectId/sections/create', sectionController.store);

// Errors
routes.use((req, res) => res.render('errors/404'));

routes.use((err, req, res, _next) => { // middleware de erro 4 parametros sempre
  res.status(err.status || 500); // 500 erro padrão de servidor

  return res.render('errors/index', {
    message: err.message,
    error: process.env.NODE_ENV === 'production' ? {} : err, // não mostrar erro em produção
  });
});

module.exports = routes;
