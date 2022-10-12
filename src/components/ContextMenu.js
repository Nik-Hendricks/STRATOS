import {Component} from '/components/Component.js';

class ContextMenu extends Component {
    constructor() {
        super();
    }

    connectedCallback(){
        this.classList.add('context-menu')
        this.style = "display:none;position:absolute; width:150px; height:auto; background:var(--theme-card-color); overflow:hidden; border-radius:var(--global-border-radius);z-index:99;"

        window.onclick = (ev) => {
            var show = false;
            for(var key in ev.path){
                if(String(ev.path[key].nodeName) != '#document' && String(ev.path[key].nodeName) != 'undefined'){
                    if(ev.path[key].tagName.toLowerCase() == 'context-menu'){
                        show = true;   
                    }               
                }
            }
            if(show == false){
                this.hide()
            }
        }
    }

    destroy(){
        this.innerHTML = ''
    }

    hide(){
        this.style.display = "none"
        this.destroy()
    }

    //use this anywhere to show
    show(x, y, html){
        this.hide();
        setTimeout(() => {
            this.style.left = `${x}px`;
            this.style.top = `${y}px`;
            this.style.display = "block"            
            this.append(html)
            this.resizeComponents(true)
        }, 100);
        
    }

}

window.customElements.define('context-menu', ContextMenu);
export{ContextMenu};