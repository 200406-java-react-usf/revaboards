import { User } from '../models/user';
<<<<<<< HEAD:src/data/user-db.ts
<<<<<<< HEAD:src/data/user-db.ts

let id = 1;

export default [
    new User(id++, 'aanderson', 'password', 'Alice', 'Anderson', 'aanderson@revature.com', '01/01/1990'),
=======
=======
>>>>>>> 8153c2805155dccefcc0668532ec580f9e013978:src/data/user-db.js
let id = 1;

export default [
<<<<<<< HEAD
    new User(id++, 'aanderson', 'password', 'Alice', 'Anderson', 'aanderson@revature.com', '01/01/1995'),
>>>>>>> 8153c2805155dccefcc0668532ec580f9e013978:src/data/user-db.js
    new User(id++, 'bbailey', 'password', 'Bob', 'Bailey', 'bbailey@revature.com', '01/01/1983'),
    new User(id++, 'ccountryman', 'password', 'Charlie', 'Countryman', 'ccountryman@revature.com', '01/01/1990'),
    new User(id++, 'ddavis', 'password', 'Daniel', 'Davis', 'ddavis@revature.com', '07/01/1990'),
    new User(id++, 'eeinstein', 'password', 'Emily', 'Einstein', 'eeinstein@revature.com', '09/01/1993')
=======
    new User(id++, 'aanderson', 'password', 'Alice', 'Anderson', 'aanderson@revature.com', new Date('01/01/1995')),
    new User(id++, 'bbailey', 'password', 'Bob', 'Bailey', 'bbailey@revature.com', new Date('01/01/1983')),
    new User(id++, 'ccountryman', 'password', 'Charlie', 'Countryman', 'ccountryman@revature.com', new Date('01/01/1990')),
    new User(id++, 'ddavis', 'password', 'Daniel', 'Davis', 'ddavis@revature.com', new Date('07/01/1990')),
    new User(id++, 'eeinstein', 'password', 'Emily', 'Einstein', 'eeinstein@revature.com', new Date('09/01/1993'))
>>>>>>> 69097bd6edc11a188725a1bb29c9adb9d792a8c1
];