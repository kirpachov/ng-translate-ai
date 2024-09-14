const args = require('yargs').usage(`ng-translate-ai [options] \n Translates all the missing strings from .xlf file`)
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
                              .option(`skip-present`, {
                                  describe: `Skip present strings`,
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
                              .option(`context`, {
                                  describe: `Context for OpenAI`,
                                  type: `string`,
                                  default: `You are a great translator knowing many languages.`
                              });

// TODO merge, in order of precedence:
// command line arguments (most important)
// Environment variables
// config file (ng-translate-ai.json) (if present)
// defaults (e.g. angular.json)

module.exports = { args };