class Activity{
    constructor(props){
        var props = (props !== undefined) ? props : {};
        console.log(props)
        this.type = (props.type !== undefined) ? props.type : 'window';
        this.id = (props.id !== undefined) ? props.id : 'create_id_here()' ;
        this.headless = (props.headless !== undefined) ? props.headless : false;
        this.window = (props.window !== undefined) ? props.window : false;    
        ActivityManager.activities[this.id] = this;
    }
}

const ActivityManager = {
    activities:[],
    new_activity(props){
        new Activity(props)
    },
    
    close_activity(id){
        this.activities[id].window.close();
    }
}

const ActivityMangerSingleton = ActivityManager;

window.ActivityManager = ActivityMangerSingleton // web

export default window.ActivityManager // this will initialise the singleton instantly