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

 socket.on('newLocationMessage', function(message){
  var li=$('<li></li>');
  var a=$('<a target="_blank">My Current location</a>');

  li.text(message.from)
  a.attr('href', message.url)
  li.append(a)
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
  
  var locationButton=$('#send-location')

  locationButton.on('click', function(){
  	if (!"geolocation" in navigator) {
  		return alert('Geolocation is not available on your browser')
} else {
  	navigator.geolocation.getCurrentPosition(function(position){
  		socket.emit('createLocation', {
  			latitude:position.coords.latitude,
  			longitude:position.coords.longitude
  		}, function(){

  		})

  	}, function(){
  		alert('Unable to fetch location')
  	})
}
  })


