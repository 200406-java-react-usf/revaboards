import express from 'express';
import { User } from '../models/user';
import { UserRepository } from '../repos/user-repo';

export const UserRouter = express.Router();

const userRepo = UserRepository.getInstance();

UserRouter.get('/', async (req, resp) => {
    try {
        let payload = await userRepo.getAll();
        return resp.status(200).json(payload);
    } catch (e) {
        return resp.status(404).json(e).send();
    }
});

UserRouter.get('/:id', async (req, resp) => {
    const id = +req.params.id; // the plus sign is to type coerce id into a number
    try {
        let payload = await userRepo.getById(id);
        return resp.status(200).json(payload);
    } catch (e) {
        return resp.status(404).json(e).send();
    }
});