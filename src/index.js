#! /usr/bin/env node

// const {config} = require('./helpers/args');
// const {parseInputFile} = require('./helpers/parseInputFile');
// const {translateAll} = require('./helpers/translate');
// const {writeOutputFile} = require('./helpers/writeOutputFile');
const NgTranslateAI = require('./NgTranslateAI');

let ng = new NgTranslateAI();


// (async function main() {
//     // Convert file to xlf
//     // convert(config, 'xlf');
//
//     const {template, data} = parseInputFile(config);
//
//     const translatedData = await translateAll(data, config);
//
//     writeOutputFile(translatedData, template, config);
//
//     // Convert file to original format
//     // convert(config, 'original');
// })();

