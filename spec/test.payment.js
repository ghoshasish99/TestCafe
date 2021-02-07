const LoginPage = require('../pageobjects/login.page');
const SearchPage = require('../pageobjects/search.page');
const PaymentPage = require('../pageobjects/payment.page')
const accountData = require('../../testdata/account.json')
const productData = require('../../testdata/product.json')
const addressData = require('../../testdata/address.json') 
const paymentData = require('../../testdata/payment.json') 

describe('Buy Product', () => {
    it('should be able to buy a product', () => {
        let random = Math.floor(Math.random()*90000) + 10000;
        let email = accountData.create.email.replace('Ashish','Ashish'+random); 
        LoginPage.open();
        LoginPage.createAccount(accountData.create.firstname,accountData.create.lastname,email,accountData.create.password)
        expect(SearchPage.searchfield).toBeVisible();
        SearchPage.searchProduct(productData.searchitem);
        expect(SearchPage.searchedProduct).toBeVisible();
        SearchPage.addProduct(productData.searchitem);
        SearchPage.proceedToCheckout.click();
        PaymentPage.enterAddressDetails(addressData.title,addressData.firstname,addressData.lastname,addressData.addr1,addressData.addr2,addressData.city,addressData.state,addressData.zip);
        PaymentPage.enterPaymentDetails(paymentData.cardnumber,paymentData.nameOnCard,paymentData.expiryMonth,paymentData.expiryYear,paymentData.securityCode);
    });
});


