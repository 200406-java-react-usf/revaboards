export class User {

    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    dob: string;

    constructor(id: number, un: string, pw: string, fn: string, ln: string, email: string, dob: string) {
    	this.id = id;
    	this.username = un;
    	this.password = pw;
    	this.firstName = fn;
    	this.lastName = ln;
    	this.email = email;
    	this.dob = dob;
    }

	// age() {
	//     return Math.abs(new Date(Date.now() - this.dob.getTime()) - 1970);
	// }

} 
