const rad = require('./rad');

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

function fillBackground (ctx, width, height) {
    ctx.fillRect(width / -2, height / -2, width, height);
}

module.exports = { initContext,
                   drawImage,
                   fillBackground };
