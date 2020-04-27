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
exports.__esModule = true;
var ApplicationError = /** @class */ (function () {
    function ApplicationError(rsn) {
        this.message = 'An unexpected error occurred.';
        rsn ? (this.reason = rsn) : this.reason = 'Unspecified reason.';
    }
    ApplicationError.prototype.setMessage = function (message) {
        this.message = message;
    };
    return ApplicationError;
}());
var ResourcePersistenceError = /** @class */ (function (_super) {
    __extends(ResourcePersistenceError, _super);
    function ResourcePersistenceError(reason) {
        var _this = _super.call(this, reason) || this;
        _super.prototype.setMessage.call(_this, 'The resource was not persisted.');
        return _this;
    }
    return ResourcePersistenceError;
}(ApplicationError));
exports.ResourcePersistenceError = ResourcePersistenceError;
var ResourceNotFoundError = /** @class */ (function (_super) {
    __extends(ResourceNotFoundError, _super);
    function ResourceNotFoundError(reason) {
        var _this = _super.call(this, reason) || this;
        _super.prototype.setMessage.call(_this, 'No resource found using provided criteria.');
        return _this;
    }
    return ResourceNotFoundError;
}(ApplicationError));
exports.ResourceNotFoundError = ResourceNotFoundError;
var BadRequestError = /** @class */ (function (_super) {
    __extends(BadRequestError, _super);
    function BadRequestError(reason) {
        var _this = _super.call(this, reason) || this;
        _super.prototype.setMessage.call(_this, 'Invalid parameters provided.');
        return _this;
    }
    return BadRequestError;
}(ApplicationError));
exports.BadRequestError = BadRequestError;
var AuthenticationError = /** @class */ (function (_super) {
    __extends(AuthenticationError, _super);
    function AuthenticationError(reason) {
        var _this = _super.call(this, reason) || this;
        _super.prototype.setMessage.call(_this, 'Authentication failed.');
        return _this;
    }
    return AuthenticationError;
}(ApplicationError));
exports.AuthenticationError = AuthenticationError;
var NotImplementedError = /** @class */ (function (_super) {
    __extends(NotImplementedError, _super);
    function NotImplementedError(reason) {
        var _this = _super.call(this, reason) || this;
        _super.prototype.setMessage.call(_this, 'No implementation yet!');
        return _this;
    }
    return NotImplementedError;
}(ApplicationError));
exports.NotImplementedError = NotImplementedError;
