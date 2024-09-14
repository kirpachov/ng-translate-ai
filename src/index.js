#! /usr/bin/env node

const { config } = require('./helpers/args');
const { parseInputFile } = require('./helpers/parseInputFile');
const { translateAll } = require('./helpers/translate');
const { writeOutputFile } = require('./helpers/writeOutputFile');

// Once args are parsed, we have to read the source file and process it.
const {template, data} = parseInputFile(config);

config.targetLang.forEach((lang) => {

    // Now we have to use the context and the `data` to translate the strings.
    const translatedData = translateAll(data, config, lang);

    // Now write translations to the target file.
    writeOutputFile(translatedData, template, config, lang);

});
