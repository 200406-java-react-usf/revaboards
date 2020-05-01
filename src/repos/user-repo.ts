import { connectionPool } from '..';
import { mapUserResultSet } from '../util/result-set-mapper';
import { PoolClient } from 'pg';

import { User } from '../models/user';
import { CrudRepository } from './crud-repo';
import {
    NotImplementedError, 
    ResourceNotFoundError, 
    ResourcePersistenceError,
    InternalServerError
} from '../errors/errors';
import { Role } from '../models/role';




export class UserRepository implements CrudRepository<User> {

    constructor() {
        console.log('Instantiating UserRepository...');
        console.log('UserRepository instantiation complete');
    }

    baseQuery = `
        select 
            au.id, 
            au.username, 
            au.password, 
            au.first_name, 
            au.last_name, 
            au.email, 
            ur.name as role_name
        from app_users au 
        join user_roles ur
        on au.role_id = ur.id`

    async getAll(): Promise<User[]> {

        let client: PoolClient;

        try {

            console.log(connectionPool)
            client = await connectionPool.connect();
            let sql = `${this.baseQuery};`
            let rs = await client.query(sql);
            return rs.rows.map(mapUserResultSet);

        } catch (e) {
            throw new InternalServerError();
        } finally {
            client && client.release();
        }

    
    }

    async getById(id: number): Promise<User> {

        let client: PoolClient;

        try {

            client = await connectionPool.connect();
            let sql = `${this.baseQuery} where au.id = $1`;
            let rs = await client.query(sql, [id]);
            return mapUserResultSet(rs.rows[0]);

        } catch (e) {
            throw new InternalServerError();
        } finally {
            client && client.release();
        }

    }

    async getUserByUniqueKey(key: string, val: string): Promise<User> {

        let client: PoolClient;

        try {

            client = await connectionPool.connect();
            let sql = `${this.baseQuery} where au.${key} = $1`;
            let rs = await client.query(sql, [val]);
            return mapUserResultSet(rs.rows[0]);

        } catch (e) {
            console.log(e);
            throw new InternalServerError();
        } finally {
            client && client.release();
        }
        
    
    }

    async getUserByCredentials(un: string, pw: string): Promise<User> {
        
        let client: PoolClient;

        try {
            client = await connectionPool.connect();
            let sql = `${this.baseQuery} where au.username = $1 and au.password = $2`;
            let rs = await client.query(sql, [un, pw]);
            return mapUserResultSet(rs.rows[0]);
        } catch (e) {
            console.log(e);
            throw new InternalServerError();
        } finally {
            client && client.release();
        }
    
    }

    async save(newUser: User): Promise<User> {
            
        let client: PoolClient;
        
        try {
            return new User(-1, 'test', 'test', 'test', 'test', 'test', new Role(4));
        } catch (e) {
            console.log(e);
            throw new InternalServerError();
        } finally {
            client && client.release();
        }
    
    }

    async update(updatedUser: User): Promise<boolean> {
        
        let client: PoolClient;
        
        try {
            return false;
        } catch (e) {
            console.log(e);
            throw new InternalServerError();
        } finally {
            client && client.release();
        }
    
    }

    async deleteById(id: number): Promise<boolean> {

        let client: PoolClient;
        
        try {
            return false;
        } catch (e) {
            console.log(e);
            throw new InternalServerError();
        } finally {
            client && client.release();
        }

    }

}
