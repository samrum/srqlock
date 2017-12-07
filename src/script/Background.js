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
        this.featuredContent = document.getElementById('featuredContent');
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

    render(options)
    {
        if (options.hideFeaturedContent)
        {
            this.featuredContent.style.display = 'none';
        }

        if (options.showFeaturedContent)
        {
            this.featuredContent.style.display = 'flex';

            if (options.isNight)
            {
                this.hide();
            }
            else
            {
                this.renderAnimated(options.color);
            }
        }
        else if (options.isNight)
        {
            this.renderStatic(options.color);
        }
        else
        {
            this.renderAnimated(options.color);
        }
    }

    renderStatic(color)
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

    renderAnimated(backgroundColor)
    {
        this.renderStatic(backgroundColor);

        if (this.backgroundPosition === 0)
        {
            this.canvas.classList.remove('moveOutLeft');
            this.canvas.classList.add('moveInFromBottom');
        }
        else if (this.backgroundPosition === 1)
        {
            this.canvas.classList.remove('moveInFromBottom');
            this.canvas.classList.add('moveOutRight');
        }
        else if (this.backgroundPosition === 2)
        {
            this.canvas.classList.remove('moveOutRight');
            this.canvas.classList.add('moveInFromTop');
        }
        else
        {
            this.canvas.classList.remove('moveInFromTop');
            this.canvas.classList.add('moveOutLeft');
        }

        this.backgroundPosition = this.backgroundPosition === 3 ? 0 : (this.backgroundPosition + 1);
    }

    tearDown()
    {
        this.clear();
        window.removeEventListener('resize', this.initCanvas.bind(this), false);
    }
}
