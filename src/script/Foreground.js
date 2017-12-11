import RenderElement from './RenderElement';

export default class Foreground extends RenderElement
{
    init(renderElement)
    {
        super.init(renderElement);

        this.clockHeadline = document.getElementById('clockHeadline');
        this.clockByline = document.getElementById('clockByline');
        this.clockByline.textContent = 'samrum';

        this.musicToggle = document.getElementById('musicToggle');
        this.musicToggle.style.display = 'block';
    }

    show()
    {
        this.element.style.display = 'flex';
    }

    render(options)
    {
        if (options.animateOut)
        {
            if (options.isNight)
            {
                this.hide();
            }
            else
            {
                this.renderAnimated(options);
            }
        }
        else if (options.animateIn && !options.isNight)
        {
            this.renderAnimated(options);
        }
        else
        {
            this.renderStatic(options);
        }

        super.render(options);
    }

    renderStatic(options)
    {
        const { backgroundColor, textColor } = options.displayProperties;

        this.clockHeadline.textContent = options.timeString;
        this.element.style.color = ([0, 2].indexOf(this.renderCount) >= 0 || options.isNight) ? '#fff' : textColor;
        this.musicToggle.style.backgroundColor = backgroundColor;

        super.renderStatic(options);
    }
}
