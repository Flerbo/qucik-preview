const yargs = require('yargs');
const opts = require('../default-options');
const { homepage } = require('../package');

module.exports = yargs
    .usage('Usage: [-i <stickers-dir>] [-o <previews-dir>]')
    .epilogue(`For more information, see ${homepage}`)

    .option('i', { alias: 'input',
                   describe: 'Inputs directory',
                   type: 'string',
                   demandOption: true,
                   default: opts.input })

    .option('o', { alias: 'output',
                   describe: 'Outputs directory',
                   type: 'string',
                   demandOption: true,
                   default: opts.output })

    .option('s', { alias: 'sticker-size',
                   describe: 'Sticker size (in pixels)',
                   type: 'number',
                   demandOption: true,
                   default: opts.stickerSize })

    .option('sc', { alias: 'shadow-color',
                    describe: 'Shadow color',
                    type: 'string',
                    demandOption: true,
                    default: opts.shadowColor })

    .option('sa', { alias: 'shadow-angle',
                    describe: 'Shadow angle',
                    type: 'number',
                    demandOption: true,
                    default: opts.shadowAngle })

    .option('so', { alias: 'shadow-offset',
                    describe: 'Shadow offset',
                    type: 'number',
                    demandOption: true,
                    default: opts.shadowOffset })

    .option('sb', { alias: 'shadow-blur',
                    describe: 'Shadow blur',
                    type: 'number',
                    demandOption: true,
                    default: opts.shadowBlur })

    .option('bg', { alias: 'background',
                    describe: 'Background color (hex)',
                    type: 'string',
                    demandOption: true,
                    default: opts.background })

    .option('w', { alias: 'output-width',
                   describe: 'Output width (px)',
                   type: 'number',
                   demandOption: true,
                   default: opts.outputWidth })

    .option('h', { alias: 'output-height',
                   describe: 'Output height (px)',
                   type: 'number',
                   demandOption: true,
                   default: opts.outputHeight })

    .argv;
