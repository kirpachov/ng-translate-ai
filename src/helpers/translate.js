const { OpenAI } = require('openai');


async function translateAll(data, config, lang) {
    const openai = new OpenAI({
        apiKey: config.openaiKey,
    });
    for (const row of data) {
        const str = config.prompt + `Translate the following strings from ${config.sourceLang} to ${lang}.\n ${row.source}`;
        const completion = await openai.completions.create({
            model: config.openaiModel,
            prompt: str,
        });
        row[lang] = completion.choices[0].text;
    }

}

module.exports = {translateAll};