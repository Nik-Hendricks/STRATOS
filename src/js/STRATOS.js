//10-10-22 Nik Hendricks, been working on this for about 2 days now
//STRATOS chromium based OS 
//with modern web technologies we can do so much. What if it was possible to create an os 
//so basic that all it could run was chromium renderer and script engine. nothing else
//this OS would be extremely lightweight and it would bring a whole new angle to merging Desktop and Web
//instead of merging Web to Desktop 
//we merge Desktop to Web. think of things from a more moders approach

import WindowManager from '/js/WindowManager.js';
import ActivityManager from '/js/ActivityManager.js';

const STRATOS = {
    WindowManager: WindowManager,
    ActivityManager: ActivityManager,

    start_applet(){
        
    },

    stop_applet(){

    },

    startup(){

    },



}

const StratosSingleton = WStratos;

window.WM = StratosSingleton // web

export default window.WM // this will initialise the singleton instantly