const path = require('path');
const publicPath = path.join(__dirname, '../public');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const {Users}=require('./utils/users.js');
const { generateMessage, generateLocationMessage } = require('./utils/message.js');
const {isRealString} =require('./utils/validation.js');
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();
io.on('connection', (socket) => {
    console.log('New user connected');

     


    socket.on('join', (params, callback)=>{
        if(!isRealString(params.name)|| !isRealString(params.room)){
           return callback('Name and room naem are required')
        }else{
            socket.join(params.room)
            users.removeUser(socket.id)
            users.addUser(socket.id,  params.name,params.room)
            io.to(params.room).emit('updateUserList', users.getUserList(params.room))
            socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat'))
            socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`))
            callback()
        }
    })

    socket.on('createMessage', (message, callback) => {
        console.log('Create Message', message)
        io.emit('newMessage', generateMessage(message.from, message.text))
        callback('This came from server')
    })


    socket.on('createLocation', (coords) => {
        console.log('Create Location', coords)
        io.emit('newLocationMessage', generateLocationMessage('Administrator: ', coords.latitude, coords.longitude))

    })

    socket.on('disconnect', () => {
       var user =users.removeUser(socket.id)
       if(user){
        io.to(user.room).emit('updateUserList', users.getUserList(user.room))
        io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`))
       }
    })

});




const port = process.env.PORT || 3000;
app.use(express.static(publicPath));
server.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});