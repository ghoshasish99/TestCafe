const LoginPage = require('../pageobjects/login.page');
const SearchPage = require('../pageobjects/search.page');
const accountData = require('../testdata/account.json');
const productData = require('../testdata/product.json');

fixture `Search and Add` .page `http://awswrkshpalb-1570520390.us-west-2.elb.amazonaws.com:3000/cts-shop/login`

    test('should be able to search and a product to basket', async t => {
        let random = Math.floor(Math.random()*90000) + 10000;
        let email = accountData.create.email.replace('Ashish','Ashish'+random); 
        await LoginPage.createAccount(accountData.create.firstname,accountData.create.lastname,email,accountData.create.password)
        await t.expect(await (SearchPage.searchfield).exists).ok();
        await SearchPage.searchProduct(productData.searchitem);
        await t.expect(await (SearchPage.searchedProduct).visible).ok();
        await SearchPage.addProduct(productData.searchitem);
        await t.expect(await (SearchPage.proceedToCheckout).visible).ok();
});


