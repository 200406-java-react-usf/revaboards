const userRepo = require('./src/repos/user-repo');

userRepo.getInstance().getAllUsers((err, result) => {
    err && console.log(err);
    result && console.log(result);
});