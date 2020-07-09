const { createCanvas, loadImage } = require('canvas');
const { writeFile } = require('fs').promises;
const { join } = require('path');
const rad = require('./rad');

function previewGenerator (args) {
    const canvas = createCanvas(args.outputWidth,
			                    args.outputHeight,
			                    args.outputExtension);

    async function createPreview (filePath, fileName) {
        const ctx = canvas.getContext('2d');
        const image = await loadImage(filePath);

        ctx.save();
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        addBackground(ctx, args.background);

        ctx.translate(canvas.width / 2, canvas.width / 2);

        createShadow(ctx, args);
        drawImage(ctx, image, args.stickerSize);

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

    return { createPreview,
             drawImage,
             createShadow,
             addBackground,
             saveBuffer };
}

module.exports = previewGenerator;
