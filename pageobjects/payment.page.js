var {Selector,t} = require('testcafe')

class PaymentPage extends Page {
    
    get title () { return Selector('#datitle') }
    get firstname () { return Selector('#dafirstname') }
    get lastname () { return Selector('#dalastname') }
    get addr1 () { return Selector('#daaddressline1')}
    get addr2 () { return Selector('#daaddressline2')}
    get city () { return Selector('#dacity')}
    get state () { return Selector('#dastateprovinceregion')}
    get zip () { return Selector('#dazippostcode')}
    get btnNext () { return Selector('#buttonnext > .MuiButton-label')}
    get cardNo () { return Selector('#cardnumber') }
    get nameOnCard () { return Selector('#nameoncard') }
    get expirymonth () { return Selector('#expirymonth') }
    get expiryyear () { return Selector('#expiryyear')}
    get securitycode () { return Selector('#securitycode')}
    get btnConfirm () { return Selector('//*[text()="Confirm"]')}

    async enterAddressDetails(title,fname,lname,addr1,addr2,city,state,zip){
        await t
            .typeText(this.title,title)
            .typeText(this.firstname,fname)
            .typeText(this.lastname,lname)
            .typeText(this.addr1,addr1)
            .typeText(this.addr2,addr2)
            .typeText(this.city,city)
            .typeText(this.state,state)
            .typeText(this.zip,zip)
    }

    async enterPaymentDetails(cardNo,name,month,year,code){
        await t
            .click(this.btnNext)
            .typeText(this.cardNo,cardNo)
            .typeText(this.nameOnCard,name)
            .typeText(this.expirymonth,month)
            .typeText(this.expiryyear,year)
            .typeText(this.securitycode,code)
            .click(this.btnConfirm)
    }
}

module.exports = new PaymentPage();
