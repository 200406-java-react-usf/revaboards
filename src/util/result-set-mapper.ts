import { User } from '../models/user';
import { UserSchema } from './schemas';
import { Role } from '../models/role';


export function mapUserResultSet(resultSet: UserSchema): User {

    return resultSet && new User(
        resultSet.id,
        resultSet.username,
        resultSet.password,
        resultSet.first_name,
        resultSet.last_name,
        resultSet.email,
        new Role(resultSet.role_name)
    );

}