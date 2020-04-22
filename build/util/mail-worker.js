"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
class MailWorker extends events_1.EventEmitter {
    constructor() {
        super();
        this.server = 'fake-smtp-server.com';
        this.port = 25;
    }
    static getInstance() {
        if (!MailWorker.instance) {
            MailWorker.instance = new MailWorker();
            MailWorker.instance.on('newRegister', recipient => console.log(`Email sent to ${recipient}`));
        }
        return MailWorker.instance;
    }
    on(event, listener) {
        super.on(event, listener);
        return this;
    }
}
exports.MailWorker = MailWorker;
