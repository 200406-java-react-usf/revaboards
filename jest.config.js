module.exports = {
    roots: [
        "<rootDir>/src"
    ],
    testMatch: [
        "**/__test__/**/*.+(ts|js|tsx|jsx)"
    ],
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest"
    }
}