var expect =require('expect');
var {generateMessage}=require('./message')


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