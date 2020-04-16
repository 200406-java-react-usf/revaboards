const User = require('./src/models/user');

const userRepo = require('./src/repos/user-repo');
const mailWorker = require('./src/util/mail-worker');

// let test = new User(0, 'test', 'test', 'test', 'test', 'test@revature.com', new Date('01/01/1990'));
// userRepo.addNewUser(test, newUser => {
//     console.log(newUser);
//     mailWorker.emit('newRegister', newUser.email);
// });

userRepo.getInstance().addNewUser(new User(0, 'a', 'a', 'a', 'a', 'a', new Date()), (err, result) => {
    err && console.log('Error: ', err);
    result && console.log('Result: ', result);
});