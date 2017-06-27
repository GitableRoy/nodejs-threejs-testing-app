var express = require('express')

var middleware = module.exports = {
  useThreeJS: function(app) {
    app.use('/three/build',       express.static(__dirname + '/node_modules/three/build/'))
       .use('/three/examples/js', express.static(__dirname + '/node_modules/three/examples/js/'))
  },

  useJQuery: function(app) {
    app.use('/jquery',            express.static(__dirname + '/node_modules/jquery/dist/'))
  },

  useBootstrap: function(app) {
    app.use('/bootstrap/css',     express.static(__dirname + '/node_modules/bootstrap/dist/css/'))
       .use('/bootstrap/js',      express.static(__dirname + '/node_modules/bootstrap/dist/js/'))
  },

  logGetReqs: function(app) {
    app.use(function(req, res, next) {
          console.log(`${req.method} request for '${req.url}'`);
          next();
        })
  }
};
