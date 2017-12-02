var backgroundContext = document.getElementById("clockBackground").getContext("2d");
var timeContext = document.getElementById("clockTime").getContext("2d");
var canvasDimensions;
initCanvas();

var clockPaused = false;
var audioPlaying = false;
var musicTracks = getMusicTracks();

var xPos = 0;
var yPos = canvasDimensions.height;
var animationPosition = 0;

function getMusicTracks()
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

    canvasDimensions = {
        width: window.innerWidth,
        height: window.innerHeight
    };

    backgroundContext.canvas.width  = canvasDimensions.width * pixelRatio;
    backgroundContext.canvas.height = canvasDimensions.height * pixelRatio;
    backgroundContext.canvas.style.width  = canvasDimensions.width + "px";
    backgroundContext.canvas.style.height = canvasDimensions.height + "px";
    backgroundContext.scale(pixelRatio, pixelRatio);

    timeContext.canvas.width  = canvasDimensions.width * pixelRatio;
    timeContext.canvas.height = canvasDimensions.height * pixelRatio;
    timeContext.canvas.style.width  = canvasDimensions.width + "px";
    timeContext.canvas.style.height = canvasDimensions.height + "px";
    timeContext.scale(pixelRatio, pixelRatio);
}

function runClock()
{
    setInterval(updateScreen,1000);
}

function updateScreen()
{
    var timeOfDay = 0;
    var date = new Date();
    var displayProperties;

    timeOfDay = getTimeOfDay(date.getHours());

    if (timeOfDay === 3)
    {
        animationPosition = 4;
        xPos = 0;
        yPos = 0;
    }

    updateMusic(timeOfDay);

    displayProperties = getDisplayProperties(timeOfDay, animationPosition);

    updateUIElements(displayProperties, date);

    function moveScreen()
    {
        var animationSpeed = 90;

        backgroundContext.clearRect(0, 0, canvasDimensions.width, canvasDimensions.height);

        backgroundContext.fillStyle = displayProperties.backgroundColor;
        backgroundContext.fillRect(xPos,yPos,canvasDimensions.width,canvasDimensions.height+animationSpeed);

        switch (animationPosition)
        {
            case 0:
                yPos -= animationSpeed;

                if (yPos <= -animationSpeed)
                {
                    xPos=0;
                    yPos=0;
                    animationPosition=1;
                    return;
                }
                break;
            case 1:
                xPos += animationSpeed;

                if (xPos > canvasDimensions.width+animationSpeed)
                {
                    xPos=0;
                    yPos=-canvasDimensions.height;
                    animationPosition=2;
                    return;
                }
                break;
            case 2:
                yPos += animationSpeed;

                if (yPos >= 0)
                {
                    xPos=0;
                    yPos=0;
                    animationPosition=3;
                    return;
                }
                break;
            case 3:
                xPos -= animationSpeed;

                if (xPos < -canvasDimensions.width-animationSpeed)
                {
                    xPos=0;
                    yPos=canvasDimensions.height;
                    animationPosition=0;
                    return;
                }
                break;
            default:
                return;
        }

        requestAnimationFrame(moveScreen);
    }
    if (!clockPaused)
    {
        requestAnimationFrame(moveScreen);
    }
}

function updateUIElements(displayProperties, date)
{
    var timeFontSize = 95;
    var bylineFontSize = 45;
    var bylineSpacing = 60;

    document.getElementById("music").style.backgroundColor = displayProperties.backgroundColor;
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

function getDisplayProperties(timeOfDay, animationPosition)
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

    if (animationPosition === 0 || animationPosition === 2 || animationPosition === 4)
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

function toggleMusic()
{
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
}

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

window.onload = runClock;