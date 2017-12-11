export default class RenderElement
{
    constructor()
    {
        this.renderCount = 0;
    }

    init(renderElement)
    {
        this.element = renderElement;
    }

    hide()
    {
        this.element.style.display = 'none';
    }

    show()
    {
        this.element.style.display = 'block';
    }

    reset()
    {
        this.renderCount = 0;
        this.element.style.top = '100%';
        this.element.style.left = '0';
    }

    render()
    {
        this.renderCount = this.renderCount === 3 ? 0 : (this.renderCount + 1);
    }

    renderStatic()
    {
        this.element.style.left = '0';
        this.element.style.top = '0';
        this.show();
    }

    renderAnimated(options)
    {
        this.renderStatic(options);

        this.updateAnimationClass();
    }

    updateAnimationClass()
    {
        if (this.renderCount === 0)
        {
            this.element.classList.remove('moveOutLeft');
            this.element.classList.add('moveInFromBottom');
        }
        else if (this.renderCount === 1)
        {
            this.element.classList.remove('moveInFromBottom');
            this.element.classList.add('moveOutRight');
        }
        else if (this.renderCount === 2)
        {
            this.element.classList.remove('moveOutRight');
            this.element.classList.add('moveInFromTop');
        }
        else
        {
            this.element.classList.remove('moveInFromTop');
            this.element.classList.add('moveOutLeft');
        }
    }

    tearDown()
    {
        this.reset();
    }
}
