// require express path not needed for node_modules
const express = require('express');

// require a file uploader that works with express
const fileupload = require('express-fileupload');

// require a file system reader
const fs = require('fs')

// require to change favicon
const favicon = require('serve-favicon')

// create an instance of your application
const app = express();

// an array for views. each element represent a directory with view engine files
var views = ["views"]

// declare what directories  we want our to be in our views
fs.readdirSync('./views').forEach(function (path) {
  // TODO - use fs.lstat err return do actually determine if path var is a dir
  if(!path.includes('.')) {
    // push each sub directory in views onto views variable
    views.push('views/'+ path +'');
  }
});

app.set('views', views);
app.set('view engine', 'pug');

// set some local variables for the application
var navbar = [];
// create a list of pages from the "views" dir in navbar variable
views.forEach(function(path){
  fs.readdirSync('./'+ path +'').forEach(function (link) {
    if(link.substr(-4) == '.pug') {
      navbar.push(link.split(".")[0]);
    }
  });
});
// set a variable "links" in app.locals for pug to use as navbar links
app.locals.links = navbar;
// set a variable title app.locals for pug to use as the site's title
app.locals.title = "ThreeJS Site"

// add middleware for app
// TODO make middleware be run through seperate file
// use a static file server that comes with express and add it to your app instance
app.use(function(req, res, next) {
      console.log(`${req.method} request for '${req.url}'`);
      next();
    })
   // TODO .use(favicon(__dirname +'/public/favicon.ico'))
   .use('/',                  express.static('./public'))
   .use('/jquery',            express.static(__dirname + '/node_modules/jquery/dist/'))
   .use('/bootstrap/css',     express.static(__dirname + '/node_modules/bootstrap/dist/css/'))
   .use('/bootstrap/js',      express.static(__dirname + '/node_modules/bootstrap/dist/js/'))
   .use('/three/build',       express.static(__dirname + '/node_modules/three/build/'))
   .use('/three/examples/js', express.static(__dirname + '/node_modules/three/examples/js/'))

// add a route for every example script not related to the build
fs.readdirSync('./node_modules/three/examples/js').forEach(function (path) {
 if(path.substr(-3) != '.js') {
   app.use('/three/examples/js/'+ path +'', express.static(__dirname + '/node_modules/three/examples/js/'+ path +'/') );
 }
});

// add instance of express-fileupload to app's middleware
app.use(fileupload());

// add a post call using express-fileupload
app.post('/upload', function(req, res) {
  // reply if req.files is empty
  if ( !req.files ) return res.status(400).send('No files were uploaded.');
  // The name of the input field (i.e. "inputFile") is used to retrieve the uploaded file
  let inputFile = req.files.inputFile;
  // Use the mv() method to place the file somewhere on your server
  inputFile.mv(__dirname + '/public/uploads/' + req.files.inputFile.name, function(err) {
    if ( err ) return res.status(500).send(err);
    res.send('File uploaded');
  });
});

// GET request for root returns a render of the homepage view
app.get('/', function(req, res){
  res.render('home');
});

// loop through each directory in views variable
views.forEach(function(path){
  // for each directory in views, create a route for all pug files
  fs.readdirSync('./'+ path +'').forEach(function (page) {
    if(page.substr(-4) == '.pug') {
      // take the name of the file and cut out the extension
      app.get('/'+ page.split(".", 1)[0] +'', function(req, res){
        res.render(page.split(".", 1)[0]);
      });
    }
  });
});

// run app on localhost
app.listen(3000);
console.log("Now running application on http://localhost:3000/")

// export app to be used by other objects
module.exports = app;
