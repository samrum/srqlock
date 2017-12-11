import RenderElement from './RenderElement';

export default class Background extends RenderElement
{
    init(renderElement)
    {
        super.init(renderElement);
        this.featuredContent = document.getElementById('featuredContent');
    }

    reset()
    {
        this.featuredContent.style.display = 'none';
        super.reset();
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
                this.renderAnimated(options);
            }
        }
        else if (options.isNight)
        {
            this.renderStatic(options);
        }
        else
        {
            this.renderAnimated(options);
        }

        super.render(options);
    }

    renderStatic(options)
    {
        this.element.style.backgroundColor = options.displayProperties.backgroundColor;
        super.renderStatic(options);
    }
}
