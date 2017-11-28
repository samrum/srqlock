var canvas = document.getElementById("clock");
var ctx = canvas.getContext("2d");
var canvasDimensions;
initCanvas();

var clockPaused = false;
var audioPlaying = false;
var musicTracks = getMusicTracks();

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

    ctx.canvas.width  = canvasDimensions.width * pixelRatio;
    ctx.canvas.height = canvasDimensions.height * pixelRatio;
    ctx.canvas.style.width  = canvasDimensions.width + "px";
    ctx.canvas.style.height = canvasDimensions.height + "px";
    ctx.scale(pixelRatio, pixelRatio);
}

function runClock()
{
    setInterval(updateScreen,1000);
}

function updateScreen()
{
    var timeOfDay = 0;
    var xPos = 0;
    var yPos = canvasDimensions.height;
    var animationPosition = 0;
    var date, hr, min, sec;
    var timeDisplay;
    var animationSpeed = 90;
    var timeFontSize = 95;
    var bylineFontSize = 45;
    var bylineSpacing = 60;
    var displayProperties;

    date = new Date();
    hr = date.getHours();
    min = date.getMinutes();
    sec = date.getSeconds();

    if (hr < 6 || hr > 22)
    {
        timeOfDay = 3;
        animationPosition = 4;
        xPos=0;
        yPos=0;
    }
    else if (hr < 11)
    {
        timeOfDay = 0;
    }
    else if (hr > 10 && hr < 18)
    {
        timeOfDay = 1;
    }
    else
    {
        timeOfDay = 2;
    }

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

    displayProperties = getDisplayProperties(timeOfDay, animationPosition);

    document.getElementById("music").style.backgroundColor = displayProperties.backgroundColor;
    document.body.style.backgroundColor = displayProperties.backgroundColor;

    timeDisplay = getTimeDisplay(hr, min, sec);

    function moveScreen()
    {
        ctx.clearRect(0, 0, canvasDimensions.width, canvasDimensions.height);

        ctx.fillStyle = displayProperties.backgroundColor;
        ctx.fillRect(xPos,yPos,canvasDimensions.width,canvasDimensions.height+animationSpeed);

        ctx.fillStyle = displayProperties.textColor;

        ctx.font = "bold " + timeFontSize + "px Arial";
        ctx.textAlign = "center";
        ctx.fillText(timeDisplay, canvasDimensions.width/2, canvasDimensions.height/2);
        ctx.font = bylineFontSize + "px Arial";
        ctx.fillText("samrum", canvasDimensions.width/2, (canvasDimensions.height/2)+bylineSpacing);

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
            case 4:
                if (hr > 5 && (hr!==11 && hr!==12))
                {
                    animationPosition=1;
                }
                return;
                break;
            default:
                animationPosition=0;
        }

        requestAnimationFrame(moveScreen);
    }
    if (!clockPaused)
    {
        requestAnimationFrame(moveScreen);
    }
}

function getTimeDisplay(hr, min, sec)
{
    if (hr === 0)
    {
        hr = 12;
    }
    else if (hr > 12)
    {
        hr = hr - 12;
    }

    if (min < 10)
    {
        min = "0" + min;
    }

    if (sec < 10)
    {
        sec = "0" + sec;
    }

    return hr + " " + min + " " + sec;
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