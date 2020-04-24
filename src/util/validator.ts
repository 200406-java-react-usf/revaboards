<<<<<<< HEAD
import { Post } from "../models/post";
import { User } from "../models/user";

=======
>>>>>>> b04e36147c8a2da3e77443ebf8c6a1f08b9d9770
const isValidId = (id: number): boolean => {
    return (id && typeof id === 'number' && Number.isInteger(id) && id > 0);
}

const isValidStrings = (...strs: string[]): boolean => {
<<<<<<< HEAD
=======
   
>>>>>>> b04e36147c8a2da3e77443ebf8c6a1f08b9d9770
    for (let str of strs) {
        if (!str || typeof str !== 'string') {
            return false;
        }
    }
<<<<<<< HEAD
    return true;
}

const isValidObject = (obj: Object, ...nullableProps: string[]) => {
=======

    return true;

}

const isValidObject = (obj: Object, ...nullableProps: string[]) => {
    
>>>>>>> b04e36147c8a2da3e77443ebf8c6a1f08b9d9770
    return obj && Object.keys(obj).every(key => {
        if (nullableProps.includes(key)) return true;
        return obj[key];
    });
<<<<<<< HEAD
=======

>>>>>>> b04e36147c8a2da3e77443ebf8c6a1f08b9d9770
}

export default {
    isValidId,
    isValidStrings,
    isValidObject
}