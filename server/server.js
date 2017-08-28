const path = require('path');
const publicPath = path.join(__dirname, '../public');
const express = require('express');
const http=require('http')
const socketIO = require('socket.io')
const {generateMessage}=require('./utils/message.js')
var app = express();
var server = http.createServer(app);
var io=socketIO(server)
io.on('connection', (socket)=>{
	console.log('New user connected');

socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat'))

socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'))


socket.on('createMessage', (message, callback)=>{
	console.log('Create Message', message)
	io.emit('newMessage', generateMessage(message.from, message.text))
	callback('This came from server')
})

socket.on('disconnect', ()=>{
		console.log('User disconnected')
	})

});




const port = process.env.PORT || 3000;
app.use(express.static(publicPath));
server.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});


