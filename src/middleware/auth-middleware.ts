import { AuthorizationError, AuthenticationError } from '../errors/errors';

export const authUserGuard = (req, resp, next) => {
    if (!req.session.principal) {
        resp.status(401).send(new AuthenticationError('No session found! Please login.'));
    } else if (req.session.principal.role === 'Admin' || req.session.principal.id === +req.params.id) {
        next();
    } else {
        resp.status(403).send(new AuthorizationError());
    }
}

export const guardFactory = (roles: string[]) => {

    return (req, resp, next) => {
        
        if (roles.includes('Everyone')) {
            next();
        } else if(!req.session.principal) {
            resp.status(401).send(new AuthenticationError('No session found! Please login.'));
        } else {
    
            let allowed = roles.filter(role => req.session.principal.role === role).length !== 0;

            if(!allowed){
                resp.status(403).send(new AuthorizationError());
            }

            next();
            
        }
    }
}
