export default class Foreground
{
    constructor()
    {
        this.canvasContext = null;
        this.canvasDimensions = null;

        this.canvasPositionOffset = 100;
    }

    init()
    {
        this.canvas = document.getElementById('clockTime');
        this.canvasContext = this.canvas.getContext('2d');
        this.musicToggle = document.getElementById('musicToggle');

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

    hide()
    {
        this.canvas.style.display = 'none';
    }

    show()
    {
        this.canvas.style.display = 'block';
    }

    clear()
    {
        this.canvas.style.left = '0';
        this.canvas.style.top = '0';

        this.canvasContext.clearRect(
            0,
            0,
            this.canvasDimensions.width,
            this.canvasDimensions.height,
        );
    }

    updateCanvasPosition(inwards, backgroundPosition)
    {
        let offset = [1, 2].indexOf(backgroundPosition) >= 0 ? `-${this.canvasPositionOffset}` : `${this.canvasPositionOffset}`;
        const location = [0, 2].indexOf(backgroundPosition) >= 0 ? 'top' : 'left';

        if (!inwards)
        {
            offset *= -1;
        }

        this.canvas.style[location] = `${offset}%`;
    }

    renderAnimated(inwards, displayProps, timeString, backgroundPosition)
    {
        this.canvasPositionOffset = inwards ? 100 : 0;
        this.render(displayProps, timeString, !inwards);

        requestAnimationFrame(this.animateForeground.bind(this, inwards, backgroundPosition));
    }

    animateForeground(inwards, backgroundPosition)
    {
        this.updateCanvasPosition(inwards, backgroundPosition);
        this.canvasPositionOffset = this.canvasPositionOffset - (inwards ? 5 : -5);

        if (this.canvasPositionOffset >= 0 && this.canvasPositionOffset <= 100)
        {
            requestAnimationFrame(this.animateForeground.bind(this, inwards, backgroundPosition));
        }
    }

    render(displayProps, timeString, keepFillStyle)
    {
        const timeFontSize = 95;
        const bylineFontSize = 45;
        const bylineSpacing = 60;
        const { backgroundColor, textColor } = displayProps;

        this.musicToggle.style.backgroundColor = backgroundColor;
        document.body.style.backgroundColor = backgroundColor;

        this.show();
        this.clear();

        if (!keepFillStyle)
        {
            this.canvasContext.fillStyle = textColor;
        }

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
