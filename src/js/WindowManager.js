import {CustomWindow} from '/components/CustomWindow.js'; //consider naming DesktopWindow

const WindowManager = {
    windows: [],
    new_window(props){
        document.body.append(new CustomWindow(props))
    }
}

const WindowMangerSingleton = WindowManager;

window.WM = WindowMangerSingleton // web

export default window.WM // this will initialise the singleton instantly