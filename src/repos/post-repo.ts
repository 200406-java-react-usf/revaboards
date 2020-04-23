import data from '../data/post-db';
import { Post } from '../models/post';
import { CrudRepository } from './crud-repo';

import { 
	BadRequestError, 
	ResourceNotFoundError 
} from '../errors/errors';

export class PostRepository implements CrudRepository<Post> {

    private static instance: PostRepository;

    private constructor() { }

    static getInstance() {
    	return !PostRepository.instance ? PostRepository.instance = new PostRepository() : PostRepository.instance;
    }

    getAll(): Promise<Post[]> {

    	console.log(data);

    	return new Promise<Post[]>((resolve, reject) => {

    		setTimeout(() => {
    			let posts: Post[] = [];

    			for(let post of data) {
    				posts.push({...post});
    			}

    			if (posts.length == 0) {
    				reject(new ResourceNotFoundError());
    				return;
    			}

    			resolve(posts);

    		});
    	});

    }

    getById(id: number): Promise<Post> {
    
    	return new Promise<Post>((resolve, reject) => {
    
    		if (typeof id !== 'number' || !Number.isInteger(id) || id <= 0) {
    			reject(new BadRequestError());
    			return;
    		}
    
    		setTimeout(function() {
    
    			const post: Post = {...data.filter(post => post.id === id).pop()};
                
    			if (!post) {
    				reject(new ResourceNotFoundError());
    				return;
    			}
    			resolve(post);
    
    		}, 5000);
    
    	});
        
    }

    getPostsByPosterId(posterId: number): Promise<Post[]> {

    	return new Promise<Post[]>((resolve, reject) => {
    
    		if (typeof posterId !== 'number' || !Number.isInteger(posterId) || posterId <= 0) {
    			reject(new BadRequestError());
    			return;
    		}
    
    		setTimeout(function() {
    
    			const posts: Post[] = [];
    
    			for(let post of data.filter(post => post.posterId == posterId)) {
    				posts.push({...post});
    			}
    
    			if(posts.length === 0) {
    				reject(new ResourceNotFoundError());
    				return;
    			}
    
    			resolve(posts);
    
    		}, 250);
    
    	});
        
    }

    save(newPost: Post): Promise<Post> {
    	return new Promise((resolve, reject) => {
    		reject('Not implemented');
    	});
    }

    update(updatedPost: Post): Promise<boolean> {
    	return new Promise((resolve, reject) => {
    		reject('Not implemented');
    	});
    }

    deleteById(id: number): Promise<boolean> {
    	return new Promise((resolve, reject) => {
    		reject('Not implemented');
    	});
    }


}
