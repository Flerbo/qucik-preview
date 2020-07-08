const { readdir, writeFile } = require('fs').promises;
const { createCanvas, loadImage } = require('canvas');
const { join } = require('path');
const yargs = require('yargs');

const params = require('./params');
const args = require('./args');

const PI_180 = Math.PI / 180;
const rad = d => d * PI_180;

const canvas = createCanvas(params.outputWidth,
			                params.outputHeight,
			                params.outputExtension);

async function createPreview (filePath, fileName) {
    const ctx = canvas.getContext('2d');
    const image = await loadImage(filePath);

    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    addBackground(ctx, params.background);

    ctx.translate(canvas.width / 2, canvas.width / 2);

    createShadow(ctx, params);
    drawImage(ctx, image, params.stickerSize);

    ctx.restore();

    await saveBuffer(canvas.toBuffer(), fileName);
}

function drawImage (ctx, image, size) {
    ctx.drawImage(image, size / -2, size / -2, size, size);
}

function createShadow (
    ctx,
    { shadowAngle, shadowOffset, shadowColor, shadowBlur }
) {
    const cos = Math.cos(rad(shadowAngle));
    const sin = Math.sin(rad(shadowAngle));
    ctx.shadowOffsetX = shadowOffset * cos;
    ctx.shadowOffsetY = shadowOffset * sin;
    ctx.shadowColor = shadowColor;
    ctx.shadowBlur = shadowBlur;
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
