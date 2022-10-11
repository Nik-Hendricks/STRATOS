import {View} from '/views/View.js';

class DesktopView extends View{
    constructor(){
        super();

    }

    connectedCallback(){
        this.classList.add('view')
        window.DP.dispatch("VIEW_LOAD");
        this.onclick = (e) => {
            console.log('asd')
            window.VM.context_menu.show(e.pageX, e.pageY, `asd`)
        }
    }
}
window.customElements.define('desktop-view', DesktopView);
export{DesktopView};