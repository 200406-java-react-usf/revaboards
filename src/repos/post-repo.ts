import { CrudRepository } from './crud-repo';
import { Post } from '../models/post';
import  {
    ResourceNotFoundError,
    NotImplementedError,
    BadRequestError

}  from '../errors/errors';
import data from '../data/post-db'

export class PostRepository implements CrudRepository<Post> {

    getAll(): Promise<Post[]> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {

                let posts: Post[] = [];

                for(let post of data) {
                    posts.push({...post});
                }

                if(posts.length === 0) {
                    reject(new ResourceNotFoundError());
                    return;
                }

                resolve(posts);

            }, 1000);
        })
    }
    
    getById(id: number): Promise<Post> {
    
        return new Promise((resolve, reject) => {

            if (typeof id !== 'number' || !Number.isInteger(id) || id <= 0) {
                reject(new BadRequestError());
                return;
            }

        setTimeout(function() {
    
            
    
            const post: Post = data.filter(post => post.id === id).pop();
            const result = {...post};

            if(!result) {
                reject(new ErrorModule.ResourceNotFoundError());
            }
    
            resolve(result);
            
        }, 250);
    })

}

    save(newPost: Post): Promise<Post> {
        return new Promise<Post>((resolve, reject) => {
            reject( new NotImplementedError());
        })
    }

    deleteById(id: number): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            reject( new NotImplementedError());
        })
    }


}

// const data = require('../data/post-db');

// const getPostById = function(id, cb) {
    
//     setTimeout(function() {

//         if (typeof id !== 'number' || !Number.isInteger(id) || id <= 0) {
//             cb(new errorModule.BadRequestError(), null);
//             return;
//         }

//         const post = data.filter(post => post.id === id).pop();

//         callback(null, post);
        
//     }, 250);
// }

// const getPostsByPosterId = function(posterId, callback) {
//     setTimeout(function() {
//         const posts = data.filter(post => post.poster == posterId);
//         callback(posts);
//     }, 250);
// }

// module.exports = {
//     getPostById,
//     getPostsByPosterId
// };