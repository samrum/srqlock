export default class Background
{
    constructor()
    {
        this.canvasContext = null;
        this.canvasDimensions = null;
        this.animationSpeeds = null;
        this.backgroundLocation = {
            x: 0,
            y: 0,
        };
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

        this.animationSpeeds = {
            x: (this.canvasDimensions.width / 60) * 3.5,
            y: (this.canvasDimensions.height / 60) * 3.5,
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

    getBackgroundPosition()
    {
        return this.backgroundPosition;
    }

    renderStatic(color)
    {
        this.canvas.style.left = '0';
        this.canvas.style.top = '0';

        // this.renderBackground(color, { x: 0, y: 0 });
        this.canvasContext.fillStyle = color;
        this.canvasContext.fillRect(
            0,
            0,
            this.canvasDimensions.width,
            this.canvasDimensions.height,
        );
    }

    clearBackground(coordinates)
    {
        this.canvasContext.clearRect(
            coordinates.x,
            coordinates.y,
            this.canvasDimensions.width,
            this.canvasDimensions.height,
        );
    }

    renderBackground(color, coordinates)
    {
        this.show();
        this.canvasContext.fillStyle = [0, 2].indexOf(this.backgroundPosition) >= 0 ? color : '#fff';
        this.canvasContext.fillRect(
            coordinates.x,
            coordinates.y,
            this.canvasDimensions.width,
            this.canvasDimensions.height,
        );
    }

    updateBackgroundLocation()
    {
        if ([1, 3].indexOf(this.backgroundPosition) >= 0)
        {
            this.backgroundLocation = {
                x: this.canvasDimensions.width * (this.backgroundPosition === 1 ? -1 : 1),
                y: 0,
            };
        }
        else
        {
            this.backgroundLocation = {
                x: 0,
                y: this.canvasDimensions.height * (this.backgroundPosition === 0 ? 1 : -1),
            };
        }
    }

    renderAnimated(backgroundColor)
    {
        this.updateBackgroundLocation();

        requestAnimationFrame(this.animateBackground.bind(this, backgroundColor));
    }

    animateBackground(backgroundColor)
    {
        const changingDimension = [0, 2].indexOf(this.backgroundPosition) >= 0 ? 'y' : 'x';
        const animationSpeed = this.animationSpeeds[changingDimension];
        let continueAnimation = true;

        this.renderBackground(backgroundColor, this.backgroundLocation);

        if ([0, 3].indexOf(this.backgroundPosition) >= 0)
        {
            this.backgroundLocation[changingDimension] -= animationSpeed;

            if (this.backgroundLocation[changingDimension] <= -animationSpeed)
            {
                this.backgroundPosition = this.backgroundPosition === 0 ? 1 : 0;
                continueAnimation = false;
            }
        }
        else
        {
            this.backgroundLocation[changingDimension] += animationSpeed;

            if (this.backgroundLocation[changingDimension] >= animationSpeed)
            {
                this.backgroundPosition = this.backgroundPosition + 1;
                continueAnimation = false;
            }
        }

        if (continueAnimation)
        {
            requestAnimationFrame(this.animateBackground.bind(this, backgroundColor));
        }
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

    renderDisplay(show, backgroundColor)
    {
        this.canvasPositionOffset = show ? 100 : 0;
        this.renderStatic(backgroundColor);

        requestAnimationFrame(this.animateDisplay.bind(this, show));
    }

    animateDisplay(show)
    {
        this.updateCanvasPosition(show);
        this.canvasPositionOffset = this.canvasPositionOffset - (show ? 5 : -5);

        if (this.canvasPositionOffset >= 0 && this.canvasPositionOffset <= 100)
        {
            requestAnimationFrame(this.animateDisplay.bind(this, show));
        }
        else
        {
            this.backgroundPosition = this.backgroundPosition === 3 ? 0 : (this.backgroundPosition + 1);
        }
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
