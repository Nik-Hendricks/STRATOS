import {View} from '/views/View.js';

class CalendarView extends View{
    constructor(){
        super();
    }

    connectedCallback(){
        this.classList.add('view')
        this.innerHTML = `<custom-calendar></custom-calendar>`
        window.DP.dispatch("VIEW_LOAD");
    }


}
window.customElements.define('calendar-view', CalendarView);
export{CalendarView};