[{
	id:'2435435rew63534',
	name:'Gagik',
	room:'The office fans'
}]


class Users {
	constructor(){
		this.users=[]
	}
	addUser(id, name, room){
		var user={
			id:id,
			name:name,
			room:room
		}
		this.users.push(user)
		return user
	}
	getUserList(room){
		var users=this.users.filter((user)=>{
			return user.room===room
		})
		var namesArray=users.map((user)=>{
			return user.name
		})
		return namesArray
	}

	removeUser(id){
		var user =this.getUser(id)
		if(user){
			this.users=this.users.filter((user)=>
				user.id!==id
			)

		}
		return user
	}

	getUser(id){
		return this.users.filter((user)=>
			user.id===id
		)[0]
	}
}

module.exports={
	Users:Users
}