import { User } from "../models/user";
import { UserDTO } from "../dtos";

export function mapUserEntity(user: User): UserDTO {
    return {
        id: user.id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role.name
    }
}