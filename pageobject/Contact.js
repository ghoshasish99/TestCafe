var Selector = require('testcafe').Selector;

class Contacts{
    get NewButton(){
        return Selector('body > app-root > div > contact-list > div > div:nth-child(1) > button');
    }
    get Name(){
        return Selector('input[name="contact-name"]');
    }
    get Email(){
        return Selector('input[name="contact-email"]');
    }
    get Mobile(){
        return Selector('input[name="contact-phone-mobile"]');
    }
    get WorkPhone(){
        return Selector('input[name="contact-phone-work"]');
    }
    get CreateButton(){
        return Selector('body > app-root > div > contact-list > div > div.col-md-5.col-md-offset-2 > contact-details > div:nth-child(2) > form > button.btn.btn-primary');
    }
    get UpdateButton(){
        return Selector('body > app-root > div > contact-list > div > div.col-md-5.col-md-offset-2 > contact-details > div:nth-child(2) > form > button.btn.btn-info');
    }
    get DeleteButton(){
        return Selector('body > app-root > div > contact-list > div > div.col-md-5.col-md-offset-2 > contact-details > div:nth-child(2) > form > button.btn.btn-danger');
    }
    get UserList(){
        return Selector('body > app-root > div > contact-list > div > div:nth-child(1) > ul');
    }
    SelectEmployeeToBeOperated = async t =>{
        await t
               .click('body > app-root > div > contact-list > div > div:nth-child(1) > ul > li:nth-child(3)')
               
    }
}

module.exports = new Contacts();