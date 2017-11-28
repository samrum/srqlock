var pixelRatio = window.devicePixelRatio || 1;
var canvas = document.getElementById("clock");
var ctx = canvas.getContext("2d");
var canvasDimensions;
initCanvas();

var animationPos=0;
var xPos=0;
var yPos=canvasDimensions.height;

var date, hr, min, sec, time;
var timeOfDay = 0;
var clockPaused;
var animationId;
var animationSpeed = 90;
var timeFontSize = 95;
var bylineFontSize = 45;
var bylineSpacing = 60;
var audioPlaying = false;
var musicInitialized = false;
var dayMusic;
var nightMusic;

function initCanvas()
{
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
    if (audioPlaying && timeOfDay!==3)
    {
        nightMusic.pause();
        dayMusic.play();
    }
    else if (audioPlaying && timeOfDay===3)
    {
        dayMusic.pause();
        nightMusic.play();
    }

    date = new Date();
    hr = date.getHours();
    min = date.getMinutes();
    sec = date.getSeconds();

    if (hr < 6 || hr > 22)
    {
        timeOfDay = 3;
        animationPos = 4;
        xPos=0;
        yPos=0;
        document.getElementById("music").style.backgroundColor = "#0C387C";
    }
    else if (hr < 11)
    {
        timeOfDay = 0;
        document.getElementById("music").style.backgroundColor = "#568BDD";
    }
    else if (hr > 10 && hr < 18)
    {
        timeOfDay = 1;
        document.getElementById("music").style.backgroundColor = "#145ECF";
    }
    else
    {
        timeOfDay = 2;
        document.getElementById("music").style.backgroundColor = "#285EB0";
    }

    if (hr===0)
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

    time = hr + " " + min + " " + sec;

    function moveScreen()
    {
        ctx.clearRect(0, 0, canvasDimensions.width, canvasDimensions.height);

        switch (timeOfDay)
        {
            case 0:
                ctx.fillStyle = "#568BDD";
                break;
            case 1:
                ctx.fillStyle = "#145ECF";
                break;
            case 2:
                ctx.fillStyle = "#285EB0";
                break;
            case 3:
                ctx.fillStyle = "#0C387C";
                break;
            default:
                ctx.fillStyle = "#145ECF";
        }

        ctx.fillRect(xPos,yPos,canvasDimensions.width,canvasDimensions.height+animationSpeed);

        if (animationPos===0||animationPos===2||animationPos===4)
        {
            ctx.fillStyle = "#FFFFFF";
        }
        else
        {
            switch (timeOfDay)
            {
                case 1:
                    ctx.fillStyle = "#145ECF";
                    break;
                case 2:
                    ctx.fillStyle = "#285EB8";
                    break;
                default:
                    ctx.fillStyle = "#568BDD";
            }
        }

        ctx.font = "bold " + timeFontSize + "px Arial";
        ctx.textAlign = "center";
        ctx.fillText(time, canvasDimensions.width/2, canvasDimensions.height/2);
        ctx.font = bylineFontSize + "px Arial";
        ctx.fillText("samrum", canvasDimensions.width/2, (canvasDimensions.height/2)+bylineSpacing);

        switch (animationPos)
        {
            case 0:
                yPos -= animationSpeed;

                if (yPos <= -animationSpeed)
                {
                    xPos=0;
                    yPos=0;
                    animationPos=1;
                    return;
                }
                break;
            case 1:
                xPos += animationSpeed;

                if (xPos > canvasDimensions.width+animationSpeed)
                {
                    xPos=0;
                    yPos=-canvasDimensions.height;
                    animationPos=2;
                    return;
                }
                break;
            case 2:
                yPos += animationSpeed;

                if (yPos >= 0)
                {
                    xPos=0;
                    yPos=0;
                    animationPos=3;
                    return;
                }
                break;
            case 3:
                xPos -= animationSpeed;

                if (xPos < -canvasDimensions.width-animationSpeed)
                {
                    xPos=0;
                    yPos=canvasDimensions.height;
                    animationPos=0;
                    return;
                }
                break;
            case 4:
                if (hr > 5 && (hr!==11 && hr!==12))
                {
                    animationPos=1;
                }
                return;
                break;
            default:
                animationPos=0;
        }

        requestAnimationFrame(moveScreen);
    }
    if (!clockPaused)
    {
        requestAnimationFrame(moveScreen);
    }
}

function toggleMusic()
{
    if (!musicInitialized)
    {
        dayMusic = new Audio("sounds/unitock.mp3");
        nightMusic = new Audio("sounds/unitocknight.mp3");
        dayMusic.loop = true;
        nightMusic.loop = true;
        musicInitialized = true;
    }

    if (audioPlaying)
    {
        if (timeOfDay!==3)
        {
            dayMusic.pause();
            dayMusic.currentTime = 0;
            audioPlaying=false;
        }
        else
        {
            nightMusic.pause();
            nightMusic.currentTime = 0;
            audioPlaying=false;
        }
    }
    else
    {
        if (isMobile())
        {
            if (timeOfDay!==3)
            {
                dayMusic.play();
                dayMusic.pause();
                dayMusic.currentTime = 0;
            }
            else
            {
                nightMusic.play();
                nightMusic.pause();
                nightMusic.currentTime = 0;
            }
        }
        audioPlaying=true;
    }
}

function isMobile()
{
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
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