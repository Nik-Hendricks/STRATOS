import {View} from '/views/View.js';

class SavingsView extends View{
    constructor(){
        super();
    }

    connectedCallback(){
        this.classList.add('view')
        this.make_view('monthly')
        window.DP.dispatch("VIEW_LOAD");
    }

    make_view(frequency){
        this.innerHTML = ``
        this.profile_dropdown = window.Builder.createElement('custom-input', {text: 'Profile', type: 'dropdown', icon: 'info', width: '10'})
        this.new_profile_button = window.Builder.createElement('custom-input', {text: 'Add Profile', type: 'button', icon: 'add', width: '2'})
        this.frequency_dropdown = window.Builder.createElement('custom-input', {text:frequency, type: 'dropdown', icon: 'info', width: '10'})
        this.new_finance_button = window.Builder.createElement('custom-input', {text: 'Add Finance Item', type: 'button', icon: 'add', width: '2'})

        this.new_profile_button.onclick = () => {window.history.pushState('','',`${window.location.href}/NewProfileItem`)}
        this.new_finance_button.onclick = () => {window.history.pushState('','',`${window.location.href}/NewFinanceItem`)}

        this.frequency_dropdown._on_change((ev) => {
            this.innerHTML = ``
            this.make_view(ev)
        })

        this.append(this.profile_dropdown, this.new_profile_button, this.frequency_dropdown, this.new_finance_button)

        window.API2.get_db('profiles').find({}, (err, profiles) => {
            var _profiles = []
            profiles.forEach(profile => {
                _profiles.push(profile.name);
            })
            this.profile_dropdown.items = _profiles
        })

        window.API2.get_db('finances').find({}, (err, finances) => {
            this.append_finances_from_frequency(frequency, finances).then(finances_html => {
                this.bar_graph_el = this.bar_graph(finances)
                this.append(finances_html, this.bar_graph_el)
                finances_html.resizeComponents(true)
                this.resizeComponents(true)
                this.frequency_dropdown.items = ['Daily', 'Weekly', 'Bi-Weekly', 'Monthly']
            })
        })
    }

    append_finances_from_frequency(frequency, finances){
        return new Promise(resolve => {
            var finances_div = window.Builder.createElement('card-item', {blank: true, nomargin: true}, {padding: '0px', margin: '0px'})
            finances_div.innerHTML = ``
            this.calculate_from_normalized(this.normalize_finances(finances), frequency).forEach(item => {
                finances_div.append(this.finance_detail_div(item))
            })
            var val = this.get_balance(finances)
            var p_color = (Math.sign(val) == -1) ? '#e3556c' : 'green'
            var p_text = (Math.sign(val) == -1) ? `-   $${String(val).split('-')[1]}` : `$${val}`
            var c = window.Builder.createElement('card-item', {blank: true})
            var p = window.Builder.createElement('h1', {}, {textAlign: 'center', color: p_color})
            p.textContent = p_text
            c.append(p)
            finances_div.append(c)
            resolve(finances_div)
        })
    }

    finance_detail_div(item){
        var sign = (item.type === 'expense') ? '-' : '+';
        var color_code = (item.type === 'expense') ? '#e3556c' : 'green';
        var e = window.Builder.createElement('custom-input', {icon: 'attach_money', type: 'button', text: item.name, right_text: `${sign}  $${item.amount}`, right_text_color: color_code})

        e.onclick = () => {
            window.history.pushState("","", `${window.location.href}/NewFinanceItem/${item._id}`)
        }
        return e
    }

    normalize_finances(finances){
        var ret = [];
        finances.forEach(finance => {
            var freq = finance.frequency.toLowerCase()
            if(freq == 'bi-weekly'){
                finance.amount = finance.amount * 2 ;
            }
            if(freq == 'weekly'){
                finance.amount = finance.amount * 4 ;
            }
            if(freq == 'daily'){
                finance.amount = finance.amount * 30 ;
            }
            ret.push(finance)
        })
        return ret;
    }

    calculate_from_normalized(normalized, frequency){
        var ret = []
        normalized.forEach(finance => {
            var freq = frequency.toLowerCase();
            if(freq == 'bi-weekly'){
                finance.amount = Math.ceil(finance.amount / 2);
            }
            if(freq == 'weekly'){
                finance.amount = Math.ceil(finance.amount / 4);
            }
            if(freq == 'daily'){
                finance.amount = Math.ceil(finance.amount / 30);
            }
            ret.push(finance)
        })
        return ret
    }


    get_income(finances){
        var balance = 0;
        finances.forEach(item => {
            var am = Number(item.amount)
            if(!isNaN(am) && item.type !== 'expense'){
                balance += am;
            }
        })
        return balance;
    }

    get_balance(finances){
        var balance = 0;
        finances.forEach(item => {
            var am = Number(item.amount)
            if(!isNaN(am) && item.type !== 'income'){
                balance -= am;
            }
            if(!isNaN(am) && item.type !== 'expense'){
                balance += am;
            }
        })
        return balance;
    }

    //custom sub elements

    //bar-graph Nik 09-28-22 8:08 PM

    //returns percentage
    normalize(n, range){
        return ((n / range) * this.getBoundingClientRect().width / range)
    }

    _normalize(val, min, max){
        return (val - min) / (max - min);
    }



    randomColor(colors, used){
        var color = colors[Math.floor(Math.random() * colors.length )]
        if(used.indexOf(color) != -1){
            return this.randomColor(colors, used);
        }else{
            used.push(color)
            return [color, used];
        }
    }

    bar_graph(data){
        var income = this.get_income(data);
        var negative_colors = ['#e3556c', '#86424c', '#da4453', '#ff5252', '#863c32', '#77302E'];
        var positive_colors = [];
        var e = window.Builder.createElement('card-item', {}, {padding: '0px'});
        e.style.height = "40px"

        data.forEach(finance => {
            if(finance.type == 'income'){
                var percentage = (this.get_balance(data) * 100) / income;
                var color = '#4caf50'
                e.append(window.Builder.createElement('div', {} , {width: `${percentage}%`, height: '40px', background: color, display: 'inline-block', float: 'right'}))
            }else{
                var percentage = (finance.amount * 100) / income;
                var color = negative_colors[Math.floor(Math.random() * negative_colors.length )]
                e.append(window.Builder.createElement('div', {} , {width: `${percentage}%`, height: '40px', background: color, display: 'inline-block'}))
            }
        })

        
        return e;
    }


}
window.customElements.define('savings-view', SavingsView);
export{SavingsView};