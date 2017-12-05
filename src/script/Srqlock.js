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
        this.clockTime = 5;
        this.contentTime = 6;
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
            this.transitionsPaused = (this.transitionsDone === this.clockTime);

            this.foreground.render({
                isNight,
                displayProperties,
                hide: this.transitionsPaused,
                show: this.transitionsDone === 0,
                timeString: getFormattedTime(date),
                backgroundPosition: this.background.getBackgroundPosition(),
            });

            this.background.render({
                isNight,
                showFeaturedContent: this.transitionsPaused,
                hideFeaturedContent: this.transitionsDone === 1,
                color: displayProperties.backgroundColor,
            });
        }

        this.transitionsDone = this.transitionsDone + 1;
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
