import MusicManager from './MusicManager';
import Background from './Background';
import Foreground from './Foreground';
import { timesOfDay, getTimeOfDay, getFormattedTime } from './TimeHelper';

export default class Srqlock
{
    constructor()
    {
        this.clockPaused = false;
        this.musicManager = new MusicManager();
        this.background = new Background();
        this.foreground = new Foreground();
    }

    init()
    {
        document.addEventListener('blur', () =>
        {
            this.clockPaused = true;
        }, false);

        document.addEventListener('focus', () =>
        {
            this.clockPaused = false;
        }, false);

        this.musicManager.init();
        this.background.init();
        this.foreground.init();

        this.updateScreen();
        setInterval(this.updateScreen.bind(this), 1000);
    }

    updateScreen()
    {
        const date = new Date();
        // const date = new Date('November 1, 2017 13:13:13');
        const timeOfDay = getTimeOfDay(date);
        const displayProperties = this.getDisplayProperties(timeOfDay);
        const isNight = (timeOfDay === timesOfDay.night);

        this.musicManager.triggerMusic(isNight);
        this.foreground.render(displayProperties, getFormattedTime(date));

        if (!this.clockPaused)
        {
            if (isNight)
            {
                this.background.renderStatic(displayProperties.backgroundColor);
            }
            else
            {
                this.background.renderAnimated(displayProperties.backgroundColor);
            }
        }
    }

    getDisplayProperties(timeOfDay)
    {
        let backgroundColor;
        let textColor;

        switch (timeOfDay)
        {
            case timesOfDay.morning:
                backgroundColor = '#568BDD';
                break;
            case timesOfDay.afternoon:
                backgroundColor = '#145ECF';
                break;
            case timesOfDay.evening:
                backgroundColor = '#285EB0';
                break;
            case timesOfDay.night:
                backgroundColor = '#0C387C';
                break;
            default:
                backgroundColor = '#145ECF';
        }

        if ([0, 2].indexOf(this.background.getBackgroundPosition()) >= 0)
        {
            textColor = '#FFFFFF';
        }
        else
        {
            switch (timeOfDay)
            {
                case timesOfDay.afternoon:
                    textColor = '#145ECF';
                    break;
                case timesOfDay.evening:
                    textColor = '#285EB8';
                    break;
                default:
                    textColor = '#568BDD';
            }
        }

        return {
            textColor,
            backgroundColor,
        };
    }
}
