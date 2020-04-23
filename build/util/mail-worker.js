"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = require("events");
var MailWorker = /** @class */ (function (_super) {
    __extends(MailWorker, _super);
    function MailWorker() {
        var _this = _super.call(this) || this;
        _this.server = 'fake-smtp-server.com';
        _this.port = 25;
        return _this;
    }
    MailWorker.getInstance = function () {
        if (!MailWorker.instance) {
            MailWorker.instance = new MailWorker();
            MailWorker.instance.on('newRegister', function (recipient) { return console.log("Email sent to " + recipient); });
        }
        return MailWorker.instance;
    };
    MailWorker.prototype.on = function (event, listener) {
        _super.prototype.on.call(this, event, listener);
        return this;
    };
    MailWorker.prototype.emit = function (event) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        _super.prototype.emit.call(this, event, args);
        return true;
    };
    return MailWorker;
}(events_1.EventEmitter));
exports.MailWorker = MailWorker;
