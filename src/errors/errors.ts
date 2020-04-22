class ApplicationError {

    message: string;
    reason: string;

    constructor (reason?) {
        this.message = 'An unexpected error occurred.';
        reason ? (this.reason = reason) : this.reason = 'Unspecified reason.';
    }

} 

class ResourcePersistenceError extends ApplicationError {

    constructor(reason?) {
        super(reason);
        super.message = 'The resource was not persisted.';
    }
        
}

class ResourceNotFoundError extends ApplicationError {

    constructor(reason?) {
        super(reason);
        super.message = 'No resource found using provided criteria.';
    }

}

class BadRequestError extends ApplicationError {

    constructor(reason?) {
        super(reason);
        super.message = 'Invalid parameters provided.';
    }

}

class AuthenticationError extends ApplicationError {

    constructor(reason?) {
        super(reason);
        super.message = 'Authentication failed.';
    }

}

export {
    ResourceNotFoundError,
    ResourcePersistenceError,
    BadRequestError,
    AuthenticationError
}