const { readdir, writeFile } = require('fs').promises;
const { createCanvas, loadImage } = require('canvas');
const { join } = require('path');
const yargs = require('yargs');
const { homepage } = require('./package');
const params = require('./params');

const PI_180 = Math.PI / 180;
const rad = d => d * PI_180;

const args = yargs
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

const canvas = createCanvas(params.output.width,
			                params.output.height,
			                params.output.extension);

async function createPreview (filePath, fileName) {
    const ctx = canvas.getContext('2d');
    const image = await loadImage(filePath);

    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    addBackground(ctx, params.background);

    ctx.translate(canvas.width / 2, canvas.width / 2);

    createShadow(ctx, params.sticker.shadow);
    drawImage(ctx, image, params.sticker.size);

    ctx.restore();

    await saveBuffer(canvas.toBuffer(), fileName);
}

function drawImage (ctx, image, size) {
    ctx.drawImage(image, size / -2, size / -2, size, size);
}

function createShadow (ctx, { angle, offset, color, blur }) {
    const cos = Math.cos(rad(angle));
    const sin = Math.sin(rad(angle));
    ctx.shadowOffsetX = offset * cos;
    ctx.shadowOffsetY = offset * sin;
    ctx.shadowColor = color;
    ctx.shadowBlur = blur;
}

function addBackground (ctx, background) {
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

async function saveBuffer (buff, fileName) {
    return writeFile(join(args.output, fileName), buff);
}

async function main () {
    const stickers = await readdir(args.input);

    for await (const sticker of stickers) {
	    await createPreview(join(args.input, sticker), sticker);
    }
}

module.exports = {
    createPreview,
    drawImage,
    createShadow,
    addBackground,
    saveBuffer,
    main,
};

if (require.main === module) {
    main().catch(console.error);
}
