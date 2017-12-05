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
        this.show();
        this.canvas.style.left = '0';
        this.canvas.style.top = '0';

        this.canvasContext.clearRect(
            0,
            0,
            this.canvasDimensions.width,
            this.canvasDimensions.height,
        );
    }

    render(options)
    {
        if (options.hide)
        {
            if (options.isNight)
            {
                this.hide();
            }
            else
            {
                this.renderAnimated(false, options.displayProperties, options.timeString, options.backgroundPosition);
            }
        }
        else if (options.show && !options.isNight)
        {
            this.renderAnimated(true, options.displayProperties, options.timeString, options.backgroundPosition);
        }
        else
        {
            this.renderStatic(options.displayProperties, options.timeString, false);
        }
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
        this.renderStatic(displayProps, timeString, !inwards);

        requestAnimationFrame(this.animate.bind(this, inwards, backgroundPosition));
    }

    animate(inwards, backgroundPosition)
    {
        this.updateCanvasPosition(inwards, backgroundPosition);
        this.canvasPositionOffset = this.canvasPositionOffset - (inwards ? 5 : -5);

        if (this.canvasPositionOffset >= 0 && this.canvasPositionOffset <= 100)
        {
            requestAnimationFrame(this.animate.bind(this, inwards, backgroundPosition));
        }
    }

    renderStatic(displayProps, timeString, keepFillStyle)
    {
        const timeFontSize = 95;
        const bylineFontSize = 45;
        const bylineSpacing = 60;
        const { backgroundColor, textColor } = displayProps;

        this.musicToggle.style.backgroundColor = backgroundColor;

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
        this.clear();
        window.removeEventListener('resize', this.initCanvas.bind(this), false);
    }
}
