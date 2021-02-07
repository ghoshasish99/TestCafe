const Page = require('./page');
var {Selector, t} = require('testcafe')

class LoginPage extends Page {
    
    get email () { return Selector('#email') }
    get password () { return Selector('#password') }
    get btnSubmit () { return Selector('form.login > .MuiButtonBase-root > .MuiButton-label') }
    get loginerror () { return Selector('[class="MuiTypography-root MuiTypography-caption MuiTypography-colorSecondary MuiTypography-alignCenter"]')}
    get btncreateAccount1() { return Selector('div.login > .MuiButtonBase-root > .MuiButton-label')}
    get firstname () { return Selector('#firstname') }
    get lastname () { return Selector('#lastname') }
    get registeremail () { return Selector('#registeremail') }
    get confirmpassword () { return Selector('#confirmpassword') }
    get btncreateAccount2() { return Selector('form.register > .MuiButtonBase-root > .MuiButton-label')}
    get productSearch () { return Selector('input[aria-label="Product search"]')}


    async login (username, password) {
        await t
            .typeText(this.email,username)
            .typeText(this.password,password)
            .click(this.btnSubmit)
    } 

    async createAccount(fname,lname,email,password){
        await t
            .click(this.btncreateAccount1)
            .typeText(this.firstname,fname)
            .typeText(this.lastname,lname)
            .typeText(this.registeremail,email)
            .typeText(this.password,password)
            .typeText(this.confirmpassword,password)
            .click(this.btncreateAccount2)
    }

    open () {
        return super.open('cts-shop/login');
    }
}

module.exports = new LoginPage();
