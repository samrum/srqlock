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
    }

    init()
    {
        this.canvasContext = document.getElementById('clockBackground').getContext('2d');

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

    getBackgroundPosition()
    {
        return this.backgroundPosition;
    }

    renderStatic(color)
    {
        this.renderBackground(color, { x: 0, y: 0 });
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
        if (color === 'clear')
        {
            this.clearBackground(this.backgroundLocation);
        }
        else
        {
            this.canvasContext.fillStyle = [0, 2].indexOf(this.backgroundPosition) >= 0 ? color : '#fff';
            this.canvasContext.fillRect(
                coordinates.x,
                coordinates.y,
                this.canvasDimensions.width,
                this.canvasDimensions.height,
            );
        }
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
