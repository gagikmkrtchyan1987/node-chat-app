const expect =require('expect')
var {isRealString}=require('./validation.js')



describe('isRealString', ()=>{
	it('should reject non string values', ()=>{
	
	var userDetails=isRealString(76);
	expect(userDetails).toBe(false);
	
	
	})

	it('should reject  string with only spaces ', ()=>{
	
	var userDetails=isRealString('      ');
	expect(userDetails).toBe(false);
	
	
	})

	it('should allow character with no spaces ', ()=>{
	
	var userDetails=isRealString('    Real-Madrid   ');
	expect(userDetails).toBe(true);
	
	
	})
})