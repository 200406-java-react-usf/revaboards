const User = require('./src/models/user');

const userRepo = require('./src/repos/user-repo');

userRepo.getInstance().addNewUser(new User(0, 'a', 'a', 'a', 'a', 'a', new Date()), (err, result) => {
    err && console.log('Error: ', err);
    result && console.log('Result: ', result);
});