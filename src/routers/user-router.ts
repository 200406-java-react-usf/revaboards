import express from 'express';
import { User } from '../models/user';
import { UserRepository } from '../repos/user-repo';

export const UserRouter = express.Router();

const userRepo = UserRepository.getInstance();

UserRouter.get('/', async (req, resp) => {
    try{
        let payload = await userRepo.getAll();
        resp.status(200).json(payload).send();
    } catch (e){
        resp.status(404).json(e).send();
    }
});