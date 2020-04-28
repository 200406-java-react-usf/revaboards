import url from 'url';
import express from 'express';
import AppConfig from '../config/app';
import { isEmptyObject } from '../util/validator';
import { adminGuard, authUserGuard } from '../middleware/auth-middleware';

export const UserRouter = express.Router();

const userService = AppConfig.userService;

UserRouter.get('', adminGuard, async (req, resp) => {

    try {
        let reqURL = url.parse(req.url, true);

        if(!isEmptyObject(reqURL.query)) {
            let payload = await userService.getUserByUniqueKey({...reqURL.query});;
            resp.status(200).json(payload);
        } else {
            let payload = await userService.getAllUsers();
            resp.status(200).json(payload);
        }

    } catch (e) {
        resp.status(e.statusCode).json(e);
    }

    resp.send();

});

UserRouter.get('/:id', authUserGuard, async (req, resp) => {
    try {
        const id = +req.params.id;
        let payload = await userService.getUserById(id);
        resp.status(200).json(payload);
    } catch (e) {
        resp.status(e.statusCode).json(e);
    }

    resp.send();
});

UserRouter.post('', async (req, resp) => {

    try {
        let newUser = await userService.addNewUser(req.body);
        resp.status(201).json(newUser);
    } catch (e) {
        resp.status(e.statusCode).json(e);
    }

    resp.send();

});
