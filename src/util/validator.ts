const isValidId = (id: number): boolean => {
    return (id && typeof id === 'number' && Number.isInteger(id) && id >= 0);
}

const isValidObject = (entity: Object, ...nullableProps: string[]): boolean => {
    return Object.keys(entity).every(key => {
        if (nullableProps.includes(key)) return true;
        return entity[key];
    })
}

export default {
    isValidId,
    isValidObject
}