import {Component} from '/components/Component.js'
class DesktopTitleBar extends Component{
    constructor(){
        super();
    }

    connectedCallback(){
        this.width = '100%'
        this.style.width = this.width
        this.style.height = "30px"
        this.style.background = "blue"
        this.style.display = 'block'
        this.style.position = 'absolute';
        this.style.top = '0px';
        this.style.left = `calc(calc(100% - ${this.width}) / 2)`;
        this.style.borderRadius = 'var(--global-border-radius)';
        this.style.background = 'var(--theme-card-color)';
    }

}
window.customElements.define('desktop-title-bar', DesktopTitleBar);
export {DesktopTitleBar}
