"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user");
let id = 1;
exports.default = [
    new user_1.User(id++, 'aanderson', 'password', 'Alice', 'Anderson', 'aanderson@revature.com', new Date('01/01/1995')),
    new user_1.User(id++, 'bbailey', 'password', 'Bob', 'Bailey', 'bbailey@revature.com', new Date('01/01/1983')),
    new user_1.User(id++, 'ccountryman', 'password', 'Charlie', 'Countryman', 'ccountryman@revature.com', new Date('01/01/1990')),
    new user_1.User(id++, 'ddavis', 'password', 'Daniel', 'Davis', 'ddavis@revature.com', new Date('07/01/1990')),
    new user_1.User(id++, 'eeinstein', 'password', 'Emily', 'Einstein', 'eeinstein@revature.com', new Date('09/01/1993'))
];
