const fs = require("fs");
const {XMLParser, XMLBuilder, XMLValidator} = require("fast-xml-parser");
const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: ""
});

/**
 * Questa funzione prende in input gli argomenti passati da riga di comando.
 *
 * Ritorna un oggetto json formattato come:
 * [
 *  {
 *      id: "<id-if-any>",
 *      source: "<Source string>",
 *      target: "<Current existing translation>",
 *      specs: { ... }
 *  }
 * ]
 */
function parseInputFile(config) {
    // const sourceFilePath = config.source;
    const sourceFilePath = 'messages.xlf';
    const template = parser.parse(fs.readFileSync(sourceFilePath, 'utf-8'));
    let data = [];
    template.xliff.file.body['trans-unit'].forEach(unit => {
        data.push({
            id: unit.id,
            source: unit.source,
            target: unit.target || null,
            specs: null
        });
    });

    return { template, data };
}

module.exports = {parseInputFile};