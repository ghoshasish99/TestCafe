const LoginPage = require('../pageobjects/login.page');
const SearchPage = require('../pageobjects/search.page');
const PaymentPage = require('../pageobjects/payment.page')
const accountData = require('../testdata/account.json')
const productData = require('../testdata/product.json')
const addressData = require('../testdata/address.json') 
const paymentData = require('../testdata/payment.json') 

fixture `Buy Product` .page `${accountData.homeURL}`

    test('should be able to buy a product', async t => {
        let random = Math.floor(Math.random()*90000) + 10000;
        let email = accountData.create.email.replace('Ashish','Ashish'+random); 
        await LoginPage.createAccount(accountData.create.firstname,accountData.create.lastname,email,accountData.create.password);
        await t.expect(await (SearchPage.searchfield).visible).ok();
        await SearchPage.searchProduct(productData.searchitem);
        await t.expect(await (SearchPage.searchedProduct).visible).ok();
        await SearchPage.addProduct(productData.searchitem);
        await t.click(SearchPage.proceedToCheckout);
        await PaymentPage.enterAddressDetails(addressData.title,addressData.firstname,addressData.lastname,addressData.addr1,addressData.addr2,addressData.city,addressData.state,addressData.zip);
        await PaymentPage.enterPaymentDetails(paymentData.cardnumber,paymentData.nameOnCard,paymentData.expiryMonth,paymentData.expiryYear,paymentData.securityCode);
    });



