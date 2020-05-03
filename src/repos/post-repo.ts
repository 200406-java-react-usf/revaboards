import { Post } from '../models/post';
import { NotImplementedError } from '../errors/errors';
  
export async function getAll(): Promise<Post[]> {
    throw new NotImplementedError();
}

export async function getById(id: number): Promise<Post> {
    throw new NotImplementedError();
}

export async function save(newPost: Post): Promise<Post> {
    throw new NotImplementedError();
}

export async function update(updatedPost: Post): Promise<boolean> {
    throw new NotImplementedError();
}

export async function deleteById(id: number): Promise<boolean> {
    throw new NotImplementedError();
}

export async function getPostsByPosterId(pid: number): Promise<Post[]> {
    throw new NotImplementedError();
}