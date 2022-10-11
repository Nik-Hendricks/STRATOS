import {Component} from '/components/Component.js'

class CustomWindow extends Component{
    constructor(props){
        super(props);
        this.props = props;
    }

    connectedCallback(){
        console.log(this.props)
        this.style.position = 'absolute';
        this.x = this.props.x !== undefined ? this.props.x : '0px'; 
        this.y = this.props.y !== undefined ? this.props.y : '0px';
        this.width = this.props.width !== undefined ? this.props.width : '400px';
        this.height = this.props.height !== undefined ? this.props.height : '400px';
        this.html = this.props.html !== undefined ? this.props.html : `Empty Window`;
        this.background = 'var(--theme-card-color)';
        this.borderRadius = 'var(--global-border-radius)';
        this.text = this.props.text !== undefined ? this.props.text : 'New Window';

        this.title_bar = window.Builder.createElement('card-item', {nomargin: true}, {borderBottomRightRadius: '0px', borderBottomLeftRadius:'0px', padding: '0px', margin: '0px', background: 'black', height: '25px'})
        this.title_exit = window.Builder.createElement('span', {}, {float: 'right', height: '15px', width: '15px', margin:'5px', borderRadius:'7.5px', background:'red'})
        this.title_maximize = window.Builder.createElement('span', {}, {float: 'right', height: '15px', width: '15px', margin:'5px', borderRadius:'7.5px', background:'yellow'})
        this.title_minimize = window.Builder.createElement('span', {}, {float: 'right', height: '15px', width: '15px', margin:'5px', borderRadius:'7.5px', background:'green'})
        this.title_text = window.Builder.createElement('span', {}, {zIndex: '2', position: 'absolute', width: '100%', height: '100%', marginTop:'5px', textAlign: 'center', color: 'var(--theme-text-primary-color)'})
        this.title_text.innerHTML = this.text;
        this.window_content = window.Builder.createElement("card-item", {nomargin: true}, {margin: '0px', background:'transparent', height:`calc(100% - ${this.title_bar.getBoundingClientRect().height}px)`, padding: '0px'})
        this.title_bar.append(this.title_exit, this.title_maximize, this.title_minimize, this.title_text)


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
        this.resizeComponents(true);

        //this.window_corners = 

        //an array of each corners hoverspace
        //this.window_corners = [];

        //so here we will run all of these corners back through get_corners()
        //but we will subtract the x and y by our desired radius
        //the width and height will be the desired diameter
        //var size = 40;
        //var corners = this.get_corners(x, y, width, height)
        //corners.forEach(corner => {
        //    this.window_corners.push(this.get_corners(corner[0] - (size / 2), corner[1] - (size / 2), size, size))
        //})

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
}
window.customElements.define('custom-window', CustomWindow);
export {CustomWindow}
