import { UserSchema } from "./schemas";
import { User } from "../models/user";
<<<<<<< HEAD
export function mapUserResultSet(resultSet: UserSchema) : User {
    return new User (
=======

export function mapUserResultSet(resultSet: UserSchema): User {
    
    if (!resultSet) {
        return {} as User;
    }

    return new User(
>>>>>>> 19196196c63af8ae59422d7b966d2411bab8c80b
        resultSet.id,
        resultSet.username,
        resultSet.password,
        resultSet.first_name,
        resultSet.last_name,
        resultSet.email,
        resultSet.role_name
    );
}