export class User {

    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    dob: Date;
<<<<<<< HEAD
    age: number;

    constructor(id:number, un:string, pw:string, fn:string, ln:string, email:string, dob:Date) {
=======

    constructor(id: number, un: string, pw: string, fn: string, ln: string, email: string, dob: Date) {
>>>>>>> a991118bdb9ba1189a9563985f49c2c5dbda4d76
        this.id = id;
        this.username = un;
        this.password = pw;
        this.firstName = fn;
        this.lastName = ln;
        this.email = email;
        this.dob = dob;
<<<<<<< HEAD
        this.age = Math.abs(new Date(Date.now() - this.dob.getTime()).getUTCFullYear() - 1970);
    }

}
=======
    }

};
>>>>>>> a991118bdb9ba1189a9563985f49c2c5dbda4d76
