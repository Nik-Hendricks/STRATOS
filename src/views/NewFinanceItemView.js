import {View} from '/views/View.js';

class NewFinanceItemView extends View{
    constructor(){
        super();
    }

    connectedCallback(){
        this.classList.add('view')
        this.profiles = [];
        this.create_view();
        var split = window.location.href.split('/')
        this.item_id = (split.length >= 6) ? split[split.length -1] : null;
        if(split.length >= 6){
            
            var delete_button = window.Builder.createElement('custom-input', {type: 'button', icon: 'remove', text: 'Delete'})
            delete_button.onclick = () => {
                window.API2.dbs['finances'].remove({_id: this.item_id})
                windowo.history.back();
            }

            this.append(delete_button);
            window.API2.dbs['finances'].find({_id: this.item_id}, (err, docs) => {
                var item = docs[0]
                this.name.textContent = item.name;
                this.name.value = item.name;
                this.type.value = item.type
                this.frequency.value = item.frequency
                this.amount.value = item.amount
                this.amount.textContent = item.amount
            })
        }
        

        window.API2.get_db('profiles').find({}, (err, profiles) => {
            profiles.forEach(profile => {
                this.profiles.push(profile.name);
            })
        })

        this.frequency.items = ['Monthly','Weekly','Bi-Weekly', 'Daily']
        this.type.items = ['Income','Expense']
        window.DP.dispatch("VIEW_LOAD");
    }

    create_view(){
        var profile_label = window.Builder.createElement('custom-text', {text: 'Profile', width: '4', color: 'var(--theme-text-primary-color)', align: 'center'}, {height: '30px'})
        this.profile = window.Builder.createElement('custom-input', {type: 'dropdown', icon:'info', text: 'Profile', width: '4'})
        var name_label = window.Builder.createElement('custom-text', {text: 'Name', color: 'var(--theme-text-primary-color)', width: '8', align: 'center'}, {height: '30px'})
        this.name = window.Builder.createElement('custom-input', {type: 'text', placeholder: 'Name', width: '8'})
        var type_label = window.Builder.createElement('custom-text', {text: 'Type', width: '6', align: 'center', color: 'var(--theme-text-primary-color)'}, {height: '30px'})
        var frequency_label = window.Builder.createElement('custom-text', {text: 'Frequency', width: '6', align: 'center', color: 'var(--theme-text-primary-color)'}, {height: '30px'})
        this.type = window.Builder.createElement('custom-input', {type: 'dropdown', icon: 'info', text: 'Type', width: '6'})
        this.frequency = window.Builder.createElement('custom-input', {type: 'dropdown', icon: 'info', text: 'Frequency', width: '6'});
        var amount_label = window.Builder.createElement('custom-text', {text: 'Amount', color: 'var(--theme-text-primary-color)'}, {height: '30px'})
        this.amount = window.Builder.createElement('custom-input', {type: 'text', placeholder: 'Amount'})
        this.description = window.Builder.createElement('custom-input', {type: 'textarea', rows: '10', placeholder: 'Description'});
        this.save = window.Builder.createElement('custom-input', {type: 'button', icon: 'save', text: 'Save'})

        var p = [];
        window.API2.get_db('profiles').find({}, (err, profiles) => {
            profiles.forEach(profile => {
                p.push(profile.name);
            })
        })


        this.save.onclick = () => {
            this.save_to_db();
        }

        this.append(name_label, profile_label, this.name, this.profile, type_label, frequency_label, this.type, this.frequency, amount_label, this.amount, this.description, this.save)
        this.profile.items = p;
    }

    save_to_db(){
        var _name = this.name.value;
        var _frequency = this.frequency.value
        var _amount = this.amount.value;
        var _description = this.value;
        var _type = this.type.value

        var name = (_name != undefined) ? _name : null;
        var frequency = (_frequency != undefined) ? _frequency : null;
        var amount = (_amount != undefined) ? _amount : null;
        var type = (_type != undefined) ? _type : null;



        if(name !== null && frequency !== null && amount !== null && type !== null){
            var db = window.API2.dbs['finances'];
            console.log(this.item_id)
            db.findOne({_id: this.item_id}, (err, doc) => {
                if(doc){
                    window.API2.dbs['finances'].update({_id: this.item_id},{$set:{type: type.toLowerCase(), name : name, amount: amount, frequency: frequency}})
                }else{
                    window.API2.dbs['finances'].insert({type: type.toLowerCase(), name : name, amount: amount, frequency: frequency})
                }
                window.history.back();
            }) 
        }
    }


}
window.customElements.define('new-finance-item-view', NewFinanceItemView);
export{NewFinanceItemView};