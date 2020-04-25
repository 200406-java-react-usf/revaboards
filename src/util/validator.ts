const isValidId = (id: number): boolean => {
    return (id && typeof id === 'number' && Number.isInteger(id) && id > 0);
};

const isValidStrings = (...strs: string[]): boolean => {
    return (strs.filter(str => !str || typeof str !== 'string').length == 0);
};

const isValidObject = (obj: Object, ...nullableProps: string[]) => {
    return obj && Object.keys(obj).every(key => {
        if (key === 'id') return isValidId(obj['id']);
        if (nullableProps.includes(key)) return true;
        return obj[key];
    });
};

export default {
    isValidId,
    isValidStrings,
    isValidObject
};