export const isValidId = (id: number): boolean => {
    return !!(id && typeof id === 'number' && Number.isInteger(id) && id > 0);
};

export const isValidStrings = (...strs: string[]): boolean => {
    return (strs.filter(str => !str || typeof str !== 'string').length == 0);
};

export const isValidObject = (obj: Object, ...nullableProps: string[]) => {
    return obj && Object.keys(obj).every(key => {
        if (key === 'id') return isValidId(obj['id']);
        if (nullableProps.includes(key)) return true;
        return obj[key];
    });
};

export const isPropertyOf = (prop: any, type: any) => {

    console.log(`Property checker: ${prop}?`);

    if (!prop || !type) {
        return false;
    }

    let typeCreator = <T>(Type: (new () => T)): T => {
        return new Type();
    } 

    return Object.keys(typeCreator(type)).includes(prop);

}

export default {
    isValidId,
    isValidStrings,
    isValidObject,
    isPropertyOf
};
