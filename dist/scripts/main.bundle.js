!function(e){function t(i){if(n[i])return n[i].exports;var o=n[i]={i:i,l:!1,exports:{}};return e[i].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,i){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:i})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=0)}([function(e,t,n){n(1),e.exports=n(4)},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}function o(){var e=window.devicePixelRatio||1,t={background:k,time:v};m={width:window.innerWidth,height:window.innerHeight},y={x:m.width/60*2,y:m.height/60*2},Object.keys(t).forEach(function(n){var i=t[n].canvas;i.width=m.width*e,i.height=m.height*e,i.style.width=m.width+"px",i.style.height=m.height+"px",t[n].scale(e,e)})}function r(){o(),a(),setInterval(a,1e3)}function a(){var e=new Date,t=f(e.getHours()),n=s(t);g(t),l(n,e),C||(t===B.night?u(n.backgroundColor):requestAnimationFrame(c.bind(this,n,d())))}function u(e,t){t=t||{x:0,y:0},k.fillStyle=[0,2].indexOf(F)>=0?e:"#fff",k.fillRect(t.x,t.y,m.width,m.height)}function c(e,t){var n=[0,2].indexOf(F)>=0?"y":"x",i=y[n],o=!0;switch(u(e.backgroundColor,t),F){case 0:case 3:t[n]-=i,t[n]<=-i&&(F=0==F|0,o=!1);break;case 1:case 2:t[n]+=i,t[n]>=i&&(F++,o=!1);break;default:return}o&&requestAnimationFrame(c.bind(this,e,t))}function d(){var e={x:0,y:0};return[1,3].indexOf(F)>=0?e.x=m.width*(1===F?-1:1):[0,2].indexOf(F)>=0&&(e.y=m.height*(0===F?1:-1)),e}function l(e,t){document.getElementById("musicToggle").style.backgroundColor=e.backgroundColor,document.body.style.backgroundColor=e.backgroundColor,v.clearRect(0,0,m.width,m.height),v.fillStyle=e.textColor,v.font="bold 95px Arial",v.textAlign="center",v.fillText(h(t),m.width/2,m.height/2),v.font="45px Arial",v.fillText("samrum",m.width/2,m.height/2+60)}function f(e){var t=B.evening;return e<6||e>22?t=B.night:e<11?t=B.morning:e>10&&e<18&&(t=B.afternoon),t}function h(e){var t=e.getHours(),n=e.getMinutes(),i=e.getSeconds();return 0===t?t=12:t>12&&(t-=12),n<10&&(n="0"+n),i<10&&(i="0"+i),t+" "+n+" "+i}function s(e){var t,n;switch(e){case B.morning:t="#568BDD";break;case B.afternoon:t="#145ECF";break;case B.evening:t="#285EB0";break;case B.night:t="#0C387C";break;default:t="#145ECF"}if([0,2].indexOf(F)>=0)n="#FFFFFF";else switch(e){case B.afternoon:n="#145ECF";break;case B.evening:n="#285EB8";break;default:n="#568BDD"}return{textColor:n,backgroundColor:t}}function g(e){E&&(e===B.night&&O.night.readyState>=3?(O.day.pause(),O.night.muted&&(O.night.currentTime=0,O.night.muted=!1),O.night.play()):O.day.readyState>=3&&(O.night.pause(),O.day.muted&&(O.day.currentTime=0,O.day.muted=!1),O.day.play()))}var m,y,x=n(2),w=i(x),p=n(3),b=i(p),k=document.getElementById("clockBackground").getContext("2d"),v=document.getElementById("clockTime").getContext("2d"),C=!1,E=!1,F=0,O=function(){var e={};return[{name:"day",filePath:w.default},{name:"night",filePath:b.default}].forEach(function(t){e[t.name]=document.createElement("audio"),e[t.name].src=t.filePath,e[t.name].preload="none",e[t.name].loop=!0}),e}(),B={morning:0,afternoon:1,evening:2,night:3};document.getElementById("musicToggle").addEventListener("click",function(e){Object.keys(O).forEach(function(e){E?(O[e].pause(),O[e].currentTime=0):(O[e].muted=!0,O[e].play())}),E=!E},!1),window.onblur=function(){C=!0},window.onfocus=function(){C=!1},window.onresize=o,window.onload=r},function(e,t,n){e.exports=n.p+"sounds/unitock.mp3"},function(e,t,n){e.exports=n.p+"sounds/unitocknight.mp3"},function(e,t){}]);
//# sourceMappingURL=main.bundle.js.map