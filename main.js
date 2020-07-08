const { readdir, writeFile } = require('fs').promises;
const { createCanvas, loadImage } = require('canvas');
const params = require('./params');

const PI_180 = Math.PI / 180;
const rad = d => d * PI_180;

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

    await downloadFile(fileName);
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

async function downloadFile (fileName) {
    return writeFile(`${params.output.path}/${fileName}`, canvas.toBuffer());
}

async function main () {
    const stickers = await readdir(params.input);

    for await (const sticker of stickers) {
	    await createPreview(`${params.input}/${sticker}`, sticker);
    }
}

main().catch(console.error);
