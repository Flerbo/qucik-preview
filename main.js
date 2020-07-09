const { readdir, writeFile, mkdir } = require('fs').promises;
const { join } = require('path');

const previewGenerator = require('./lib/preview-generator');

async function main (args) {
    const pg = previewGenerator(args);
    const stickers = await readdir(args.input);

    if (stickers.length) {
        await mkdir(args.output, { recursive: true })
    }

    for await (const sticker of stickers) {
	    const buff = await pg.createPreview(join(args.input, sticker));
        await writeFile(join(args.output, sticker), buff);
    }
}

if (require.main === module) {
    const args = require('./lib/args');
    main(args).catch(console.error);
}

module.exports = main;
