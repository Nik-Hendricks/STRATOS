import WindowManager from '/js/WindowManager.js'

const ActivityManager = {
    activities:[],
    WindowManager: WindowManager,
    new_activity(){
        
    }
}

const ActivityMangerSingleton = ActivityManager;

window.ActivityManager = ActivityMangerSingleton // web

export default window.ActivityManager // this will initialise the singleton instantly