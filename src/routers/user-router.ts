import express from 'express';
import { User } from '../models/user';
import { UserRepository } from '../repos/user-repo';
import { UserService } from '../services/user-service';

export const UserRouter = express.Router();

const userRepo = new UserRepository();
const userService = new UserService(userRepo);

UserRouter.get('/', async (req, resp) => {
    try {
        let payload = await userService.getAllUsers();
        return resp.status(200).json(payload);
    } catch (e) {
        return resp.status(404).json(e).send();
    }
});

UserRouter.get('/:id', async (req, resp) => {
    const id = +req.params.id;
    try {
        let payload = await userService.getUserById(id);
        return resp.status(200).json(payload);
    } catch (e) {
        return resp.status(404).json(e).send();
    }
});

UserRouter.get('/?:k=:v', async (req, resp) => {
    try {
        let payload = await userService.getUserByUniqueKey(req.params.k, req.params.v)
        return resp.status(200).json(payload);
    } catch (e) {
        return resp.status(404).json(e).send();
    }
});