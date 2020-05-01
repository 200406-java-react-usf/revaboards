import { User } from '../models/user';
let id = 1;

export default [
    new User(id++, 'aanderson', 'password', 'Alice', 'Anderson', 'aanderson@revature.com', 'Admin'),
    new User(id++, 'bbailey', 'password', 'Bob', 'Bailey', 'bbailey@revature.com', 'User'),
    new User(id++, 'ccountryman', 'password', 'Charlie', 'Countryman', 'ccountryman@revature.com', 'User'),
    new User(id++, 'ddavis', 'password', 'Daniel', 'Davis', 'ddavis@revature.com', 'User'),
    new User(id++, 'eeinstein', 'password', 'Emily', 'Einstein', 'eeinstein@revature.com', 'User')
];