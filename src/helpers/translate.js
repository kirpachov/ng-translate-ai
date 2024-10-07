const { OpenAI } = require('openai');
const fs = require("node:fs");

const CACHE_FILE = 'cache.json';

async function runTranslation(ngTranslateAiInstance) {
    const openai = new OpenAI({
        openaiApiKey: ngTranslateAiInstance.config.openaiApiKey,
    });

    if (!fs.existsSync(CACHE_FILE)) {
        fs.writeFileSync(CACHE_FILE, '{}');
    }

    let cache = JSON.parse(fs.readFileSync(CACHE_FILE, { flag: 'r' }));

    const translationPromises = data.map(async (row) => {
        for (const lang of ngTranslateAiInstance.config.targetLang) {
            if (ngTranslateAiInstance.config.cache && cache[row.source] && cache[row.source][lang]) {
                row[lang] = cache[row.source][lang];
            } else {
                const str = `${ngTranslateAiInstance.config.prompt} Translate the following strings from ${ngTranslateAiInstance.config.sourceLang} to ${lang}. Don't write anything else.\n${row.source}`;
                try {
                    const completion = await openai.chat.completions.create({
                        model: ngTranslateAiInstance.config.openaiModel,
                        messages: [
                            { "role": "system", "content": "You are a great translator." },
                            { "role": "user", "content": str }
                        ],
                    });

                    row[lang] = completion.choices[0].message.content;

                    const cache_row = {
                        [config.sourceLang]: row.source,
                        [lang]: row[lang]
                    };

                    if (!cache[row.source]) {
                        cache[row.source] = {};
                    }
                    cache[row.source] = { ...cache[row.source], ...cache_row };

                    fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2));

                } catch (error) {
                    console.error(`Error while translating ${row.source} from ${lang}:`, error);
                    row[lang] = `Errore: ${error.message}`;
                }
            }
        }
        return row;
    });

    return await Promise.all(translationPromises);
}

module.exports = { runTranslation };
