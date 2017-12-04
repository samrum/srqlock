export default class Foreground
{
    constructor()
    {
        this.canvasContext = null;
        this.canvasDimensions = null;

        this.canvasAnimationOffset = 100;
    }

    init()
    {
        this.canvasContext = document.getElementById('clockTime').getContext('2d');

        this.initCanvas();

        window.addEventListener('resize', this.initCanvas.bind(this), false);
    }

    initCanvas()
    {
        const pixelRatio = window.devicePixelRatio || 1;

        this.canvasDimensions = {
            width: window.innerWidth,
            height: window.innerHeight,
        };

        this.animationSpeeds = {
            x: (this.canvasDimensions.width / 60) * 2,
            y: (this.canvasDimensions.height / 60) * 2,
        };

        const { canvas } = this.canvasContext;

        canvas.width = this.canvasDimensions.width * pixelRatio;
        canvas.height = this.canvasDimensions.height * pixelRatio;
        canvas.style.width = `${this.canvasDimensions.width}px`;
        canvas.style.height = `${this.canvasDimensions.height}px`;
        this.canvasContext.scale(pixelRatio, pixelRatio);
    }

    clear()
    {
        this.canvasContext.clearRect(
            0,
            0,
            this.canvasDimensions.width,
            this.canvasDimensions.height,
        );
    }

    updateCanvasPosition(backgroundPosition)
    {
        const offset = [1, 2].indexOf(backgroundPosition) >= 0 ? `-${this.canvasAnimationOffset}` : `${this.canvasAnimationOffset}`;
        const location = [0, 2].indexOf(backgroundPosition) >= 0 ? 'top' : 'left';
        document.getElementById('clockTime').style[location] = `${offset}%`;
    }

    renderAnimated(displayProps, timeString, backgroundPosition)
    {
        this.canvasAnimationOffset = 100;
        this.render(displayProps, timeString);
        this.updateCanvasPosition(backgroundPosition);

        requestAnimationFrame(this.animateForeground.bind(this, backgroundPosition));
    }

    animateForeground(backgroundPosition)
    {
        this.canvasAnimationOffset = this.canvasAnimationOffset - 5;
        this.updateCanvasPosition(backgroundPosition);

        if (this.canvasAnimationOffset > 0)
        {
            requestAnimationFrame(this.animateForeground.bind(this, backgroundPosition));
        }
    }

    render(displayProps, timeString)
    {
        const timeFontSize = 95;
        const bylineFontSize = 45;
        const bylineSpacing = 60;
        const { backgroundColor, textColor } = displayProps;

        document.getElementById('musicToggle').style.backgroundColor = backgroundColor;
        document.body.style.backgroundColor = backgroundColor;

        this.clear();
        this.canvasContext.fillStyle = textColor;

        this.canvasContext.font = `bold ${timeFontSize}px Arial`;
        this.canvasContext.textAlign = 'center';
        this.canvasContext.fillText(
            timeString,
            this.canvasDimensions.width / 2,
            this.canvasDimensions.height / 2,
        );
        this.canvasContext.font = `${bylineFontSize}px Arial`;
        this.canvasContext.fillText('samrum', this.canvasDimensions.width / 2, (this.canvasDimensions.height / 2) + bylineSpacing);
    }

    tearDown()
    {
        this.canvasContext.clearRect(
            0,
            0,
            this.canvasDimensions.width,
            this.canvasDimensions.height,
        );

        window.removeEventListener('resize', this.initCanvas.bind(this), false);
    }
}
