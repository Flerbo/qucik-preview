const yargs = require('yargs');
const params = require('./params');
const { homepage } = require('./package');

module.exports = yargs
    .usage('Usage: [-i <stickers-dir>] [-o <previews-dir>]')
    .epilogue(`For more information, see ${homepage}`)

    .option('i', { alias: 'input',
                   describe: 'Inputs directory',
                   type: 'string',
                   demandOption: true,
                   default: params.input })

    .option('o', { alias: 'output',
                   describe: 'Outputs directory',
                   type: 'string',
                   demandOption: true,
                   default: params.output })

    .option('s', { alias: 'sticker-size',
                   describe: 'Sticker size (in pixels)',
                   type: 'number',
                   demandOption: true,
                   default: params.stickerSize })

    .option('sc', { alias: 'shadow-color',
                    describe: 'Shadow color',
                    type: 'string',
                    demandOption: true,
                    default: params.shadowColor })

    .option('sa', { alias: 'shadow-angle',
                    describe: 'Shadow angle',
                    type: 'number',
                    demandOption: true,
                    default: params.shadowAngle })

    .option('so', { alias: 'shadow-offset',
                    describe: 'Shadow offset',
                    type: 'number',
                    demandOption: true,
                    default: params.shadowOffset })

    .option('sb', { alias: 'shadow-blur',
                    describe: 'Shadow blur',
                    type: 'number',
                    demandOption: true,
                    default: params.shadowBlur })

    .option('bg', { alias: 'background',
                    describe: 'Background color (hex)',
                    type: 'string',
                    demandOption: true,
                    default: params.background })

    .option('w', { alias: 'output-width',
                   describe: 'Output width (px)',
                   type: 'number',
                   demandOption: true,
                   default: params.outputWidth })

    .option('h', { alias: 'output-height',
                   describe: 'Output height (px)',
                   type: 'number',
                   demandOption: true,
                   default: params.outputHeight })

    .argv;
