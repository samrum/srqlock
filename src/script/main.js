import dayMusic from './../sounds/unitock.mp3'
import nightMusic from './../sounds/unitocknight.mp3'

var backgroundContext = document.getElementById("clockBackground").getContext("2d");
var timeContext = document.getElementById("clockTime").getContext("2d");
var canvasDimensions, animationSpeeds;
var clockPaused = false;
var audioPlaying = false;
var backgroundPosition = 0;

var musicTracks = initMusicTracks();

const timesOfDay = {
    morning: 0,
    afternoon: 1,
    evening: 2,
    night: 3
};

function initMusicTracks()
{
    var tracksObject = {};
    var musicTracks = [
        {
            name: 'day',
            filePath: dayMusic
        },
        {
            name: 'night',
            filePath: nightMusic
        }
    ];

    musicTracks.forEach(function(track) {
        tracksObject[track.name] = document.createElement('audio');
        tracksObject[track.name].src = track.filePath;
        tracksObject[track.name].preload = 'none';
        tracksObject[track.name].loop = true;
    });

    return tracksObject;
}

function initCanvas()
{
    var pixelRatio = window.devicePixelRatio || 1;
    var contexts = {
        background: backgroundContext,
        time: timeContext
    };

    canvasDimensions = {
        width: window.innerWidth,
        height: window.innerHeight
    };

    animationSpeeds = {
        x: (canvasDimensions.width / 60) * 2,
        y: (canvasDimensions.height / 60) * 2
    };

    Object.keys(contexts).forEach(function(contextType) {
        var canvas = contexts[contextType].canvas;

        canvas.width = canvasDimensions.width * pixelRatio;
        canvas.height = canvasDimensions.height * pixelRatio;
        canvas.style.width = canvasDimensions.width + "px";
        canvas.style.height = canvasDimensions.height + "px";
        contexts[contextType].scale(pixelRatio, pixelRatio);
    });
}

function initClock()
{
    initCanvas();
    updateScreen();
    setInterval(updateScreen, 1000);
}

function updateScreen()
{
    var date = new Date();
    var timeOfDay = getTimeOfDay(date.getHours());
    var displayProperties = getDisplayProperties(timeOfDay);

    updateMusic(timeOfDay);
    updateUIElements(displayProperties, date);

    if (!clockPaused)
    {
        if (timeOfDay === timesOfDay.night)
        {
            renderBackground(displayProperties.backgroundColor);
        }
        else
        {
            requestAnimationFrame(animateBackground.bind(this, displayProperties, getBackgroundStartingCoordinates()));
        }
    }
}

function renderBackground(color, coordinates)
{
    coordinates = coordinates || {x: 0, y: 0};

    backgroundContext.fillStyle = [0, 2].indexOf(backgroundPosition) >=0 ? color : '#fff';
    backgroundContext.fillRect(coordinates.x, coordinates.y, canvasDimensions.width, canvasDimensions.height);
}

function animateBackground(displayProperties, coordinates)
{
    var changingDimension = [0, 2].indexOf(backgroundPosition) >= 0 ? 'y' : 'x';
    var animationSpeed = animationSpeeds[changingDimension];
    var continueAnimation = true;

    renderBackground(displayProperties.backgroundColor, coordinates);

    switch (backgroundPosition)
    {
        case 0:
        case 3:
            coordinates[changingDimension] -= animationSpeed;

            if (coordinates[changingDimension] <= -animationSpeed)
            {
                backgroundPosition = backgroundPosition == 0 | 0;
                continueAnimation = false;
            }
            break;
        case 1:
        case 2:
            coordinates[changingDimension] += animationSpeed;

            if (coordinates[changingDimension] >= animationSpeed)
            {
                backgroundPosition++;
                continueAnimation = false;
            }
            break;
        default:
            return;
    }

    if (continueAnimation)
    {
        requestAnimationFrame(animateBackground.bind(this, displayProperties, coordinates));
    }
}

function getBackgroundStartingCoordinates()
{
    var coordinates = {
        x: 0,
        y: 0
    };

    if ([1, 3].indexOf(backgroundPosition) >= 0)
    {
        coordinates.x = canvasDimensions.width * (backgroundPosition === 1 ? -1: 1);
    }
    else if ([0, 2].indexOf(backgroundPosition) >= 0)
    {
        coordinates.y = canvasDimensions.height * (backgroundPosition === 0 ? 1 : -1)
    }

    return coordinates;
}

function updateUIElements(displayProperties, date)
{
    var timeFontSize = 95;
    var bylineFontSize = 45;
    var bylineSpacing = 60;

    document.getElementById('musicToggle').style.backgroundColor = displayProperties.backgroundColor;
    document.body.style.backgroundColor = displayProperties.backgroundColor;

    timeContext.clearRect(0, 0, canvasDimensions.width, canvasDimensions.height);
    timeContext.fillStyle = displayProperties.textColor;

    timeContext.font = "bold " + timeFontSize + "px Arial";
    timeContext.textAlign = "center";
    timeContext.fillText(getTimeDisplay(date), canvasDimensions.width/2, canvasDimensions.height/2);
    timeContext.font = bylineFontSize + "px Arial";
    timeContext.fillText("samrum", canvasDimensions.width/2, (canvasDimensions.height/2)+bylineSpacing);
}

function getTimeOfDay(hour)
{
    var timeOfDay = timesOfDay.evening;

    if (hour < 6 || hour > 22)
    {
        timeOfDay = timesOfDay.night;
    }
    else if (hour < 11)
    {
        timeOfDay = timesOfDay.morning;
    }
    else if (hour > 10 && hour < 18)
    {
        timeOfDay = timesOfDay.afternoon;
    }

    return timeOfDay;
}

function getTimeDisplay(date)
{
    var hour = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();

    if (hour === 0)
    {
        hour = 12;
    }
    else if (hour > 12)
    {
        hour = hour - 12;
    }

    if (min < 10)
    {
        min = "0" + min;
    }

    if (sec < 10)
    {
        sec = "0" + sec;
    }

    return hour + " " + min + " " + sec;
}

function getDisplayProperties(timeOfDay)
{
    var backgroundColor;
    var textColor;

    switch (timeOfDay)
    {
        case timesOfDay.morning:
            backgroundColor = "#568BDD";
            break;
        case timesOfDay.afternoon:
            backgroundColor = "#145ECF";
            break;
        case timesOfDay.evening:
            backgroundColor = "#285EB0";
            break;
        case timesOfDay.night:
            backgroundColor = "#0C387C";
            break;
        default:
            backgroundColor = "#145ECF";
    }

    if ([0, 2].indexOf(backgroundPosition) >= 0)
    {
        textColor = "#FFFFFF";
    }
    else
    {
        switch (timeOfDay)
        {
            case timesOfDay.afternoon:
                textColor = "#145ECF";
                break;
            case timesOfDay.evening:
                textColor = "#285EB8";
                break;
            default:
                textColor = "#568BDD";
        }
    }

    return {
        textColor: textColor,
        backgroundColor: backgroundColor
    }
}

document.getElementById('musicToggle').addEventListener('click', function(event) {
    Object.keys(musicTracks).forEach(function(track) {
        if (audioPlaying)
        {
            musicTracks[track].pause();
            musicTracks[track].currentTime = 0;
        }
        else
        {
            musicTracks[track].muted = true;
            musicTracks[track].play();
        }
    });

    audioPlaying = !audioPlaying
}, false);

function updateMusic(timeOfDay)
{
    if (audioPlaying)
    {
        if (timeOfDay === timesOfDay.night && musicTracks.night.readyState >= 3)
        {
            musicTracks.day.pause();

            if (musicTracks.night.muted)
            {
                musicTracks.night.currentTime = 0;
                musicTracks.night.muted = false;
            }

            musicTracks.night.play();
        }
        else if (musicTracks.day.readyState >= 3)
        {
            musicTracks.night.pause();

            if (musicTracks.day.muted)
            {
                musicTracks.day.currentTime = 0;
                musicTracks.day.muted = false;
            }

            musicTracks.day.play();
        }
    }
}

window.onblur = function()
{
    clockPaused = true;
};

window.onfocus = function()
{
    clockPaused = false;
};

window.onresize = initCanvas;

window.onload = initClock;

if (module.hot)
{
    module.hot.accept();
}