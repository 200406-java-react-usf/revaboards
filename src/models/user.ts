import { Role } from "./role";

export class User {

    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    role: Role

    constructor(id: number, un: string, pw: string, fn: string, ln: string, email: string, role: Role) {
        this.id = id;
        this.username = un;
        this.password = pw;
        this.firstName = fn;
        this.lastName = ln;
        this.email = email;
        this.role = role;
    }

}
