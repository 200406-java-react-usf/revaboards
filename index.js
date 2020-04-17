const userRepo = require('./src/repos/user-repo');

// userRepo.getInstance().getAllUsers((err, result) => {
//     err && console.log(err);
//     result && console.log(result);
// });

let result = userRepo.getInstance().getUserById(0);
let result2 = userRepo.getInstance().getUserById(1);
//console.log(result);
result(response => {
    console.log(response);
    result2(response => {
        console.log(response);
    })
})