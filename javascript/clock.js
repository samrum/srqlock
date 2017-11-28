var pixelRatio = getPixelRatio();
var c = document.getElementById("clock");
var ctx = c.getContext("2d");
ctx.canvas.width  = window.innerWidth * pixelRatio;
ctx.canvas.height = window.innerHeight * pixelRatio;
ctx.canvas.style.width  = window.innerWidth + "px";
ctx.canvas.style.height = window.innerHeight + "px";

var animationPos=0;
var xPos=0;
var yPos=ctx.canvas.height;

var date, hr, min, sec, time;
var timeOfDay = 0;
var clockPaused;
var animationId;
var animationSpeed = 100 * pixelRatio;
var timeFontSize = 95 * pixelRatio;
var bylineFontSize = 45 * pixelRatio;
var bylineSpacing = 60 * pixelRatio;
var audioPlaying = false;
var musicInitialized = false;
var dayMusic;
var nightMusic;

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
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

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

        ctx.fillRect(xPos,yPos,ctx.canvas.width,ctx.canvas.height+animationSpeed);

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
        ctx.fillText(time, ctx.canvas.width/2, ctx.canvas.height/2);
        ctx.font = bylineFontSize + "px Arial";
        ctx.fillText("samrum", ctx.canvas.width/2, (ctx.canvas.height/2)+bylineSpacing);

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

                if (xPos > ctx.canvas.width+animationSpeed)
                {
                    xPos=0;
                    yPos=-ctx.canvas.height;
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

                if (xPos < -ctx.canvas.width-animationSpeed)
                {
                    xPos=0;
                    yPos=ctx.canvas.height;
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

function getPixelRatio()
{
    if (window.devicePixelRatio > 1 && !isMobile())
    {
        var ctest = document.createElement("canvas").getContext("2d"),
            dpr = window.devicePixelRatio || 1,
            bsr = ctest.webkitBackingStorePixelRatio ||
                  ctest.mozBackingStorePixelRatio ||
                  ctest.msBackingStorePixelRatio ||
                  ctest.oBackingStorePixelRatio ||
                  ctest.backingStorePixelRatio || 1;
        return dpr / bsr;
    }
    else
    {
        return 1;
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

window.onresize = function()
{
    ctx.canvas.width  = window.innerWidth * pixelRatio;
    ctx.canvas.height = window.innerHeight * pixelRatio;
    ctx.canvas.style.width  = window.innerWidth + "px";
    ctx.canvas.style.height = window.innerHeight + "px";
};

window.onload = runClock();
