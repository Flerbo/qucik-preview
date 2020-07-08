const { readdir, writeFile } = require("fs").promises;
const { createCanvas, loadImage } = require('canvas');
const params = require('./params');

const canvas = createCanvas(params.output.width,
			    params.output.height,
			    params.output.extension);

const scanStickers = readdir;

async function createPreview (filePath, fileName) {
    const ctx = canvas.getContext("2d");
    const image = await loadImage(filePath);
    
    ctx.save();

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    addBackgroundToFile(params.background);

    // Move Pivot Point To Center
    ctx.translate((canvas.width / 2), (canvas.width / 2));

    // Create Shadow
    const cos = Math.cos(params.sticker.shadow.angle * Math.PI / 180);
    const sin = Math.sin(params.sticker.shadow.angle * Math.PI / 180);
    ctx.shadowOffsetX = params.sticker.shadow.offset * cos;
    ctx.shadowOffsetY = params.sticker.shadow.offset * sin;
    ctx.shadowColor = params.sticker.shadow.color;
    ctx.shadowBlur = params.sticker.shadow.blur;
    
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

async function addBackgroundToFile (background) {
    let ctx = canvas.getContext("2d");

    // Draw Background
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, canvas.width, canvas.height);    
}

async function downloadFile (fileName) {
    return writeFile(`${params.output.path}/${fileName}`, canvas.toBuffer());
}

async function main () {
    const stickers = await scanStickers(params.input);

    for await (const sticker of stickers) {
	await createPreview(`${params.input}/${sticker}`, sticker);
    }
}

main().catch(console.error);
