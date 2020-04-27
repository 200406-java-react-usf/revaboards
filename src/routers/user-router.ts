import url from 'url';
import express from 'express';
import { User } from '../models/user';
import AppConfig from '../config/app';

export const UserRouter = express.Router();

const userService = AppConfig.userService;

UserRouter.get('', async (req, resp) => {
    try {

        let reqURL = url.parse(req.url, true);

        if(Object.keys(reqURL.query).length !== 0) {
            let payload = await userService.getUserByUniqueKey({...reqURL.query});;
            return resp.status(200).json(payload);
        } else {
            let payload = await userService.getAllUsers();
            return resp.status(200).json(payload);
        }

    } catch (e) {
        return resp.status(e.statusCode).json(e).send();
    }
});

UserRouter.get('/:id', async (req, resp) => {
    const id = +req.params.id;
    try {
        let payload = await userService.getUserById(id);
        return resp.status(200).json(payload);
    } catch (e) {
        return resp.status(e.statusCode).json(e).send();
    }
});

UserRouter.post('', async (req, resp) => {

    console.log('POST REQUEST RECEIVED AT /users');
    console.log(req.body);
    try {
        let newUser = await userService.addNewUser(req.body);
        return resp.status(201).json(newUser).send();
    } catch (e) {
        return resp.status(e.statusCode).json(e).send();
    }

});
