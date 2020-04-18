const userRepo = require('./src/repos/user-repo');
const errors = require('./src/errors/errors')

// userRepo.getInstance().getAllUsers((err, result) => {
//     err && console.log(err);
//     result && console.log(result);
// });

// thunk recall
// let result = userRepo.getInstance().getUserById(0);
// let result2 = userRepo.getInstance().getUserById(1);
// result(response => {
//     console.log(response);
//     result2(response => {
//         console.log(response);
//     })
// })

//Promise recall

let result = userRepo.getInstance().getUserByUsername('aanderson')//.catch(err => console.log(err));
let result2 = userRepo.getInstance().getUserByUsername('x')//.catch(err => console.log(err));
let result3 = userRepo.getInstance().getUserByUsername(1)//.catch(err => console.log(err));

result.then(text => {
            console.log(text)
            return result2;
            })
        .then(text => {
            console.log(text)
            return result3;
            })
        .then(text => {
            console.log(text)
            })
        

