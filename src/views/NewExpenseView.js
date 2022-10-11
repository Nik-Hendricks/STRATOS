import {View} from '/views/View.js';

class NewExpenseView extends View{
    constructor(){
        super();
    }

    connectedCallback(){
        this.classList.add('view')
        this.innerHTML =    /*html*/`   <p>Name</p>
                                        <custom-input id="name" type="text" placeholder="Name"></custom-input>
                                        <p>Frequency</p>
                                        <custom-input id="dropdown" type="dropdown" text="Frequency" icon="info" ></custom-input>
                                        <p>Amount</p>
                                        <custom-input id="amount" type="text" icon="attach_money" placeholder="Amount" number></custom-input>
                                        <p>Description</p>
                                        <custom-input id="description" type="textarea" placeholder="Description" rows="10"></custom-input>
                                        <custom-input id="save" type="button" icon="save" text="Save"></custom-input>
                                        `
        document.getElementById("dropdown").items = ['Monthly','Weekly','Bi-Weekly']
        window.DP.dispatch("VIEW_LOAD");
        document.getElementById('save').onclick = () => {
            this.save();
        }
    }

    save(){
        var _name = document.getElementById('name').value;
        var _frequency = document.getElementById('dropdown').value
        var _amount = document.getElementById('amount').value;
        var _description = document.getElementById('description').value;
        var name = (_name != undefined) ? _name : null;
        var frequency = (_frequency != undefined) ? _frequency : null;
        var amount = (_amount != undefined) ? _amount : null;

        if(name !== null && frequency !== null && amount !== null){
            window.API2.dbs['finances'].insert({type:'expense', name : name, amount: amount, frequency: frequency})
        }
    }


}
window.customElements.define('new-expense-view', NewExpenseView);
export{NewExpenseView};