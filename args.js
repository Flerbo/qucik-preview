const yargs = require('yargs');
const params = require('./params');
const { homepage } = require('./package');

module.exports = yargs
    .usage('Usage: [-i <stickers-dir>] [-o <previews-dir>]')
    .option('i', { alias: 'input',
                   describe: 'Inputs directory',
                   type: 'string',
                   demandOption: true,
                   default: params.input })
    .option('o', { alias: 'output',
                   describe: 'Outputs directory',
                   type: 'string',
                   demandOption: true,
                   default: params.output.path })
    .argv;
