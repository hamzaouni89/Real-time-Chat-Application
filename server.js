var express = require('express')
var cors = require('cors');
var app = express()
app.use(cors());

var bodyParser = require('body-parser')

require('./api/passport');
var db = require('./database/db')
var conversations = require("./api/apiConversation");
var users = require('./api/apiUser')

const passport = require('passport');
const http = require('http').Server(app)

// require the socket.io module
const io = require('socket.io')(http, {origins: '*:*'});
app.io = io;

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))

app.use('/users', users)
app.use("/conversations", conversations);
http.listen(3000, (err => {
  if (err) throw err;
  console.log(`server is running on port 3000`)
}))
