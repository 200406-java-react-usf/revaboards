class ApplicationError {

    message: string;
    reason: string;

    constructor(rsn?: string) {

    	this.message = 'An Unexpected Error occured';
    	rsn ? (this.reason = rsn) : this.reason = 'Unspecified reason.';

    }

    setMessage(message: string){
    	this.message = message;
    }

}

class ResourcePersistenceError extends ApplicationError {

	constructor (reason?: string) {
		super(); //invokes Application Error's constructor
		super.setMessage('Resource not persisted'); 
	}
    
}

class ResourceNotFoundError extends ApplicationError {

	constructor (reason?: string) {
		super(); //invokes Application Error's constructor
		super.setMessage('No resource Found'); 
	}
    
}

class BadRequestError extends ApplicationError {

	constructor (reason?: string) {
		super(); //invokes Application Error's constructor
		super.setMessage('Invalid Params'); 
	}
    
}

class AuthenticationError extends ApplicationError {

	constructor (reason?: string) {
		super(); //invokes Application Error's constructor
		super.setMessage('Authentication failed'); 
	}
    
}

class NotImplementedError extends ApplicationError {

	constructor (reason?: string) {
		super(); //invokes Application Error's constructor
		super.setMessage('No implementation yet!'); 
	}
    
}

export {
	ResourceNotFoundError,
	ResourcePersistenceError,
	BadRequestError,
	AuthenticationError,
	NotImplementedError
};