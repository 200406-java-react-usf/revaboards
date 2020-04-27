"use strict";
exports.__esModule = true;
var isValidId = function (id) {
    return (id && typeof id === 'number' && Number.isInteger(id) && id > 0);
};
var isValidStrings = function () {
    var strs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        strs[_i] = arguments[_i];
    }
    for (var _a = 0, strs_1 = strs; _a < strs_1.length; _a++) {
        var str = strs_1[_a];
        if (!str || typeof str !== 'string') {
            return false;
        }
    }
    return true;
};
var isValidObject = function (obj) {
    var nullableProps = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        nullableProps[_i - 1] = arguments[_i];
    }
    return obj && Object.keys(obj).every(function (key) {
        if (nullableProps.includes(key))
            return true;
        return obj[key];
    });
};
exports["default"] = {
    isValidId: isValidId,
    isValidStrings: isValidStrings,
    isValidObject: isValidObject
};
