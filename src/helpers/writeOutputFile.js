const fs = require('fs');
const path = require('path');
const { XMLBuilder } = require('fast-xml-parser');

/**
 * Will write the output file.
 *
 * Take the data in the input format, as specified in `parseInputFile.js`.
 *
 */
function writeOutputFile(ngTranslateAiInstance) {
    ngTranslateAiInstance.config.targetLang.forEach((lang, index) => {
        ngTranslateAiInstance.template.xliff.file.body['trans-unit'].forEach(unit => {
            const translatedUnit = data.find(d => d.id === unit.id);
            if (translatedUnit && translatedUnit[lang]) {
                unit.target = { "#text": translatedUnit[lang] };
            }
        });

        const builder = new XMLBuilder({
            format: true,
            ignoreAttributes: false,
            attributeNamePrefix: "",
        });

        const xml = builder.build(ngTranslateAiInstance.template);
        const outputFilePath = ngTranslateAiInstance.config.target[index];
        const dir = path.dirname(outputFilePath);
        if (!fs.existsSync(dir))
            fs.mkdirSync(dir, { recursive: true });


        fs.writeFileSync(outputFilePath, xml, 'utf-8');
    });
}

module.exports = { writeOutputFile };
