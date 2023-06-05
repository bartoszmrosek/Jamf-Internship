module.exports = {
    preset: 'jest-preset-angular',
    setupFilesAfterEnv: ['<rootDir>/test/setup-jest.ts'],
    globalSetup: 'jest-preset-angular/global-setup',
};