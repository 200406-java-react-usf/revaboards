import { EventEmitter } from 'events';

export class MailWorker extends EventEmitter {

    private static instance: MailWorker;

    server: string;
    port: number;

    private constructor() {
        super();
        this.server = 'fake-smtp-server.com';
        this.port = 25;
    }

    static getInstance(): MailWorker {
        if (!MailWorker.instance) {
            MailWorker.instance = new MailWorker();
            MailWorker.instance.on('newRegister', recipient => console.log(`Email sent to ${recipient}`));
        }
        return MailWorker.instance;
    }

    on(event: string, listener) {
        super.on(event, listener);
        return this;
    }

    emit(event: string, ...args) {
        super.emit(event, args);
        return true;
    }
}
