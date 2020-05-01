import url from 'url';
import express from 'express';
import AppConfig from '../config/app';
import { isEmptyObject } from '../util/validator';
import { guardFactory } from '../middleware/auth-middleware';

export const UserRouter = express.Router();

const userService = AppConfig.userService;

UserRouter.get('', guardFactory(['admin']), async (req, resp) => {

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
        resp.status(e.statusCode || 500).json(e);
    }

});

UserRouter.get('/:id', guardFactory(['admin']), async (req, resp) => {
    try {
        const id = +req.params.id;
        let payload = await userService.getUserById(id);
        resp.status(200).json(payload);
    } catch (e) {
        resp.status(e.statusCode || 500).json(e);
    }

});

UserRouter.post('', async (req, resp) => {

    try {
        let newUser = await userService.addNewUser(req.body);
        resp.status(201).json(newUser);
    } catch (e) {
        resp.status(e.statusCode || 500).json(e);
    }

});

UserRouter.put('', guardFactory(['admin']), async (req, resp) => {

    try {
        await userService.updateUser(req.body);
        resp.sendStatus(204);
    } catch (e) {
        resp.status(e.statusCode || 500).json(e);
    }

});

UserRouter.delete('/:id', guardFactory(['admin']), async (req, resp) => {

    try {
        await userService.deleteById(+req.params.id);
        resp.sendStatus(204);
    } catch (e) {
        resp.status(e.statusCode || 500).json(e);
    }

});