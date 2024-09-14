#! /usr/bin/env node

// const path = require('path');
// const chalk = require('chalk');
// const { readFileAsync, writeFileAsync } = require('./helpers/fs-async');
// const translate = require('./translate');
// const log = require('./helpers/log');

const { args } = require('./helpers/args');
const { parseInputFile } = require('./helpers/parseInputFile');
const { translateAll } = require('./helpers/translate');
const { writeOutputFile } = require('./helpers/writeOutputFile');

// Once args are parsed, we have to read the source file and process it.
const data = parseInputFile(args);

// Now we have to use the context and the `data` to translate the strings.
const translatedData = translateAll(data, args);

// Now write translations to the target file.
writeOutputFile(translatedData, args);

// console.log(args.argv);