const fs = require('fs');
const path = require('path');
const yargs = require('yargs');
require('dotenv').config();


const args = yargs.usage(`ng-translate-ai [options] \n Translates all the missing strings from .xlf file`)
    .example(`npx ng-translate-ai`)
    .option(`source`, {
        alias: `s`,
        describe: `Source .xlf file. If not provided, will detect from angular.json configuration.`,
        type: `string`,
    })
    .option(`target`, {
        alias: `t`,
        describe: `Target .xlf file.  If not provided, will detect by angular.json configuration`,
        type: `string`,
    })
    .option(`source-lang`, {
        alias: `sl`,
        describe: `Source language. If not provided, will detect by angular.json configuration`,
        type: `string`,
    })
    .option(`target-lang`, {
        alias: `tl`,
        describe: `Target language(s). Comma separated. If not provided, will detect by angular.json configuration`,
        type: `string`,
    })
    .option(`openai-key`, {
        alias: `k`,
        describe: `OpenAI API key`,
        type: `string`,
    })
    .option(`openai-model`, {
        describe: `OpenAI model`,
        type: `string`,
    })
    .option(`cache`, {
        describe: `Cache translated strings`,
        type: `boolean`,
        default: true
    })
    .option(`angular-json`, {
        describe: `Path to angular.json file`,
        type: `string`,
        default: `angular.json`
    })
    .option(`config`, {
        describe: `Path to configuration file`,
        type: `string`,
        default: `ng-translate-ai.json`
    })
    .option(`verbose`, {
        describe: `Verbose output`,
        type: `boolean`,
        default: false
    })
    .option(`prompt`, {
        describe: `Prompt for OpenAI`,
        type: `string`,
        default: `You are a great translator knowing many languages.`
    });

// TODO merge, in order of precedence:
// command line arguments (most important)
// Environment variables
// config file (ng-translate-ai.json) (if present)
// defaults (e.g. angular.json)

const defaultConfig = {
    source: 'src/locale/messages.xlf',
    target: null,
    sourceLang: null,
    targetLang: null,
    openaiKey: null,
    openaiModel: 'gpt-4o',
    skipPresent: true,
    angularJson: 'angular.json',
    verbose: false,
    prompt: "You are a great translator knowing many languages."
};

const configFilePath = args.config || 'config.json';
let configFromFile = {};
try {
    configFromFile = JSON.parse(fs.readFileSync(configFilePath, 'utf-8'));
}catch (e) {}


const angularJsonPath = args.angularJson || defaultConfig.angularJson;
let angularJsonData = {};
try {
    angularJsonData = JSON.parse(fs.readFileSync(angularJsonPath, 'utf-8'));
    const projectName = Object.keys(angularJsonData.projects)[0];

    defaultConfig.sourceLang = angularJsonData.projects[projectName].i18n.sourceLocale;

    defaultConfig.targetLang = Object.keys(angularJsonData.projects[projectName].i18n.locales)
        .filter(lang => lang !== '');
    defaultConfig.target = Object.keys(angularJsonData.projects[projectName].i18n.locales)
        .filter(lang => lang !== '')
        .map(lang => "src/locale/messages." + lang + ".xlf");
}catch (e) {}


const config = {
    source: args['source'] || configFromFile.source || defaultConfig.source,
    target: args['target'] || configFromFile.target || defaultConfig.target,
    sourceLang: args['source-lang'] || configFromFile.sourceLang || defaultConfig.sourceLang,
    targetLang: args['target-lang'] || configFromFile.targetLang || defaultConfig.targetLang,
    openaiKey: args['openai-key'] || process.env.OPENAI_KEY,
    openaiModel: args['openai-model'] || configFromFile.openaiModel || defaultConfig.openaiModel,
    skipPresent: args['skip-present'] || configFromFile.skipPresent || defaultConfig.skipPresent,
    angularJson: args['angular-json'] || configFromFile.angularJson || defaultConfig.angularJson,
    verbose: args['verbose'] || configFromFile.verbose || defaultConfig.verbose,
    prompt: args['prompt'] || configFromFile.prompt || defaultConfig.prompt
};


if(config.target.length !== config.targetLang.length)
    throw new Error(`Number of target files and target languages must be the same`);

Object.keys(config).forEach(key => {
    if (config[key] === undefined || config[key] === null)
        throw new Error(`Missing required parameter: ${key}`);
});

module.exports = { config };
