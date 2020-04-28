import { User } from '../models/user';
let id = 1;

<<<<<<< HEAD
export = [
	new User(id++, 'aanderson', 'password', 'Alice', 'Anderson', 'aanderson@revature.com', new Date('01/01/1995')),
	new User(id++, 'bbailey', 'password', 'Bob', 'Bailey', 'bbailey@revature.com', new Date('01/01/1983')),
	new User(id++, 'ccountryman', 'password', 'Charlie', 'Countryman', 'ccountryman@revature.com', new Date('/01/1990')),
	new User(id++, 'ddavis', 'password', 'Daniel', 'Davis', 'ddavis@revature.com', new Date('07/01/1990')),
	new User(id++, 'eeinstein', 'password', 'Emily', 'Einstein', 'eeinstein@revature.com', new Date('09/01/1993'))
=======
export default [
    new User(id++, 'aanderson', 'password', 'Alice', 'Anderson', 'aanderson@revature.com', 'Admin'),
    new User(id++, 'bbailey', 'password', 'Bob', 'Bailey', 'bbailey@revature.com', 'User'),
    new User(id++, 'ccountryman', 'password', 'Charlie', 'Countryman', 'ccountryman@revature.com', 'User'),
    new User(id++, 'ddavis', 'password', 'Daniel', 'Davis', 'ddavis@revature.com', 'User'),
    new User(id++, 'eeinstein', 'password', 'Emily', 'Einstein', 'eeinstein@revature.com', 'User')
>>>>>>> 4a760ef137c50d1413401cfb0caffec78978345c
];