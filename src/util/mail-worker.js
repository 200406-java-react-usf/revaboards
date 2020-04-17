const events = require('events');

// function MailWorker() {
//     this.server = 'fake-smtp-server.com';
//     this.port = 25;
// }

// MailWorker.prototype.__proto__ = events.EventEmitter.prototype;

// const mailWorker = new MailWorker();

// mailWorker.on('newRegister', function(recipient) {

//     console.log(`Sending a welcome email to ${recipient} using SMTP server at ${this.server} on port ${this.port}`);
    
//     // pretend to send a message
//     setTimeout(() => {
//         console.log('Message successfully sent');
//     }, 1000);

// });

// // USE THIS FIRST TO DEMONSTRATE 'this' BINDING
// // mailWorker.on('newRegister', recipient => {
// //     console.log(`Sending a welcome email to ${recipient} using SMTP server at ${this.server} on port ${this.port}`);
// //     setTimeout(() => {
// //         console.log('Message successfully sent');
// //     }, 1000);
// // });

// module.exports = mailWorker;

function MailWorker() {
    this.server = 'fake-smtp-server.com';
    this.port = 25;
}

MailWorker.prototype.__proto__ = events.EventEmitter.prototype;

const mailWorker = new MailWorker(); 

mailWorker.on('newRegister', function(recipientEmail) {

    console.log(`Sending a welcome email to ${recipientEmail} using SMTP server at ${this.server} on port ${this.port}.`)
    // [pretend to send a message]
    setTimeout(() => {
        console.log('Message succesfully sent!');
    }, 1000);
});

module.exports = mailWorker;
