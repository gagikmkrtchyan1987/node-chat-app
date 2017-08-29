var expect =require('expect');
var {generateMessage,generateLocationMessage}=require('./message')


describe('generateMessage', ()=>{
	it('it should generate correct message object', ()=>{
		var from='gagikmkrtchyan87@gmail.com';
	var text='Some text for testing';
	var message=generateMessage(from, text);
	expect(message.createdAt).toBeA('number');
	expect(message).toInclude({
		from:from,
		text:text
	})
	})

	
})

describe('generateLocationMessage', ()=>{
	it('it should generate correct location object', ()=>{
	var from='Admino';
	var latitude=40.1791857;
	var longitude=44.4991029;
	var url=`https://www.google.com/maps?q=40.1791857,44.4991029`
	var message=generateLocationMessage(from, latitude, longitude);
	 expect(message.createdAt).toBeA('number');
	expect(message).toInclude({
		from:from,
		url:url
	})
	})

	
})