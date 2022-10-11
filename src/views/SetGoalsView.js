import {View} from '/views/View.js';

class SetGoalsView extends View{
    constructor(){
        super();
    }

    connectedCallback(){
        
        this.classList.add('view')

        this.innerHTML =    /*html*/`   <p>How much do you want to save monthly?</p>
                                        <custom-input id="saving" type="text"></custom-input>
                                        <custom-input id="frequency" type="dropdown" icon="info" text="Frequency"></custom-input>
                                        <card-item id="expenses"></card-item>
                                        <custom-input type="button" text="Add Finance Item" icon="add" onclick="window.history.pushState('','','${window.location.href}/NewFinanceItem')"></custom-input>
                                        <p id="income"></p>
                                        `
        this.append(this.bar_graph())
            var frequency_dropdown = document.getElementById('frequency');
            frequency_dropdown.items = ['Daily', 'Weekly', 'Bi-Weekly', 'Monthly']

            frequency_dropdown._on_change((ev) => {
                this.append_finances_from_frequency(ev)
            })

            this.append_finances_from_frequency('monthly')

            window.DP.dispatch("VIEW_LOAD");
        

    }

    append_finances_from_frequency(frequency){
        var finances_div = document.getElementById('expenses');
        finances_div.innerHTML = ``
        this.calculate_finances(frequency).then(calculations => {
            calculations.forEach(item => {
                finances_div.append(this.finance_detail_div(item))
            })
            finances_div.resizeComponents(true)
        })

    }


    finance_detail_div(item){
        var e = document.createElement('custom-input')
        var sign = (item.type === 'expense') ? '-' : '+';
        var color_code = (item.type === 'expense') ? '#e3556c' : 'green';
        e.setAttribute('icon', 'attach_money')
        e.setAttribute('type', 'button');
        e.setAttribute('text', item.name);
        e.setAttribute('right_text', `${sign}  $${item.amount}`)
        e.setAttribute('right_text_color', color_code)
        e.style.background = 'var(--theme-background-color)'
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

    calculate_finances(frequency){
        console.log(frequency)
        return new Promise(resolve => {
            window.API2.get_db('finances').find({}, (err, docs) => {
                var reference = 0;
                resolve(this.calculate_from_normalized(this.normalize_finances(docs), frequency))
            })
        })
    }

    calculate_montly_expenses(){
        return new Promise(resolve => {
            window.API2.get_db('finances').find({}, (err, docs) => {
                var ret = 0;
                docs.forEach(item => {
                    var am = Number(item.amount);
                    if(!isNaN(am) && item.type !== 'income'){
                        ret += am; 
                    }
                })
                resolve(ret);
            })
        })
    }

    calculate_montly_incomes(){
        return new Promise(resolve => {
            window.API2.get_db('finances').find({}, (err, docs) => {
                var ret = 0;
                docs.forEach(item => {
                    var am = Number(item.amount);
                    if(!isNaN(am) && item.type !== 'expense'){
                        ret += am;
                    }
                })
                resolve(ret);
            })
        })
    }

    calculate_total_expenses(){
        return new Promise(resolve => {
            this.calculate_montly_expenses().then(res => {
                this.calculate_montly_incomes().then(income => {
                    var saving = (!isNaN(Number(document.getElementById('saving').value))) ? document.getElementById('saving') : 0;
                    resolve(Number(income - (res + saving)))
                })
            })
        })
    }

    append_total_calculations(){
        this.calculate_total_expenses().then(res => {
            var sign = (Math.sign(res) == -1) ? '-' : '+' ;
            var color_code = (Math.sign(res) == -1) ? '#e3556c' : 'green' ;
            var tmp_str = String(res)
            var amnt = (Math.sign(res) == -1) ? Number(tmp_str.slice(1, tmp_str.length)) : tmp_str;
            document.getElementById('income').innerHTML += `<center><h1 style='color:${color_code} !important;' ">${sign}    $${amnt}</h1></center>`
        })
    }

    //custom sub elements

    //bar-graph Nik 09-28-22 8:08 PM

    bar_graph(){
        var e = document.createElement('card-item');
        e.style.height = "40px"
        return e;
    }

}
window.customElements.define('set-goals-view', SetGoalsView);
export{SetGoalsView};