export default class Background
{
    constructor()
    {
        this.backgroundPosition = 0;
    }

    init()
    {
        this.background = document.getElementById('clockBackground');
        this.featuredContent = document.getElementById('featuredContent');
    }

    hide()
    {
        this.background.style.display = 'none';
    }

    show()
    {
        this.background.style.display = 'block';
    }

    reset()
    {
        this.background.style.top = '100%';
        this.background.style.left = '0';
        this.featuredContent.style.display = 'none';
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
        this.background.style.left = '0';
        this.background.style.top = '0';
        this.background.style.backgroundColor = color;
        this.show();
    }

    renderAnimated(backgroundColor)
    {
        this.renderStatic(backgroundColor);

        if (this.backgroundPosition === 0)
        {
            this.background.classList.remove('moveOutLeft');
            this.background.classList.add('moveInFromBottom');
        }
        else if (this.backgroundPosition === 1)
        {
            this.background.classList.remove('moveInFromBottom');
            this.background.classList.add('moveOutRight');
        }
        else if (this.backgroundPosition === 2)
        {
            this.background.classList.remove('moveOutRight');
            this.background.classList.add('moveInFromTop');
        }
        else
        {
            this.background.classList.remove('moveInFromTop');
            this.background.classList.add('moveOutLeft');
        }

        this.backgroundPosition = this.backgroundPosition === 3 ? 0 : (this.backgroundPosition + 1);
    }

    tearDown()
    {
        this.reset();
    }
}
