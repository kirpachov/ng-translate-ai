const fs = require('fs');
const path = require("path");

const DEFAULT_CONFIG_PATH = path.join(__dirname, '..', '..', 'config', 'defaultConfig.json');

function loadDefaultConfig() {
    return loadJsonFile(path.resolve(__dirname, DEFAULT_CONFIG_PATH))
}

// it should return only OPENAI_API_KEY
function loadEnviroment() {
    return process.env;
}


function loadJsonFile(path) {
    if (!fs.existsSync(path))
        return {};

    try {
        return JSON.parse(fs.readFileSync(path, 'utf-8'));
    } catch (e) {
        throw new Error(`Error reading config file: ${e.message}`);
    }
}

/*
deve ritornare
{
    "source": "",
    "sourceLang": "",
    "target": [],
    "targetLang": []
}

 */
function loadAngularFile(path) {
    let result = {};

    try {
        let data = loadJsonFile(path);
        let langData = data.projects[Object.keys(data.projects)[0]].i18n
        let targets = Object.keys(langData.locales)
            .filter(key => key !== '')
            .reduce((obj, key) => {
                obj[key] = langData.locales[key];
                return obj;
            }, {})

        result = {
            source: langData.locales[''].translation,
            sourceLang: langData.sourceLocale,
            target: Object.values(targets).map((value) => value.translation) || {},
            targetLang: Object.keys(targets) || {}
        };

    } catch (e) {
    }
    return result;
}

module.exports = {loadDefaultConfig, loadEnviroment, loadJsonFile, loadAngularFile};