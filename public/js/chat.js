 	var socket = io()
 	socket.on('connect', function() {
 	    var params=$.deparam(window.location.search)
      socket.emit('join', params, function(err){
        if(err){
          alert(err)
          window.location.href="/"
        }
        else{
          console.log('No error ')
        }
      })
 	})

   function scrollToBottom(){
      var messages=$('#messages-area');
      var newMessage=messages.children('li:last-child')
      var clientHeight=messages.prop('clientHeight');
      var scrollTop=messages.prop('scrollTop');
      var scrollHeight=messages.prop('scrollHeight')
      var newMessageHeight=newMessage.innerHeight()
      var lastMessageHeight=newMessage.prev().innerHeight()
      if((clientHeight+scrollTop+newMessageHeight+lastMessageHeight)>=scrollHeight){
        messages.scrollTop(scrollHeight)
      }
}

 	socket.on('newMessage', function(message) {
    var formattedTime=moment(message.createdAt).format('h:mm a')
    var template=$('#message-template').html()
    var html=Mustache.render(template, {
      text:message.text,
      from:message.from,
      createdAt:formattedTime
    })
     $('#messages-area').append(html)
     scrollToBottom()
 	  //   console.log('new Message', message)
 	  // var li =$('<li></li>')
 	  // li.text(`${message.from}: ${message.text} ${formattedTime}`)
 	  // $('#messages-area').append(li)
 	})

socket.on('updateUserList', function(users){
var ol=$('<ol></ol>')
users.forEach(function(user){
  ol.append($('<li></li>').text(user))
})
$('#users').html(ol)
})

 socket.on('newLocationMessage', function(message){
  var formattedTime=moment(message.createdAt).format('h:mm a')
  var template=$('#location-message-template').html()
  var html=Mustache.render(template,{
    url:message.url,
    from:message.from,
    createdAt:formattedTime

  })
  $('#messages-area').append(html)
  scrollToBottom()
  // var li=$('<li></li>');
  // var a=$('<a target="_blank">My Current location</a>');

  // li.text(`${message.from} ${formattedTime} `)
  // a.attr('href', message.url)
  // li.append(a)
  //  $('#messages-area').append(li)
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


