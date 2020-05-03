import express from 'express';
import * as userService from '../services/user-service';
import { Principal } from '../dtos/principal';

export const AuthRouter = express.Router();

AuthRouter.get('', (req, resp) => {
    delete req.session.principal;
    resp.status(200).send();
});

AuthRouter.post('', async (req, resp) => {

    try {
        const { username, password } = req.body;
        let authUser = await userService.authenticateUser(username, password);
        let payload = new Principal(authUser.id, authUser.username, authUser.role.name);
        req.session.principal = payload;
        resp.status(200).json(payload);
    } catch (e) {
        resp.status(e.statusCode || 500).json(e);
    }   

    resp.send();

});
