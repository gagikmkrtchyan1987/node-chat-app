 	var socket=io()
	 	socket.on('connect', function(){
		console.log('User connected')
	
		socket.emit('createMessage', {
			from:'Gagik',
			text:'Real Madrid',
			completedAt:123
		})

		
	})


	 	socket.on('newMessage', function(mess){
			console.log('new Message', mess)
		})


	 	socket.on('disconnect', function(){
		console.log('User has disconnected')
	})

	 
	 