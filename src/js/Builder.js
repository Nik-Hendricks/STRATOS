
class CustomElement extends HTMLElement{
    
}


const Builder = { 
    daily_schedule_row_item(event, background){
        var start_time = window.Utils.format_time(event.start_time);
        var end_time = window.Utils.format_time(event.end_time);
        console.log(background)
        var background_color = (background != undefined) ? background : 'var(--theme-background-color)' ;
        return(/*html*/`
        <card-item width="4" style="max-height:37px; background:${background_color};">
            <p style="padding:0; margin:0; margin-bottom:10px; color:${event.color};text-align:center; font-size: 14px;">${event.name}</p>
        </card-item>
        <card-item width="3" style="max-height:37px; background:${background_color};">
            <p style="padding:0; margin:0; margin-bottom:10px; color:${event.color};text-align:center; font-size: 14px;">${start_time}</p>
        </card-item>
        <card-item width="3" style="max-height:37px; background:${background_color};">
            <p style="padding:0;  margin:0;margin-bottom:10px; color:${event.color};text-align:center; font-size: 14px;">${end_time}</p>
        </card-item>
        <card-item width="2" style="max-height:37px; background:${background_color};">
            <span class="material-icons" style="margin:0; margin-left:50%; left:-7px; font-size:14px; position:relative; margin-bottom:10px;color:var(--theme-primary-color);">
            info
            </span>
        </card-item>`)
    },
    
    big_pie_chart_card(){
        return /*html*/ `<card-item width="12">
                            <card-item width="6" blank>
                                <pie-chart></pie-chart>
                            </card-item>
                            <card-item width="6" blank>
                                <custom-input style="background:var(--theme-background-color);" type="button" icon="info" text="Event Type"></custom-input>
                                <custom-input style="background:var(--theme-background-color);" type="button" icon="info" text="Event Time"></custom-input>
                                <custom-input style="background:var(--theme-background-color);" type="button" icon="info" text="Event Day"></custom-input>
                                <custom-input style="background:var(--theme-background-color);" type="button" icon="info" text="test"></custom-input>
                            </card-item>
                        </card-item>`
    },

    square_card_item(h1, text, _width){
        var width = (_width) ? _width : 4;
        return /*html*/ `   <card-item width="` + width + `" square>
                                <h1 style="margin:0; width:100%; float:left; position:absolute; text-align:center; height:40px; font-size:40px; margin-top:50%; top:-30px; color:var(--theme-primary-color);">${h1}</h1>
                                <p style="margin:0; width:100%; text-align:center; float:left; position:absolute; bottom:var(--global-margin);">${text}</p>
                            </card-item>`
    },

    createElement(tagName, attributes, styles){
        var el = document.createElement(tagName)
        var i = 0;
        for(var key in attributes){
            el.setAttribute(key, attributes[key])
        }

        for(var key in styles){
            el.style[key] = styles[key]
        }
        return el;
    }
}

const BuilderSingleton = Builder;

window.Builder = BuilderSingleton // web

export default window.Builder // this will initialise the singleton instantly