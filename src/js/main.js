
//import all components
import {MenuBarBottom} from '/components/MenuBarBottom.js';
import {MenuBarTop} from '/components/MenuBarTop.js';
import {MainContent} from '/components/MainContent.js';
import {LoadingSpinner} from '/components/loadingSpinner.js';
import {SideScroller} from '/components/sidescroller.js';
import {Card} from '/components/Card.js';
import {IconButton} from '/components/iconbutton.js';
import {GridContainer} from '/components/GridContainer.js';
import {ImageSlider} from '/components/ImageSlider.js';
import {ListItem} from '/components/ListItem.js';
import {PostCard} from '/components/PostCard.js';
import {ContextMenu} from '/components/ContextMenu.js';
import {CodeFormat} from '/components/CodeFormat.js';
import {MusicPlayer} from '/components/MusicPlayer.js';
import {SliderInput} from '/components/SliderInput.js';
import {SQLEditor} from '/components/SQLEditor.js';
import {Calculator} from '/components/Calculator.js';
import {Calendar} from '/components/Calendar.js';
import {PostCardHeader} from '/components/PostCardHeader.js';
import {PostCardFooter} from '/components/PostCardFooter.js';
import {CustomInput} from '/components/CustomInput.js';
import {PieChart} from '/components/PieChart.js';
import {Text} from '/components/Text.js';
import {DesktopTaskBar} from '/components/DesktopTaskBar.js';
import {DesktopTitleBar} from '/components/DesktopTitleBar.js';
import {CustomWindow} from '/components/CustomWindow.js'; //consider naming DesktopWindow
//import all views
import {SettingsView} from '/views/SettingsView.js';
import {SavingsView} from '/views/SavingsView.js';
import {CalendarView} from '/views/CalendarView.js';
import {SetGoalsView} from '/views/SetGoalsView.js';
import {NewExpenseView} from '/views/NewExpenseView.js';
import {NewFinanceItemView} from '/views/NewFinanceItemView.js';
import {NewProfileView} from '/views/NewProfileView.js';

import Dispatcher from '/js/dispatcher.js';
import API2 from '/js/API2.js'
import ViewManager from '/js/viewManager.js';
import Builder from '/js/Builder.js';
import Utils from '/js/Utils.js';
import FS from '/js/NE_FS.js'
import ActivityManager from '/js/ActivityManager.js';


window.onload = () => {
    window.API2.register_service_worker();
    var desktop_title_bar = new DesktopTitleBar();
    var desktop_task_bar = new DesktopTaskBar();
    var context_menu = new ContextMenu();


    var newShortcut = window.Builder.createElement('custom-input', {type: 'button', text: 'New Shortcut', icon: 'info', nomargin: true}, {borderRadius: '0px', margin: '0px', height: '30px', lineHeight: '30px', fontSize: '7px'})
    newShortcut.onclick = (e) => {
        
        window.ActivityManager.WindowManager.new_window({title: 'test', width:'400px', height: '250px', x: '50px', y: '50px',  context_items: (newShortcut), html: `<custom-input type="button" icon="info" text="test"></custom-input`})
        
    }
    document.body.context_html = (newShortcut);

    document.body.append(desktop_title_bar, desktop_task_bar, context_menu)

    
    
    
    window.DP.on("VIEW_LOAD", () => {
        console.log("VIEW LOAD")
        window.VM.resize_components();
        window.loadingSpinner.hide();
    })

    window.DP.on('API_LOAD', () => {
            console.log("API LOAD")
            //window.VM.begin();
    })

    window.DP.on('NO_AUTH', () => {
    })

    window.addEventListener('contextmenu', (e) => {
        e.preventDefault()
        //here we determine the content to put in the context-menu as the context-menu is global.
        
        var context_items = e.target.context_html != undefined ? e.target.context_html : '';
        context_menu.show(e.pageX, e.pageY, context_items)
    })
    
}

function new_window(props){
    window.WM.create_window(props)
}

function shortcut_item(text, icon, action){

}

function append_desktop(){

}

function track_events(){
    let date = new Date(), sec = date.getSeconds();
    setTimeout(()=>{
        setInterval(()=>{
            // get events and check if any match current date
            window.API2.events_db.then(events => {
                console.log(events)
                var d = new Date(); 
                var st = d.getHours()+""+d.getMinutes()
                console.log(st)
                events.forEach(event => {
                    if(event.start_time == String(st)){
                        console.log(event.alarm_sound)
                        new Audio(event.alarm_sound).play();
                    }
                })

            })
        }, 60 * 1000);
    }, (60 - sec) * 1000);
}

function register_views(){
    var last_visited_view = (window.localStorage.lastView !== undefined) ? window.localStorage.lastView: `<desktop-view></desktop-view>`;
    var routes = {
        "":{
            title: 'Financium',
            view: `<desktop-view></desktop-view>`
        },
    }
    
    window.VM.register(routes)

    
}


