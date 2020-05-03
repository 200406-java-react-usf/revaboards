import { connectionPool } from '..';
import { mapUserResultSet } from '../util/result-set-mapper';
import { PoolClient } from 'pg';
import { User } from '../models/user';
import { InternalServerError } from '../errors/errors';

let baseQuery = `
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
    on au.role_id = ur.id
`;

export async function getAll(): Promise<User[]> {

    let client: PoolClient;

    try {
        client = await connectionPool.connect();
        let sql = `${baseQuery}`;
        let rs = await client.query(sql);
        return rs.rows.map(mapUserResultSet);
    } catch (e) {
        throw new InternalServerError();
    } finally {
        client && client.release();
    }

}

export async function getById(id: number): Promise<User> {

    let client: PoolClient;

    try {
        client = await connectionPool.connect();
        let sql = `${baseQuery} where au.id = $1`;
        let rs = await client.query(sql, [id]);
        return mapUserResultSet(rs.rows[0]);
    } catch (e) {
        throw new InternalServerError();
    } finally {
        client && client.release();
    }

}

export async function getUserByUniqueKey(key: string, val: string): Promise<User> {

    let client: PoolClient;

    try {
        client = await connectionPool.connect();
        let sql = `${baseQuery} where au.${key} = $1`;
        let rs = await client.query(sql, [val]);
        return mapUserResultSet(rs.rows[0]);
    } catch (e) {
        throw new InternalServerError();
    } finally {
        client && client.release();
    }
    
}

export async function getUserByCredentials(un: string, pw: string) {
        
    let client: PoolClient;

    try {
        client = await connectionPool.connect();
        let sql = `${baseQuery} where au.username = $1 and au.password = $2`;
        let rs = await client.query(sql, [un, pw]);
        return mapUserResultSet(rs.rows[0]);
    } catch (e) {
        console.log(e);
        throw new InternalServerError();
    } finally {
        client && client.release();
    }

}

export async function save(newUser: User): Promise<User> {
        
    let client: PoolClient;

    try {
        client = await connectionPool.connect();

        // WIP: hacky fix since we need to make two DB calls
        let roleId = (await client.query('select id from user_roles where name = $1', [newUser.role])).rows[0].id;
        
        let sql = `
            insert into app_users (username, password, first_name, last_name, email, role_id) 
            values ($1, $2, $3, $4, $5, $6) returning id
        `;

        let rs = await client.query(sql, [newUser.username, newUser.password, newUser.firstName, newUser.lastName, newUser.email, roleId]);
        
        newUser.id = rs.rows[0].id;
        
        return newUser;

    } catch (e) {
        console.log(e);
        throw new InternalServerError();
    } finally {
        client && client.release();
    }
    
}

export async function update(updatedUser: User): Promise<boolean> {
        
    let client: PoolClient;

    try {
        client = await connectionPool.connect();
        let sql = ``;
        let rs = await client.query(sql, []);
        return true;
    } catch (e) {
        throw new InternalServerError();
    } finally {
        client && client.release();
    }

}

export async function deleteById(id: number): Promise<boolean> {

    let client: PoolClient;

    try {
        client = await connectionPool.connect();
        let sql = ``;
        let rs = await client.query(sql, []);
        return true;
    } catch (e) {
        throw new InternalServerError();
    } finally {
        client && client.release();
    }

}