const { readdir, writeFile } = require('fs').promises;
const { join } = require('path');

const previewGenerator = require('./preview-generator');

async function main (args) {
    const pg = previewGenerator(args);
    const stickers = await readdir(args.input);

    for await (const sticker of stickers) {
	    await pg.createPreview(join(args.input, sticker), sticker);
    }
}

module.exports = { main };

if (require.main === module) {
    const args = require('./args');
    main(args).catch(console.error);
}
