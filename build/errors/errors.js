"use strict";
var ResourcePersistenceError = /** @class */ (function () {
    function ResourcePersistenceError(reason) {
        this.message = 'The resource was not persisted.';
        reason ? (this.reason = reason) : this.reason = 'Unspecified reason.';
    }
    return ResourcePersistenceError;
}());
var ResourceNotFoundError = /** @class */ (function () {
    function ResourceNotFoundError() {
        this.message = 'No resource found using provided criteria.';
    }
    return ResourceNotFoundError;
}());
var BadRequestError = /** @class */ (function () {
    function BadRequestError(reason) {
        this.message = 'Invalid parameters provided.';
        this.reason = reason;
    }
    return BadRequestError;
}());
var AuthenticationError = /** @class */ (function () {
    function AuthenticationError() {
        this.message = 'Authentication failed';
    }
    return AuthenticationError;
}());
module.exports = {
    ResourceNotFoundError: ResourceNotFoundError,
    ResourcePersistenceError: ResourcePersistenceError,
    BadRequestError: BadRequestError,
    AuthenticationError: AuthenticationError
};
