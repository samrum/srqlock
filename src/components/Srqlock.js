import MusicManager from "./MusicManager";
import Background from "./Background";
import Foreground from "./Foreground";
import { timesOfDay, getTimeOfDay, getFormattedTime } from "./TimeHelper";

export default class Srqlock {
  constructor() {
    this.transitionsPaused = false;
    this.transitionsDone = 0;
    this.clockTime = 5;
    this.featuredTime = 6;
    this.musicManager = new MusicManager();
    this.background = new Background();
    this.foreground = new Foreground();
    this.updateIntervalId = null;
  }

  init() {
    this.musicManager.init();
    this.background.init(document.getElementById("clockBackground"));
    this.foreground.init(document.getElementById("clockTime"));

    this.updateScreen();
    this.updateIntervalId = setInterval(this.updateScreen.bind(this), 1000);
  }

  updateScreen() {
    const date = new Date();
    // const date = new Date('November 1, 2017 13:13:13');
    const timeOfDay = getTimeOfDay(date);
    const isNight = timeOfDay === timesOfDay.night;

    this.musicManager.triggerMusic(isNight);

    if (this.transitionsDone === this.clockTime + this.featuredTime) {
      this.transitionsDone = 0;
      this.transitionsPaused = false;
    }

    if (!this.transitionsPaused) {
      this.transitionsPaused = this.transitionsDone === this.clockTime;

      const displayProperties = this.getDisplayProperties(timeOfDay);

      this.foreground.render({
        isNight,
        displayProperties,
        animateOut: this.transitionsPaused,
        animateIn: this.transitionsDone === 0,
        timeString: getFormattedTime(date),
      });

      this.background.render({
        isNight,
        displayProperties,
        showFeaturedContent: this.transitionsPaused,
        hideFeaturedContent: this.transitionsDone === 1,
      });
    }

    this.transitionsDone = this.transitionsDone + 1;
  }

  getDisplayProperties(timeOfDay) {
    let backgroundColor;

    switch (timeOfDay) {
      case timesOfDay.morning:
        backgroundColor = "#568bdd";
        break;
      case timesOfDay.afternoon:
        backgroundColor = "#145ecf";
        break;
      case timesOfDay.evening:
        backgroundColor = "#285eb0";
        break;
      case timesOfDay.night:
        backgroundColor = "#0c387c";
        break;
      default:
        backgroundColor = "#145ecf";
    }

    return {
      textColor: this.transitionsPaused ? "#fff" : backgroundColor,
      backgroundColor,
    };
  }
}
