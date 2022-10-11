import {Component} from '/components/Component.js'
class DesktopTaskBar extends Component{
    constructor(){
        super();
    }

    connectedCallback(){
        this.width = '800px'
        this.style.width = this.width
        this.style.height = "60px"
        this.style.background = "blue"
        this.style.display = 'block'
        this.style.position = 'absolute';
        this.style.bottom = 'var(--global-margin)';
        this.style.left = `calc(calc(100% - ${this.width}) / 2)`;
        this.style.borderRadius = 'var(--global-border-radius)';
        this.style.background = 'var(--theme-card-color)';
    }
}
window.customElements.define('desktop-task-bar', DesktopTaskBar);
export {DesktopTaskBar}
