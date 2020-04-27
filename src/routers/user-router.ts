import express from 'express';
import { User } from '../models/user';
import {UserRepository} from '../repos/user-repo';

export const UserRouter = express.Router();
const userRepo = UserRepository.getInstance();

UserRouter.get('/', async (req, res) => {
    try {
        let payload = await userRepo.getAll();
        res.status(200).json(payload).send();
    }catch (e) {
        res.status(404).json(e);
    }
});