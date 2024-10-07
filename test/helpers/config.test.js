const path = require('path');
const NG_TRANSLATE_AI_PATH = path.resolve('./src/NgTranslateAI');
const NgTranslateAI = require(NG_TRANSLATE_AI_PATH);
const { loadDefaultConfig, loadEnviroment, loadJsonFile, loadAngularFile } = require('../../src/helpers/config');
const fs = require('fs');

describe('config.js', () => {
    let mockReadFileSync, mockExistsSync;

    beforeEach(() => {
        jest.clearAllMocks();
    });

    afterEach(() => {
        if (mockReadFileSync) mockReadFileSync.mockRestore();
        if (mockExistsSync) mockExistsSync.mockRestore();
    });

    describe('loadJsonFile', () => {
       test('should return an object with the content of the file', () => {
            mockReadFileSync = jest.spyOn(fs, 'readFileSync').mockImplementation(() => '{"example-json": "example-value"}');
            mockExistsSync = jest.spyOn(fs, 'existsSync').mockImplementation(() => true);

            const result = loadJsonFile('file.json');
            expect(result).toEqual({ "example-json": "example-value" });
        });

        test('when the file does not exist, should return an empty object', () => {
            jest.spyOn(fs, 'readFileSync').mockImplementation(() => {
                throw new Error('File not found')
            });
            jest.spyOn(fs, 'existsSync').mockImplementation(() => false);
            expect(loadJsonFile('file-that-does-not-exist.json')).toEqual({});
        });

        test('when the file is not a valid json, should throw an error', () => {
            jest.spyOn(fs, 'readFileSync').mockImplementation(() => 'not-a-json.json');
            jest.spyOn(fs, 'existsSync').mockImplementation(() => true);
            expect(() => {
                loadJsonFile('file.json');
            }).toThrow('Error reading config file: Unexpected token \'o\', "not-a-json.json" is not valid JSON');
        });
    });

    describe('loadAngularFile', () => {
        test('should return an object with source, sourceLang, target and targetLang', () => {
            const result = loadAngularFile('examples/sample-1/angular.json');
            expect(result).toEqual({
                source: 'examples/sample-1/config.json',
                sourceLang: 'it',
                target: ['locales/messages.en.xlf'],
                targetLang: ['en']
            });
        });

        test('when the file does not exist, should return an empty object', () => {
            jest.spyOn(fs, 'existsSync').mockImplementation(() => false);

            const result = loadAngularFile('examples/sample-1/angular-that-does-not-exist.json');
            expect(result).toEqual({});
        });
    });

    describe('loadEnviroment', () => {
        test('should return only the OPENAI_API_KEY from process.env', () => {
            const mockEnv = { OPENAI_API_KEY: 'test-openai-key', OTHER_VAR: 'other-value' };
            process.env = mockEnv;

            const result = loadEnviroment();
            expect(result).toEqual(mockEnv);

            expect(result).toHaveProperty('OPENAI_API_KEY', 'test-openai-key');
        });
    });
});
