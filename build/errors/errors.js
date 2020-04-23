"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApplicationError {
    constructor(reason) {
        this.message = 'An unexpected error occurred.';
        reason ? (this.reason = reason) : this.reason = 'Unspecified reason.';
    }
}
class ResourcePersistenceError extends ApplicationError {
    constructor(reason) {
        super(reason);
        super.message = 'The resource was not persisted.';
    }
}
exports.ResourcePersistenceError = ResourcePersistenceError;
class ResourceNotFoundError extends ApplicationError {
    constructor(reason) {
        super(reason);
        super.message = 'No resource found using provided criteria.';
    }
}
exports.ResourceNotFoundError = ResourceNotFoundError;
class BadRequestError extends ApplicationError {
    constructor(reason) {
        super(reason);
        super.message = 'Invalid parameters provided.';
    }
}
exports.BadRequestError = BadRequestError;
class AuthenticationError extends ApplicationError {
    constructor(reason) {
        super(reason);
        super.message = 'Authentication failed.';
    }
}
exports.AuthenticationError = AuthenticationError;
