class ResourcePersistenceError {

    constructor (reason) {
        this.message = 'The resource was not persisted.';
        reason ? (this.reason = reason) : this.reason = 'Unspecified reason.';
    }
    
}

class ResourceNotFoundError {

    constructor () {
        this.message = 'No resource found using provided criteria.';
    }
    
}

class BadRequestError {

    constructor(reason) {
        this.message = 'Invalid parameters provided.';
        reason ? (this.reason = reason) : this.reason = 'Unspecified reason.';
    }
}

class AuthenticationError {

    constructor() {
        this.message = 'Authentication failed';
    }

}

module.exports = {
    ResourceNotFoundError,
    ResourcePersistenceError,
    BadRequestError,
    AuthenticationError
}