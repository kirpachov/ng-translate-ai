const path = require('path');
const NG_TRANSLATE_AI_PATH = path.resolve('./src/NgTranslateAI');
const NgTranslateAI = require(NG_TRANSLATE_AI_PATH);
const setupArgs = require('../src/helpers/args');
const fs = require('fs');

// jest.mock('fs');

jest.mock('../src/helpers/args', () => ({
    setupArgs: jest.fn(),
}));


describe('NgTranslateAIArgs', () => {const path = require('path');
const NG_TRANSLATE_AI_PATH = path.resolve('./src/NgTranslateAI');
const NgTranslateAI = require(NG_TRANSLATE_AI_PATH);
const setupArgs = require('../src/helpers/args');
const fs = require('fs');

// jest.mock('fs');

// jest.mock('../src/helpers/args', () => ({
//     setupArgs: jest.fn(),
// }));


describe('NgTranslateAIArgs', () => {
    let params, argsMock;

    beforeAll(() => {
        params = {
            'source': 'examples/sample-1/messages.xlf',
            'target': ['tmp/output.xlf'],
            'sourceLang': 'en',
            'targetLang': ['it'],
            'openaiApiKey': 'example-key',
            'openaiModel': 'example-model',
            'cache': true,
            'verbose': true,
            'prompt': 'You are a great translator knowing many languages.'
        };
    });

    afterEach(() => {
        if(argsMock) argsMock.mockRestore();
    })

    const expectConfig = (ng, objectTest = params) => {
        expect(ng.config.source).toBe(objectTest.source);
        expect(ng.config.target).toStrictEqual(objectTest.target);
        expect(ng.config.sourceLang).toBe(objectTest.sourceLang);
        expect(ng.config.targetLang).toStrictEqual(objectTest.targetLang);
        expect(ng.config.openaiApiKey).toBe(objectTest.openaiApiKey);
        expect(ng.config.openaiModel).toBe(objectTest.openaiModel);
        expect(ng.config.cache).toBe(objectTest.cache);
        expect(ng.config.verbose).toBe(objectTest.verbose);
        expect(ng.config.prompt).toBe(objectTest.prompt);
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    // test('Empty settings', () => {
    //     expect(() => {
    //         new NgTranslateAI();
    //     }).toThrowError("");
    // });

    test('By constructor', () => {
        let ng = new NgTranslateAI(params);

        expectConfig(ng);
    });

    describe('NgTranslateAI - setupArgs', () => {
        beforeAll(() => {
            argsMock = jest.spyOn(setupArgs, 'setupArgs').mockReturnValue(params);
        })

        test('By args', () => {
            let ng = new NgTranslateAI();
            expectConfig(ng);
        });
    });

    describe('By configFile', () => {
        let key = {'openaiApiKey': 'test-key'}
        test('Set by constructor', () => {

            let ng = new NgTranslateAI(Object.assign({
                'config-file': 'examples/sample-1/config.json'
            }, key));
            expectConfig(ng, Object.assign(JSON.parse(fs.readFileSync('examples/sample-1/config.json')), key));
        })

        describe('Set by args', () => {
            beforeAll(() => {
                argsMock = jest.spyOn(setupArgs, 'setupArgs').mockReturnValue(Object.assign({
                    'config-file': 'examples/sample-1/config.json'
                }, key));
            })
            test('Set by args', () => {
                let ng = new NgTranslateAI();
                expectConfig(ng, Object.assign(JSON.parse(fs.readFileSync('examples/sample-1/config.json')), key));
            })

            afterAll(() => {
                setupArgs.setupArgs.mockRestore();
            });
        });
    });

    describe('By angularJsonFile', () => {
        let key = {'openaiApiKey': 'test-key'}
        test('Set by constructor', () => {
            let ng = new NgTranslateAI(Object.assign({
                'angular-json-file': 'examples/sample-1/angular.json',
                'openaiModel': 'test-model',
                cache: true,
                verbose: true,
                prompt: 'You are a great translator knowing many languages.'
            }, key));
            expect(ng.config.source).toBe('examples/sample-1/config.json');
            expect(ng.config.sourceLang).toBe('it');
            expect(ng.config.targetLang).toStrictEqual(['en']);
            expect(ng.config.target).toStrictEqual(['locales/messages.en.xlf']);
            expect(ng.config.openaiApiKey).toBe('test-key');
            expect(ng.config.openaiModel).toBe('test-model');
            expect(ng.config.cache).toBe(true);
            expect(ng.config.verbose).toBe(true);
            expect(ng.config.prompt).toBe('You are a great translator knowing many languages.');

        })

        describe('Set by args', () => {
            console.log(setupArgs)
            argsMock = jest.spyOn(setupArgs, 'setupArgs').mockReturnValue(Object.assign({
                'angular-json-file': 'examples/sample-1/angular.json',
                'openaiModel': 'test-model',
                cache: true,
                verbose: true,
                prompt: 'You are a great translator knowing many languages.'
            }, key));
            test('Set by args', () => {
                let ng = new NgTranslateAI();

                expect(ng.config.source).toBe('examples/sample-1/config.json');
                expect(ng.config.sourceLang).toBe('it');
                expect(ng.config.targetLang).toStrictEqual(['en']);
                expect(ng.config.target).toStrictEqual(['locales/messages.en.xlf']);
                expect(ng.config.openaiApiKey).toBe('test-key');
                expect(ng.config.openaiModel).toBe('test-model');
                expect(ng.config.cache).toBe(true);
                expect(ng.config.verbose).toBe(true);
                expect(ng.config.prompt).toBe('You are a great translator knowing many languages.');

            })
        });
    });
});

    let params, argsMock;

    beforeAll(() => {
        params = {
            'source': 'examples/sample-1/messages.xlf',
            'target': ['tmp/output.xlf'],
            'sourceLang': 'en',
            'targetLang': ['it'],
            'openaiApiKey': 'example-key',
            'openaiModel': 'example-model',
            'cache': true,
            'verbose': true,
            'prompt': 'You are a great translator knowing many languages.'
        };
    });

    afterEach(() => {
        if(argsMock) argsMock.mockRestore();
    })

    const expectConfig = (ng, objectTest = params) => {
        expect(ng.config.source).toBe(objectTest.source);
        expect(ng.config.target).toStrictEqual(objectTest.target);
        expect(ng.config.sourceLang).toBe(objectTest.sourceLang);
        expect(ng.config.targetLang).toStrictEqual(objectTest.targetLang);
        expect(ng.config.openaiApiKey).toBe(objectTest.openaiApiKey);
        expect(ng.config.openaiModel).toBe(objectTest.openaiModel);
        expect(ng.config.cache).toBe(objectTest.cache);
        expect(ng.config.verbose).toBe(objectTest.verbose);
        expect(ng.config.prompt).toBe(objectTest.prompt);
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    // test('Empty settings', () => {
    //     expect(() => {
    //         new NgTranslateAI();
    //     }).toThrowError("");
    // });

    test('By constructor', () => {
        let ng = new NgTranslateAI(params);

        expectConfig(ng);
    });

    describe('NgTranslateAI - setupArgs', () => {
        beforeAll(() => {
            argsMock = jest.spyOn(setupArgs, 'setupArgs').mockReturnValue(params);
        })

        test('By args', () => {
            let ng = new NgTranslateAI();
            expectConfig(ng);
        });
    });

    describe('By configFile', () => {
        let key = {'openaiApiKey': 'test-key'}
        test('Set by constructor', () => {

            let ng = new NgTranslateAI(Object.assign({
                'config-file': 'examples/sample-1/config.json'
            }, key));
            expectConfig(ng, Object.assign(JSON.parse(fs.readFileSync('examples/sample-1/config.json')), key));
        })

        describe('Set by args', () => {
            beforeAll(() => {
                argsMock = jest.spyOn(setupArgs, 'setupArgs').mockReturnValue(Object.assign({
                    'config-file': 'examples/sample-1/config.json'
                }, key));
            })
            test('Set by args', () => {
                let ng = new NgTranslateAI();
                expectConfig(ng, Object.assign(JSON.parse(fs.readFileSync('examples/sample-1/config.json')), key));
            })

            afterAll(() => {
                setupArgs.setupArgs.mockRestore();
            });
        });
    });

    describe('By angularJsonFile', () => {
        let key = {'openaiApiKey': 'test-key'}
        test('Set by constructor', () => {
            let ng = new NgTranslateAI(Object.assign({
                'angular-json-file': 'examples/sample-1/angular.json',
                'openaiModel': 'test-model',
                cache: true,
                verbose: true,
                prompt: 'You are a great translator knowing many languages.'
            }, key));
            expect(ng.config.source).toBe('examples/sample-1/config.json');
            expect(ng.config.sourceLang).toBe('it');
            expect(ng.config.targetLang).toStrictEqual(['en']);
            expect(ng.config.target).toStrictEqual(['locales/messages.en.xlf']);
            expect(ng.config.openaiApiKey).toBe('test-key');
            expect(ng.config.openaiModel).toBe('test-model');
            expect(ng.config.cache).toBe(true);
            expect(ng.config.verbose).toBe(true);
            expect(ng.config.prompt).toBe('You are a great translator knowing many languages.');

        })

        describe('Set by args', () => {
            argsMock = jest.spyOn(setupArgs, 'setupArgs').mockReturnValue(Object.assign({
                'angular-json-file': 'examples/sample-1/angular.json',
                'openaiModel': 'test-model',
                cache: true,
                verbose: true,
                prompt: 'You are a great translator knowing many languages.'
            }, key));
            test('Set by args', () => {
                let ng = new NgTranslateAI();

                expect(ng.config.source).toBe('examples/sample-1/config.json');
                expect(ng.config.sourceLang).toBe('it');
                expect(ng.config.targetLang).toStrictEqual(['en']);
                expect(ng.config.target).toStrictEqual(['locales/messages.en.xlf']);
                expect(ng.config.openaiApiKey).toBe('test-key');
                expect(ng.config.openaiModel).toBe('test-model');
                expect(ng.config.cache).toBe(true);
                expect(ng.config.verbose).toBe(true);
                expect(ng.config.prompt).toBe('You are a great translator knowing many languages.');

            })
        });
    });
});
