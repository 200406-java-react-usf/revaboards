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

<<<<<<< HEAD
    constructor(reason?: string) {
        super(reason);
        super.setMessage('No resource found using provided criteria.');
    }
    
=======
    constructor(reason?) {
        super(reason);
        super.message = 'No resource found using provided criteria.';
    }

>>>>>>> 608a7c8bff2ebd9da535bef7135252af113905e5
}

class BadRequestError extends ApplicationError {

<<<<<<< HEAD
    constructor(reason?: string) {
        super(reason);
        super.setMessage('Invalid parameters provided.');
=======
    constructor(reason?) {
        super(reason);
        super.message = 'Invalid parameters provided.';
>>>>>>> 608a7c8bff2ebd9da535bef7135252af113905e5
    }

}

class AuthenticationError extends ApplicationError {

<<<<<<< HEAD
    constructor(reason?: string) {
        super(reason);
        super.setMessage('Authentication failed.');
    }

}

class NotImplementedError extends ApplicationError {

    constructor(reason?: string) {
        super(reason);
        super.setMessage('No implementation yet!');
=======
    constructor(reason?) {
        super(reason);
        super.message = 'Authentication failed.';
>>>>>>> 608a7c8bff2ebd9da535bef7135252af113905e5
    }

}

export {
    ResourceNotFoundError,
    ResourcePersistenceError,
    BadRequestError,
<<<<<<< HEAD
    AuthenticationError,
    NotImplementedError
=======
    AuthenticationError
>>>>>>> 608a7c8bff2ebd9da535bef7135252af113905e5
}