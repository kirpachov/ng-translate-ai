const {setupArgs} = require('./helpers/args');
const {loadDefaultConfig, loadEnviroment, loadJsonFile, loadAngularFile} = require('./helpers/config');
const fs = require("fs");
const {parseInputFile} = require("./helpers/parseInputFile");
const {XMLParser, XMLBuilder, XMLValidator} = require("fast-xml-parser");
const {runTranslation } = require("./helpers/translate");
const {writeOutputFile} = require("./helpers/writeOutputFile");
const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: ""
});

/*
{
  "source": "src/locale/messages.xlf",
  "target": null,
  "sourceLang": null,
  "targetLang": null,
  "openaiApiKey": null,
  "openaiModel": "gpt-4o",
  "skipPresent": true,
  "angularJson": "angular.json",
  "verbose": false,
  "prompt": "You are a great translator knowing many languages."
}


 */
class NgTranslateAI {
    constructor(configurations) {
        this.config = {};
        Object.assign(this.config, loadAngularFile(configurations?.['angular-json-file'] ?? setupArgs()?.['angular-json-file']));
        Object.assign(this.config, loadJsonFile(configurations?.['config-file'] ?? setupArgs()?.['config-file']));
        Object.assign(this.config, loadEnviroment());
        Object.assign(this.config, setupArgs());
        Object.assign(this.config, configurations);

        this.validate();
    }

    validate() {
        this.errors = [];

        let skipToSkip = ['angularJson', 'target', 'targetLang', 'source', 'sourceLang']
        Object.keys(this.config).forEach(key => {
            if (skipToSkip.includes(key))
                return;

            if (this.config[key] === undefined || this.config[key] === null)
                this.errors.push(`Missing required parameter: ${key}`);
        });

        if (this.config.target.length !== this.config.targetLang.length)
            this.errors.push(`Number of target files and target languages must be the same`);

        if (!this.config.angularJson && (!this.config.target || !this.config.targetLang || !this.config.source || !this.config.sourceLang))
            this.errors.push(`Missing required parameter: angularJson or target, targetLang, source, sourceLang`);

        if (!fs.existsSync(this.config.source))
            this.errors.push(`Source file not found: ${this.config.source}`);

        if (typeof this.config.cache !== 'boolean')
            this.errors.push(`Cache must be a boolean`);

        if (this.errors.length > 0)
            throw new Error("NgTranslateAI instance is invalid: \n" + this.errors.join("\n"));

        return true;
    }

    async translate() {
        this.parseInputFile();
        this.translatedData = await runTranslation(self);
        writeOutputFile(self);
    }

    parseInputFile() {
        this.template = parser.parse(fs.readFileSync(this.config.source, 'utf-8'));
        this.data = [];
        template.xliff.file.body['trans-unit'].forEach(unit => {
            this.data.push({
                id: unit.id,
                source: unit.source,
                target: unit.target || null,
                specs: null
            });
        });
    }



    // buildConfig(configurations, args, envConfig, configFile, angularJsonData/*, defaultConfig*/) {
    //     this.config = {};
    //     this.config.source = configurations['source'] || args['source'] || configFile['source'] || angularJsonData['source'];
    //     this.config.target = configurations['target'] || args['target'] || configFile['target'] || angularJsonData['target'];
    //     this.config.sourceLang = configurations['sourceLang'] || args['sourceLang'] || configFile['sourceLang'] || angularJsonData['sourceLang'];
    //     this.config.targetLang = configurations['targetLang'] || args['targetLang'] || configFile['targetLang'] || angularJsonData['targetLang'];
    //     this.config.openaiApiKey = configurations['openaiApiKey'] || args['openaiApiKey'] || envConfig['OPENAI_API_KEY'];
    //     this.config.openaiModel = configurations['openaiModel'] || args['openaiModel'] || configFile['openaiModel'];
    //     this.config.cache = configurations['cache'] || args['cache'] || configFile['cache'];
    //     this.config.angularJson = configurations['angularJson'] || args['angularJson'] || configFile['angularJson'];
    //     this.config.verbose = configurations['verbose'] || args['verbose'] || configFile['verbose'];
    //     this.config.prompt = configurations['prompt'] || args['prompt'] || configFile['prompt'];
    // }
}

module.exports = NgTranslateAI;