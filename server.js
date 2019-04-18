var express = require('express')
var bodyParser = require('body-parser')
var db = require('./database/db')
var users = require('./api/apiUser')
var http = require('http');
var cors = require('cors');
var app = express()
var server = http.createServer(app)
var io = require('socket.io').listen(server)

io.on('connection',(socket)=>{

    console.log('new connection made.');


    socket.on('join', function(data){
      //joining
      socket.join(data.room);

      console.log(data.user + 'joined the room : ' + data.room);

      socket.broadcast.to(data.room).emit('new user joined', {user:data.user, message:'has joined this room.'});
    });


    socket.on('leave', function(data){
    
      console.log(data.user + 'left the room : ' + data.room);

      socket.broadcast.to(data.room).emit('left room', {user:data.user, message:'has left this room.'});

      socket.leave(data.room);
    });

    socket.on('message',function(data){

      io.in(data.room).emit('new message', {user:data.user, message:data.message});
    })
});
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors());

app.use('/users', users)
app.listen(3000, (err => {
    if (err) throw err;
    console.log('server is running on port 3000')
}))