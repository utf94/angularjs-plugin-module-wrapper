/*jshint esversion: 6 */

var formData = require('express-form-data');
var express = require('express');
var path = require('path');
var mongodb = require('mongodb');
var cors = require('cors');
var ObjectID = mongodb.ObjectID;
const os = require('os');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();


// parse data with connect-multiparty. 
app.use(formData.parse({
  uploadDir: os.tmpdir(),
  autoClean: true
}));
// union body and files
// app.use(formData.union());

app.use(cors());
app.use('/', express.static(__dirname + '/public'));

//implementing user permissions only

var db;

var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');



app.use(cookieParser());
app.use(bodyParser.json()); // support json encoded bodies






var server = app.listen(5000, function () {
  var port = server.address().port;
  console.log('App now running on port', port);
});