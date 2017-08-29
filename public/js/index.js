 	var socket = io()
 	socket.on('connect', function() {
 	    console.log('User connected')
 	})
 	socket.on('newMessage', function(message) {
    var formattedTime=moment(message.createdAt).format('h:mm a')
 	    console.log('new Message', message)
 	  var li =$('<li></li>')
 	  li.text(`${message.from}: ${message.text} ${formattedTime}`)
 	  $('#messages-area').append(li)
 	})

 socket.on('newLocationMessage', function(message){
  var formattedTime=moment(message.createdAt).format('h:mm a')
  var li=$('<li></li>');
  var a=$('<a target="_blank">My Current location</a>');

  li.text(`${message.from} ${formattedTime} `)
  a.attr('href', message.url)
  li.append(a)
   $('#messages-area').append(li)
 })

 	socket.on('disconnect', function() {
 	    console.log('User has disconnected')
 	})
 	

 	$('#message-form').on('submit', function(e){
    var messageTextbox=$('[name=message]')
 		e.preventDefault()
 		socket.emit('createMessage',{
 			from:'User',
 			text:messageTextbox.val()
 		}, function(){
 			messageTextbox.val('')
 		})
 	})
  
  var locationButton=$('#send-location')

  locationButton.on('click', function(){
  	if (!"geolocation" in navigator) {
  		return alert('Geolocation is not available on your browser')
} else {
   locationButton.attr('disabled', 'disabled').text('Sending Location ...')
  	navigator.geolocation.getCurrentPosition(function(position){
      locationButton.removeAttr('disabled').text('Send Location')
  		socket.emit('createLocation', {
  			latitude:position.coords.latitude,
  			longitude:position.coords.longitude
  		})

  	}, function(){
       locationButton.removeAttr('disabled')
  		alert('Unable to fetch location')
  	})
}
  })


