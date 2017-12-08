export default class Foreground
{
    init()
    {
        this.foreground = document.getElementById('clockTime');
        this.clockHeadline = document.getElementById('clockHeadline');

        this.clockByline = document.getElementById('clockByline');
        this.clockByline.textContent = 'samrum';

        this.musicToggle = document.getElementById('musicToggle');
        this.musicToggle.style.display = 'block';
    }

    hide()
    {
        this.foreground.style.display = 'none';
    }

    show()
    {
        this.foreground.style.display = 'flex';
    }

    reset()
    {
        this.foreground.style.top = '100%';
        this.foreground.style.left = '0';
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

    renderAnimated(inwards, displayProps, timeString, backgroundPosition)
    {
        this.renderStatic(displayProps, timeString, !inwards);

        if (backgroundPosition === 0)
        {
            this.foreground.classList.remove('moveOutLeft');
            this.foreground.classList.add('moveInFromBottom');
        }
        else if (backgroundPosition === 1)
        {
            this.foreground.classList.remove('moveInFromBottom');
            this.foreground.classList.add('moveOutRight');
        }
        else if (backgroundPosition === 2)
        {
            this.foreground.classList.remove('moveOutRight');
            this.foreground.classList.add('moveInFromTop');
        }
        else
        {
            this.foreground.classList.remove('moveInFromTop');
            this.foreground.classList.add('moveOutLeft');
        }
    }

    renderStatic(displayProps, timeString, keepFillStyle)
    {
        const { backgroundColor, textColor } = displayProps;

        this.foreground.style.left = '0';
        this.foreground.style.top = '0';

        this.clockHeadline.textContent = timeString;
        this.musicToggle.style.backgroundColor = backgroundColor;

        if (!keepFillStyle)
        {
            this.foreground.style.color = textColor;
        }

        this.show();
    }

    tearDown()
    {
        this.reset();
    }
}
