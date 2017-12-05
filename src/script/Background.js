export default class Background
{
    constructor()
    {
        this.canvasContext = null;
        this.canvasDimensions = null;
        this.backgroundPosition = 0;
        this.canvasPositionOffset = 100;
    }

    init()
    {
        this.canvas = document.getElementById('clockBackground');
        this.canvasContext = this.canvas.getContext('2d');

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
        this.canvasContext.clearRect(
            0,
            0,
            this.canvasDimensions.width,
            this.canvasDimensions.height,
        );
    }

    getBackgroundPosition()
    {
        return this.backgroundPosition;
    }

    render(color)
    {
        this.canvas.style.left = '0';
        this.canvas.style.top = '0';
        this.show();

        this.canvasContext.fillStyle = color;
        this.canvasContext.fillRect(
            0,
            0,
            this.canvasDimensions.width,
            this.canvasDimensions.height,
        );
    }

    updateCanvasPosition(show)
    {
        let offset = [1, 2].indexOf(this.backgroundPosition) >= 0 ? `-${this.canvasPositionOffset}` : `${this.canvasPositionOffset}`;
        const location = [0, 2].indexOf(this.backgroundPosition) >= 0 ? 'top' : 'left';

        if (!show)
        {
            offset *= -1;
        }

        this.canvas.style[location] = `${offset}%`;
    }

    renderAnimated(show, backgroundColor)
    {
        this.canvasPositionOffset = show ? 100 : 0;
        this.render(backgroundColor);

        requestAnimationFrame(this.animate.bind(this, show));
    }

    animate(show)
    {
        this.updateCanvasPosition(show);
        this.canvasPositionOffset = this.canvasPositionOffset - (show ? 5 : -5);

        if (this.canvasPositionOffset >= 0 && this.canvasPositionOffset <= 100)
        {
            requestAnimationFrame(this.animate.bind(this, show));
        }
        else
        {
            this.backgroundPosition = this.backgroundPosition === 3 ? 0 : (this.backgroundPosition + 1);
        }
    }

    tearDown()
    {
        this.clear();
        window.removeEventListener('resize', this.initCanvas.bind(this), false);
    }
}
