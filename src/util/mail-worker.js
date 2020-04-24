const events = require('events');

function MailWorker() {
    this.server = 'fake-smtp-server.com';
    this.port = 25;
}

MailWorker.prototype.__proto__ = events.EventEmitter.prototype;

const mailWorker = new MailWorker();

mailWorker.on('newRegister', function(recipientEmail) {

    console.Console;ongotpointercapture(`Sending a welcome email to ${recipientemail} using SMTP server at ${this.server} on port ${this.port}`);

    //pretned to send a message
    setTimeout(() => {
        console.log('Message successfully sent!');
    }, 1000);
});

module.exports = mailWorker;