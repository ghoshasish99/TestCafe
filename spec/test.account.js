const LoginPage = require('../pageobjects/login.page');
const SearchPage = require('../pageobjects/search.page');
const accountData = require('../testdata/account.json');

fixture `Login and Registration` .page `${accountData.homeURL}`;

    test('login should fail with invalid credentials', async t => {
        await LoginPage.login(accountData.negativeLogin.username,accountData.negativeLogin.password);
        await t.expect(await (LoginPage.loginerror).exists).ok();
    });
    test('Account Creation should be successful', async t => {
         let random = Math.floor(Math.random()*90000) + 10000;
         let email = accountData.create.email.replace('Ashish','Ashish'+random); 
         await LoginPage.createAccount(accountData.create.firstname,accountData.create.lastname,email,accountData.create.password)
         const accountCreation=(SearchPage.searchfield).exists;
         await t.expect(accountCreation).ok();
     });



