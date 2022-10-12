import {Component} from '/components/Component.js'

class CustomWindow extends Component{
    constructor(props){
        super(props);
        this.props = props;
    }

    connectedCallback(){
        this.style.position = 'absolute';
        this.x = this.props.x !== undefined ? this.props.x : '0px'; 
        this.y = this.props.y !== undefined ? this.props.y : '0px';
        this.width = this.props.width !== undefined ? this.props.width : '400px';
        this.height = this.props.height !== undefined ? this.props.height : '400px';
        this.html = this.props.html !== undefined ? this.props.html : `Empty Window`;
        this.background = 'var(--theme-card-color)';
        this.borderRadius = 'var(--global-border-radius)';

        this.title_bar_button_height = '12px'
        this.title_bar_height = '25px'
        this.title_bar_font_size = '14px'
        this.text = this.props.text !== undefined ? this.props.text : 'New Window';

        var title_bar_button_margin = `calc(calc(${this.title_bar_height} - ${this.title_bar_button_height}) / 2)`
        var title_bar_text_margin = `calc(calc(${this.title_bar_height} - ${this.title_bar_font_size}) / 2)`
        var title_bar_button_spacing = '5px'

        this.title_bar = window.Builder.createElement('card-item', {nomargin: true}, {borderBottomRightRadius: '0px', borderBottomLeftRadius:'0px', padding: '0px', margin: '0px', background: 'black', height: this.title_bar_height})
        this.title_exit = window.Builder.createElement('div', {}, {float: 'right', height: this.title_bar_button_height, width: this.title_bar_button_height,marginRight: title_bar_button_spacing,  marginTop: title_bar_button_margin, borderRadius:`calc(${this.title_bar_button_height} / 2)`, background:'red'})
        this.title_maximize = window.Builder.createElement('div', {}, {float: 'right', height: this.title_bar_button_height, width: this.title_bar_button_height,marginRight: title_bar_button_spacing,  marginTop: title_bar_button_margin, borderRadius: `calc(${this.title_bar_button_height} / 2)`, background:'yellow'})
        this.title_minimize = window.Builder.createElement('div', {}, {float: 'right', height: this.title_bar_button_height, width: this.title_bar_button_height,marginRight: title_bar_button_spacing,  marginTop: title_bar_button_margin, borderRadius: `calc(${this.title_bar_button_height} / 2)`, background:'green'})
        this.title_text = window.Builder.createElement('span', {}, {position: 'absolute', width: '100%', height: '100%', fontSize: this.title_bar_font_size, marginTop: title_bar_text_margin, textAlign: 'center', color: 'var(--theme-text-primary-color)'})
        this.title_text.innerHTML = this.text;
        this.window_content = window.Builder.createElement("card-item", {nomargin: true}, {margin: '0px', background:'transparent', height:`calc(100% - ${this.title_bar.getBoundingClientRect().height}px)`})
        
        var e = this.title_bar.getElementsByTagName('div');
        console.log(e)
        

        //this.title_bar.getElementsByTagName('div')[2].onclick = () {
        //    console.log('asdf')
        //}

        this.title_maximize.onclick = () => {

        }

        this.title_minimize.onclick = () => {

        }



        this.mouse_state = false;

        window.addEventListener('mousedown', (ev) => {
            this.mouse_state = true;
        })
        window.addEventListener('mouseup', (ev) => {
            this.mouse_state = false;
        })


        
        this.title_bar.addEventListener('mousemove', (ev) => {
            if(this.mouse_state == true){
                this.set_position(ev.clientX - 50 , ev.clientY - 25 /2)  
            }
        })

        window.addEventListener('mousemove', (ev) => {
                var x = Number(this.x.split('px')[0]);
                var y = Number(this.y.split('px')[0]);
                var width = Number(this.width.split('px')[0]);
                var height = Number(this.height.split('px')[0]);
                var size = 20;
                var corner_index = 0;
                document.body.style.cursor = "auto";
                this.get_corners(x, y, width, height).forEach(window_corner => {
                    if(ev.clientX >= window_corner[0] - (size / 2) && ev.clientX <= window_corner[0] + (size / 2) ){
                        if(ev.clientY >= window_corner[1]  - (size / 2) && ev.clientY <= window_corner[1] + (size / 2) ){

                            if(corner_index == 0){
                                document.body.style.cursor = "nw-resize";
                            }
                            if(corner_index == 1){
                                document.body.style.cursor = "ne-resize";
                            }
                            if(corner_index == 2){
                                document.body.style.cursor = "se-resize";
                            }
                            if(corner_index == 3){
                                document.body.style.cursor = "sw-resize";
                            }

                            if(this.mouse_state == true){
                            }
                        }
                    }
                    corner_index++
                })
                
        })

        this.update();
        this.title_bar.append(this.title_text, this.title_exit, this.title_maximize, this.title_minimize)
        this.append(this.title_bar, this.window_content)
        this.resizeComponents(true);
    }

    update(){
        this.style.left = this.x
        this.style.top = this.y
        this.style.width = this.width
        this.style.height = this.height
        this.style.background = this.background;
        this.style.borderRadius = this.borderRadius;
        this.window_content.innerHTML = this.html;
        this.resizeComponents(true)
    }

    set_position(x, y){
        this.x = `${x}px`
        this.y = `${y}px`
        this.update();
    }

    get_corners(x, y, width, height){
        //returns x,y coordinates of all 4 corners starting from the top left going clockwise
        var corner1 = [x, y]
        var corner2 = [x + width, y];
        var corner3 = [x + width, y + height]
        var corner4 = [x, y + height]
        return [corner1, corner2, corner3, corner4]
    }

    close(){
        console.log(window.STRATOS)
    }
}
window.customElements.define('custom-window', CustomWindow);
export {CustomWindow}
