import {CustomWindow} from '/components/CustomWindow.js'; //consider naming DesktopWindow

const WindowManager = {
    windows: [],
    new_window(props){
        var win = new CustomWindow(props);
        document.body.append(win)
        return win;
    }
}

const WindowMangerSingleton = WindowManager;

window.WM = WindowMangerSingleton // web

export default window.WM // this will initialise the singleton instantly