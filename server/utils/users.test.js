const expect =require('expect');

const  {Users} =require('./users');


describe('Users', ()=>{

	var users;
	beforeEach(()=>{
		users=new Users();
		users.users.push({
			id:'1',
			name:'Poghos',
			room:'Node Course'
		},
		{
			id:'2',
			name:'Petros',
			room:'Angular 4'
		},
		{
			id:'3',
			name:'Martiros',
			room:'Node Course'
		})
	})

	it('it should add new user', ()=>{
	var users =new Users()
	var user={
		id:'dsadasdsa',
		name:'Gagik',
		room:'senyak'
	}
	var resUser=users.addUser(user.id, user.name, user.room)
	expect(users.users).toEqual([user])
	})


	it('should remove the user', ()=>{
		var userId='3';
		var user =users.removeUser(userId)
		expect(user.id).toBe(userId)
		expect(users.users.length).toBe(2)
	})

	it('should not remove the user', ()=>{
		var userId='99';
		var user =users.removeUser(userId)
		expect(user).toNotExist()
		expect(users.users.length).toBe(3)
	})

	it('should find the user', ()=>{
		var userId='2';
		var user=users.getUser(userId)
		expect(user.id).toBe(userId)
	})

	it('should not find remove the user', ()=>{
		var userId='5';
		var user=users.getUser(userId)
		expect(user).toNotExist()
	})


	it('should return names for Node Course', ()=>{
		var userList=users.getUserList('Node Course')
		expect(userList).toEqual(['Poghos', 'Martiros'])
	})

		it('should return names for Angular 4 Course', ()=>{
		var userList=users.getUserList('Angular 4')
		expect(userList).toEqual(['Petros'])
	})
	
})
