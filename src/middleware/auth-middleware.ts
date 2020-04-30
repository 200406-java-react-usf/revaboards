import { AuthorizationError, AuthenticationError } from '../errors/errors';
import { Request, Response } from 'express';

export const guardFactory = (roles: string[]) => {

    let _roles = roles.map(role => role.toLowerCase());

    return (req: Request, resp: Response, next) => {

        let requester = req.session.principal;
        
        if (roles.includes('everyone')) {
            next();
        } else if(!requester) {
            resp.status(401).send(new AuthenticationError('No session found! Please login.'));
        } else {

            let requesterRole = (req.session.principal.role as string).toLowerCase();
            let selfRequest = req.params && (requester.id === +req.params.id);
            let allowed = roles.includes(requesterRole); 
            
            if(!selfRequest && !allowed){
                resp.status(403).send(new AuthorizationError());
            }

            next();
            
        }
    }
}
