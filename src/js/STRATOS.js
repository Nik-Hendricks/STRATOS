//10-10-22 Nik Hendricks, been working on this for about 2 days now
//STRATOS chromium based OS 
//with modern web technologies we can do so much. What if it was possible to create an os 
//so basic that all it could run was chromium renderer and script engine. nothing else
//this OS would be extremely lightweight and it would bring a whole new angle to merging Desktop and Web
//instead of merging Web to Desktop 
//we merge Desktop to Web. think of things from a more moders approach

import WindowManager from '/js/WindowManager.js';
import ActivityManager from '/js/ActivityManager.js';
import NE_FS from '/js/NE_FS.js';

const STRATOS = {
    WindowManager: WindowManager,
    ActivityManager: ActivityManager,
    FS: NE_FS,
    registered_apps:[],

    start_applet(type, props){
        var window_data = {}
        if(type == 'custom'){
            window_data = props;
        }

        console.log(this.registered_apps.indexOf(type))

        var win = WindowManager.new_window(window_data);
        ActivityManager.new_activity({window: win})
        console.log(ActivityManager.activities)
    },

    stop_applet(){

    },

    register_app(){

    },

    unregister_app(){

    },

    startup(){
        //get users desktop

    },

    get_registered_apps(){

    }


}

const STRATOSSingleton = STRATOS;

window.STRATOS = STRATOSSingleton // web

export default window.STRATOS // this will initialise the singleton instantly