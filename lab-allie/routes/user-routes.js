'use strict';

const createError = require('http-errors');
const userCtrl = require('../controller/user-controller.js');
const basicAuth = require('../lib/basic-auth-middleware.js');

module.exports = function(router) {
  router.post('/signup', (req, res) => {
    userCtrl.signUp(req)
    .then(token => {
      res.json(token);
    })
    .catch(err => createError(404, err.message));
  });
  
  router.get('/signin', basicAuth, (req, res) => {
    userCtrl.signIn(req)
    .then(token => res.json(token))
    .catch(err => res.status(err.status).send(err));
  });
  
  return router;
};