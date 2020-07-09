const { createCanvas, loadImage } = require('canvas');
const { initContext, drawImage, fillBackground } = require('./helpers');

function previewGenerator (args) {
    const canvas = createCanvas(args.outputWidth,
			                    args.outputHeight,
			                    args.outputExtension);
    const ctx = initContext(canvas, args);

    async function createPreview (filePath) {
        const image = await loadImage(filePath);

        fillBackground(ctx, canvas.width, canvas.height);
        drawImage(ctx, image, args.stickerSize);

        ctx.restore();
        return canvas.toBuffer();
    }

    return { createPreview };
}

module.exports = previewGenerator;
