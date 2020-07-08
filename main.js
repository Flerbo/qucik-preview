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

    addBackground(params.background);

    // Move Pivot Point To Center
    ctx.translate(canvas.width / 2, canvas.width / 2);

    // Create Shadow
    createShadow(params.sticker.shadow);

    // Draw Image From Center
    ctx.drawImage(
	    image,
	    params.sticker.size / -2,
	    params.sticker.size / -2,
	    params.sticker.size,
	    params.sticker.size,
    );
    ctx.restore();

    await downloadFile(fileName);
}

function createShadow ({ angle, offset, color, blur }) {
    let ctx = canvas.getContext('2d');

    const cos = Math.cos(rad(angle));
    const sin = Math.sin(rad(angle));
    ctx.shadowOffsetX = offset * cos;
    ctx.shadowOffsetY = offset * sin;
    ctx.shadowColor = color;
    ctx.shadowBlur = blur;
}

function addBackground (background) {
    let ctx = canvas.getContext('2d');

    // Draw Background
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
