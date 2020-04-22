export interface CrudRepository<T> {
<<<<<<< HEAD
    getAll():Promise<T[]>;
=======
    getAll(): Promise<T[]>;
>>>>>>> 3308a8b8877ad299eb3edf3eabaa5e1330b7d7ee
    getById(id: number): Promise<T>;
    save(newObj: T): Promise<T>;
    update(updatedObj: T): Promise<boolean>;
    deleteById(id: number): Promise<boolean>;
}