const LoginPage = require('../pageobjects/login.page');
const SearchPage = require('../pageobjects/search.page');
const accountData = require('../../testdata/account.json')
const productData = require('../../testdata/product.json')

describe('Search and Add', () => {
    it('should be able to search and a product to basket', () => {
        let random = Math.floor(Math.random()*90000) + 10000;
        let email = accountData.create.email.replace('Ashish','Ashish'+random); 
        LoginPage.open();
        LoginPage.createAccount(accountData.create.firstname,accountData.create.lastname,email,accountData.create.password)
        expect(SearchPage.searchfield).toBeVisible();
        SearchPage.searchProduct(productData.searchitem);
        expect(SearchPage.searchedProduct).toBeVisible();
        SearchPage.addProduct(productData.searchitem);
        expect(SearchPage.proceedToCheckout).toBeVisible();
    });
});


