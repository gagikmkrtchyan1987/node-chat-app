 	var socket = io()
 	socket.on('connect', function() {
 	    console.log('User connected')
 	})
 	socket.on('newMessage', function(message) {
 	    console.log('new Message', message)
 	  var li =$('<li></li>')
 	  li.text(`${message.from}: ${message.text}`)
 	  $('#messages-area').append(li)
 	})
 	socket.on('disconnect', function() {
 	    console.log('User has disconnected')
 	})
 	

 	$('#message-form').on('submit', function(e){
 		e.preventDefault()
 		socket.emit('createMessage',{
 			from:'User',
 			text:$('[name=message]').val()
 		}, function(){
 			$('[name=message]').val('')
 		})
 	})
  