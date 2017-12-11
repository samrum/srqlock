!function(t){function e(i){if(n[i])return n[i].exports;var r=n[i]={i:i,l:!1,exports:{}};return t[i].call(r.exports,r,r.exports,e),r.l=!0,r.exports}var n={};e.m=t,e.c=n,e.d=function(t,n,i){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:i})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=1)}([function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),r=function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.renderCount=0}return i(t,[{key:"init",value:function(t){this.element=t}},{key:"hide",value:function(){this.element.style.display="none"}},{key:"show",value:function(){this.element.style.display="block"}},{key:"reset",value:function(){this.renderCount=0,this.element.style.top="100%",this.element.style.left="0"}},{key:"render",value:function(){this.renderCount=3===this.renderCount?0:this.renderCount+1}},{key:"renderStatic",value:function(){this.element.style.left="0",this.element.style.top="0",this.show()}},{key:"renderAnimated",value:function(t){this.renderStatic(t),this.updateAnimationClass()}},{key:"updateAnimationClass",value:function(){0===this.renderCount?(this.element.classList.remove("moveOutLeft"),this.element.classList.add("moveInFromBottom")):1===this.renderCount?(this.element.classList.remove("moveInFromBottom"),this.element.classList.add("moveOutRight")):2===this.renderCount?(this.element.classList.remove("moveOutRight"),this.element.classList.add("moveInFromTop")):(this.element.classList.remove("moveInFromTop"),this.element.classList.add("moveOutLeft"))}},{key:"tearDown",value:function(){this.reset()}}]),t}();e.default=r},function(t,e,n){n(2),t.exports=n(10)},function(t,e,n){"use strict";var i=function(t){return t&&t.__esModule?t:{default:t}}(n(3)),r=new i.default;document.addEventListener("DOMContentLoaded",r.init.bind(r),!1)},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var r=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),o=i(n(4)),a=i(n(7)),s=i(n(8)),u=n(9),c=function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.transitionsPaused=!1,this.transitionsDone=0,this.clockTime=5,this.featuredTime=6,this.musicManager=new o.default,this.background=new a.default,this.foreground=new s.default,this.updateIntervalId=null}return r(t,[{key:"init",value:function(){this.musicManager.init(),this.background.init(document.getElementById("clockBackground")),this.foreground.init(document.getElementById("clockTime")),this.updateScreen(),this.updateIntervalId=setInterval(this.updateScreen.bind(this),1e3)}},{key:"updateScreen",value:function(){var t=new Date,e=(0,u.getTimeOfDay)(t),n=e===u.timesOfDay.night;if(this.musicManager.triggerMusic(n),this.transitionsDone===this.clockTime+this.featuredTime&&(this.transitionsDone=0,this.transitionsPaused=!1),!this.transitionsPaused){this.transitionsPaused=this.transitionsDone===this.clockTime;var i=this.getDisplayProperties(e);this.foreground.render({isNight:n,displayProperties:i,animateOut:this.transitionsPaused,animateIn:0===this.transitionsDone,timeString:(0,u.getFormattedTime)(t)}),this.background.render({isNight:n,displayProperties:i,showFeaturedContent:this.transitionsPaused,hideFeaturedContent:1===this.transitionsDone})}this.transitionsDone=this.transitionsDone+1}},{key:"getDisplayProperties",value:function(t){var e=void 0;switch(t){case u.timesOfDay.morning:e="#568bdd";break;case u.timesOfDay.afternoon:e="#145ecf";break;case u.timesOfDay.evening:e="#285eb0";break;case u.timesOfDay.night:e="#0c387c";break;default:e="#145ecf"}return{textColor:this.transitionsPaused?"#fff":e,backgroundColor:e}}},{key:"tearDown",value:function(){clearInterval(this.updateIntervalId),this.background.tearDown(),this.foreground.tearDown(),this.musicManager.tearDown()}}]),t}();e.default=c},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var r=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),o=i(n(5)),a=i(n(6)),s=function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.tracks={},this.audioPlaying=!1}return r(t,[{key:"init",value:function(){this.initAudioTracks(),document.getElementById("musicToggle").addEventListener("click",this.toggleAudioPlaying.bind(this),!1)}},{key:"initAudioTracks",value:function(){var t=this;[{name:"day",filePath:o.default},{name:"night",filePath:a.default}].forEach(function(e){t.tracks[e.name]=document.createElement("audio"),t.tracks[e.name].src=e.filePath,t.tracks[e.name].preload="none",t.tracks[e.name].loop=!0})}},{key:"toggleAudioPlaying",value:function(){var t=this;Object.keys(this.tracks).forEach(function(e){t.audioPlaying?(t.tracks[e].pause(),t.tracks[e].currentTime=0):(t.tracks[e].muted=!0,t.tracks[e].play())}),this.audioPlaying=!this.audioPlaying}},{key:"triggerMusic",value:function(t){this.audioPlaying&&(t&&this.tracks.night.readyState>=3?(this.tracks.day.pause(),this.tracks.night.muted&&(this.tracks.night.currentTime=0,this.tracks.night.muted=!1),this.tracks.night.play()):this.tracks.day.readyState>=3&&(this.tracks.night.pause(),this.tracks.day.muted&&(this.tracks.day.currentTime=0,this.tracks.day.muted=!1),this.tracks.day.play()))}},{key:"tearDown",value:function(){document.getElementById("musicToggle").removeEventListener("click",this.toggleAudioPlaying.bind(this),!1)}}]),t}();e.default=s},function(t,e,n){t.exports=n.p+"sounds/unitock.mp3"},function(t,e,n){t.exports=n.p+"sounds/unitocknight.mp3"},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),r=function t(e,n,i){null===e&&(e=Function.prototype);var r=Object.getOwnPropertyDescriptor(e,n);if(void 0===r){var o=Object.getPrototypeOf(e);return null===o?void 0:t(o,n,i)}if("value"in r)return r.value;var a=r.get;if(void 0!==a)return a.call(i)},o=function(t){return t&&t.__esModule?t:{default:t}}(n(0)),a=function(t){function e(){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(e,o.default),i(e,[{key:"init",value:function(t){r(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"init",this).call(this,t),this.featuredContent=document.getElementById("featuredContent")}},{key:"reset",value:function(){this.featuredContent.style.display="none",r(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"reset",this).call(this)}},{key:"render",value:function(t){t.hideFeaturedContent&&(this.featuredContent.style.display="none"),t.showFeaturedContent?(this.featuredContent.style.display="flex",t.isNight?this.hide():this.renderAnimated(t)):t.isNight?this.renderStatic(t):this.renderAnimated(t),r(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"render",this).call(this,t)}},{key:"renderStatic",value:function(t){this.element.style.backgroundColor=t.displayProperties.backgroundColor,r(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"renderStatic",this).call(this,t)}}]),e}();e.default=a},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),r=function t(e,n,i){null===e&&(e=Function.prototype);var r=Object.getOwnPropertyDescriptor(e,n);if(void 0===r){var o=Object.getPrototypeOf(e);return null===o?void 0:t(o,n,i)}if("value"in r)return r.value;var a=r.get;if(void 0!==a)return a.call(i)},o=function(t){return t&&t.__esModule?t:{default:t}}(n(0)),a=function(t){function e(){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(e,o.default),i(e,[{key:"init",value:function(t){r(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"init",this).call(this,t),this.clockHeadline=document.getElementById("clockHeadline"),this.clockByline=document.getElementById("clockByline"),this.clockByline.textContent="samrum",this.musicToggle=document.getElementById("musicToggle"),this.musicToggle.style.display="block"}},{key:"show",value:function(){this.element.style.display="flex"}},{key:"render",value:function(t){t.animateOut?t.isNight?this.hide():this.renderAnimated(t):t.animateIn&&!t.isNight?this.renderAnimated(t):this.renderStatic(t),r(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"render",this).call(this,t)}},{key:"renderStatic",value:function(t){var n=t.displayProperties,i=n.backgroundColor,o=n.textColor;this.clockHeadline.textContent=t.timeString,this.element.style.color=[0,2].indexOf(this.renderCount)>=0||t.isNight?"#fff":o,this.musicToggle.style.backgroundColor=i,r(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"renderStatic",this).call(this,t)}}]),e}();e.default=a},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.getTimeOfDay=function(t){var e=(t||new Date).getHours(),n=i.evening;return e<6||e>22?n=i.night:e<11?n=i.morning:e>10&&e<18&&(n=i.afternoon),n},e.getFormattedTime=function(t){var e=t||new Date,n=e.getHours(),i=e.getMinutes(),r=e.getSeconds();return 0===n?n=12:n>12&&(n-=12),i<10&&(i="0"+i),r<10&&(r="0"+r),n+" "+i+" "+r};var i=e.timesOfDay={morning:0,afternoon:1,evening:2,night:3}},function(t,e){}]);
//# sourceMappingURL=main.bundle.js.map