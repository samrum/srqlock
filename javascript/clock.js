var backgroundContext = document.getElementById("clockBackground").getContext("2d");
var timeContext = document.getElementById("clockTime").getContext("2d");
var canvasDimensions;
var clockPaused = false;
var audioPlaying = false;
var backgroundPosition = 0;

var musicTracks = initMusicTracks();

function initMusicTracks()
{
    var tracksObject = {};
    var musicTracks = [
        {
            name: 'day',
            filePath: 'sounds/unitock.mp3'
        },
        {
            name: 'night',
            filePath: 'sounds/unitocknight.mp3'
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
    var timeOfDay = 0;
    var date = new Date();
    var displayProperties;

    timeOfDay = getTimeOfDay(date.getHours());

    updateMusic(timeOfDay);

    displayProperties = getDisplayProperties(timeOfDay);

    updateUIElements(displayProperties, date);

    if (!clockPaused)
    {
        if (timeOfDay === 3)
        {
            renderBackground(displayProperties.backgroundColor);
        }
        else
        {
            requestAnimationFrame(animateBackground.bind(this, displayProperties, null));
        }
    }
}

function renderBackground(color, coordinates, animationOffset)
{
    coordinates = coordinates || {x: 0, y: 0};
    animationOffset = animationOffset || 0;

    backgroundContext.clearRect(0, 0, canvasDimensions.width, canvasDimensions.height);

    backgroundContext.fillStyle = color;
    backgroundContext.fillRect(coordinates.x, coordinates.y, canvasDimensions.width, canvasDimensions.height + animationOffset);
}

function animateBackground(displayProperties, coordinates)
{
    var animationSpeed = 90;
    var initialBackgroundPosition = backgroundPosition;
    coordinates = coordinates || getBackgroundStartingCoordinates();

    renderBackground(displayProperties.backgroundColor, coordinates, animationSpeed);

    switch (backgroundPosition)
    {
        case 0:
            coordinates.y -= animationSpeed;

            if (coordinates.y <= -animationSpeed)
            {
                backgroundPosition=1;
            }
            break;
        case 1:
            coordinates.x += animationSpeed;

            if (coordinates.x > canvasDimensions.width+animationSpeed)
            {
                backgroundPosition=2;
            }
            break;
        case 2:
            coordinates.y += animationSpeed;

            if (coordinates.y >= 0)
            {
                backgroundPosition=3;
            }
            break;
        case 3:
            coordinates.x -= animationSpeed;

            if (coordinates.x < -canvasDimensions.width-animationSpeed)
            {
                backgroundPosition=0;
            }
            break;
        default:
            return;
    }

    if (initialBackgroundPosition === backgroundPosition)
    {
        requestAnimationFrame(animateBackground.bind(this, displayProperties, coordinates));
    }
}

function getBackgroundStartingCoordinates()
{
    var coordinates;

    if ([0, 2].indexOf(backgroundPosition) >= 0)
    {
        coordinates = {
            x: 0,
            y: canvasDimensions.height * (backgroundPosition > 0 ? -1 : 1)
        }
    }
    else if ([1, 3].indexOf(backgroundPosition) >= 0)
    {
        coordinates = {
            x: 0,
            y: 0
        }
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
    var timeOfDay = 2;

    if (hour < 6 || hour > 22)
    {
        timeOfDay = 3;
    }
    else if (hour < 11)
    {
        timeOfDay = 0;
    }
    else if (hour > 10 && hour < 18)
    {
        timeOfDay = 1;
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
        case 0:
            backgroundColor = "#568BDD";
            break;
        case 1:
            backgroundColor = "#145ECF";
            break;
        case 2:
            backgroundColor = "#285EB0";
            break;
        case 3:
            backgroundColor = "#0C387C";
            break;
        default:
            backgroundColor = "#145ECF";
    }

    if (backgroundPosition === 0 || backgroundPosition === 2 || backgroundPosition === 4)
    {
        textColor = "#FFFFFF";
    }
    else
    {
        switch (timeOfDay)
        {
            case 1:
                textColor = "#145ECF";
                break;
            case 2:
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
        if (timeOfDay === 3 && musicTracks.night.readyState >= 3)
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