import {View} from '/views/View.js';

class NewProfileView extends View{
    constructor(){
        super();
    }

    connectedCallback(){
        this.classList.add('view')
        this.create_view();
        window.DP.dispatch("VIEW_LOAD");
    }

    create_view(){
        var name_label = window.Builder.createElement('custom-text', {text: 'Name', color: 'var(--theme-text-primary-color)'}, {height: '30px'})
        this.name = window.Builder.createElement('custom-input', {type: 'text', placeholder: 'Name'})
        this.description = window.Builder.createElement('custom-input', {type: 'textarea', rows: '10', placeholder: 'Description'});
        this.save = window.Builder.createElement('custom-input', {type: 'button', icon: 'save', text: 'Save'})

        this.save.onclick = () => {
            this.save_to_db();
        }

        this.append(name_label, this.name, this.description, this.save)
    }

    save_to_db(){
        var _name = this.name.value;
        var _description = this.description.value;
    
        var name = (_name != undefined) ? _name : null;
        var description = (_description != undefined) ? _description : null;

        if(name !== null && description !== null){
            var db = window.API2.dbs['profiles'];
            db.insert({name: name, description: description}, (err, docs) => {
                window.history.back();
            })
        }
    }


}
window.customElements.define('new-profile-view', NewProfileView);
export{NewProfileView};