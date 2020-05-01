import { Post } from '../models/post';
import { CrudRepository } from './crud-repo';
import {
    NotImplementedError
} from '../errors/errors';

export class PostRepository implements CrudRepository<Post> {
    
    async getAll(): Promise<Post[]> {
        throw new NotImplementedError();
    }

    async getById(id: number): Promise<Post> {
        throw new NotImplementedError();
    }

    async save(newPost: Post): Promise<Post> {
        throw new NotImplementedError();
    }

    async update(updatedPost: Post): Promise<boolean> {
        throw new NotImplementedError();
    }

    async deleteById(id: number): Promise<boolean> {
        throw new NotImplementedError();
    }

    async getPostsByPosterId(pid: number): Promise<Post[]> {
        throw new NotImplementedError();
    }
}
