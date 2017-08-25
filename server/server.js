const path = require('path');
const publicPath = path.join(__dirname, '../public');
const express = require('express');
const http=require('http')
const socketIO = require('socket.io')
var app = express();
var server =http.createServer(app);
var io=socketIO(server)
io.on('connection', (socket)=>{
	console.log('New user connected');
socket.on('disconnect', ()=>{
		console.log('User disconnected')
	})
});




const port = process.env.PORT || 3000;
app.use(express.static(publicPath));
server.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});