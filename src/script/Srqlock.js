import MusicManager from './MusicManager';
import Background from './Background';
import Foreground from './Foreground';
import { timesOfDay, getTimeOfDay, getFormattedTime } from './TimeHelper';

export default class Srqlock
{
    constructor()
    {
        this.transitionsPaused = false;
        this.transitionsDone = 0;
        this.clockTime = 4;
        this.contentTime = 5;
        this.musicManager = new MusicManager();
        this.background = new Background();
        this.foreground = new Foreground();
        this.updateIntervalId = null;
    }

    init()
    {
        this.musicManager.init();
        this.background.init();
        this.foreground.init();

        this.updateScreen();
        this.updateIntervalId = setInterval(this.updateScreen.bind(this), 1000);
    }

    updateScreen()
    {
        const date = new Date();
        // const date = new Date('November 1, 2017 13:13:13');
        const timeOfDay = getTimeOfDay(date);
        const displayProperties = this.getDisplayProperties(timeOfDay);
        const isNight = (timeOfDay === timesOfDay.night);

        this.musicManager.triggerMusic(isNight);

        if (this.transitionsDone === (this.clockTime + this.contentTime))
        {
            this.transitionsDone = 0;
            this.transitionsPaused = false;
        }

        if (!this.transitionsPaused)
        {
            this.renderForeground(isNight, displayProperties, date);

            if (this.transitionsDone === this.clockTime)
            {
                this.transitionsPaused = true;
                displayProperties.backgroundColor = 'clear';
            }

            if (isNight)
            {
                this.background.renderStatic(displayProperties.backgroundColor);
            }
            else
            {
                this.background.renderAnimated(displayProperties.backgroundColor);
            }
        }

        this.transitionsDone = this.transitionsDone + 1;
    }

    renderForeground(isNight, displayProperties, date)
    {
        const formattedTime = getFormattedTime(date);

        if (this.transitionsDone === this.clockTime)
        {
            if (isNight)
            {
                this.foreground.clear();
            }
            else
            {
                this.foreground.renderAnimated(false, displayProperties, formattedTime, this.background.getBackgroundPosition());
            }
        }
        else if (this.transitionsDone === 0 && !isNight)
        {
            this.foreground.renderAnimated(true, displayProperties, formattedTime, this.background.getBackgroundPosition());
        }
        else
        {
            this.foreground.render(displayProperties, formattedTime, false);
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

    tearDown()
    {
        clearInterval(this.updateIntervalId);
        this.background.tearDown();
        this.foreground.tearDown();
        this.musicManager.tearDown();
    }
}
