export class User {

    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    dob: Date;
    age: number;

<<<<<<< HEAD
    constructor(id: number, username: string, pw: string,
        fn: string, ln: string, email: string, dob: Date) {

        this.id = id;
        this.username = username;
=======
    constructor(id: number, un: string, pw: string, fn: string, ln: string, email: string, dob: Date) {
        this.id = id;
        this.username = un;
>>>>>>> 8153c2805155dccefcc0668532ec580f9e013978
        this.password = pw;
        this.firstName = fn;
        this.lastName = ln;
        this.email = email;
        this.dob = dob;
        this.age = Math.abs(new Date(Date.now() - this.dob.getTime()).getUTCFullYear() - 1970);
    }

<<<<<<< HEAD

}
=======
};
>>>>>>> 8153c2805155dccefcc0668532ec580f9e013978
