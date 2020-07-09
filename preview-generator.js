const { createCanvas, loadImage } = require('canvas');
const rad = require('./rad');

function previewGenerator (args) {
    const canvas = createCanvas(args.outputWidth,
			                    args.outputHeight,
			                    args.outputExtension);
    const ctx = initContext(canvas, args);

    async function createPreview (filePath) {
        const image = await loadImage(filePath);

        fillBackground(ctx, args.background);
        drawImage(ctx, image, args.stickerSize);

        ctx.restore();
        return canvas.toBuffer();
    }

    function initContext (canvas, args) {
        const ctx = canvas.getContext('2d');
        const cos = Math.cos(rad(args.shadowAngle));
        const sin = Math.sin(rad(args.shadowAngle));

        ctx.translate(canvas.width / 2, canvas.width / 2);
        ctx.shadowOffsetX = args.shadowOffset * cos;
        ctx.shadowOffsetY = args.shadowOffset * sin;
        ctx.shadowColor = args.shadowColor;
        ctx.shadowBlur = args.shadowBlur;
        ctx.fillStyle = args.background;

        ctx.save();
        return ctx;
    }

    function drawImage (ctx, image, size) {
        ctx.drawImage(image, size / -2, size / -2, size, size);
    }

    function fillBackground (ctx, background) {
        ctx.fillRect(canvas.width / -2,
                     canvas.height / -2,
                     canvas.width,
                     canvas.height);
    }

    return { createPreview,
             drawImage,
             fillBackground };
}

module.exports = previewGenerator;
