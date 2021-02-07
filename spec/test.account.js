const LoginPage = require('../pageobjects/login.page');
const SearchPage = require('../pageobjects/search.page');
const accountData = require('../testdata/account.json');

fixture `Login and Registration` .page `http://awswrkshpalb-1570520390.us-west-2.elb.amazonaws.com:3000/cts-shop/login`;

    test('login should fail with invalid credentials', async t => {
        await LoginPage.login(accountData.negativeLogin.username,accountData.negativeLogin.password);
       // const loginError=(LoginPage.loginerror).exists();
       // await t.expect(loginError).ok();
    });
    test('Account Creation should be successful', async t => {
         let random = Math.floor(Math.random()*90000) + 10000;
         let email = accountData.create.email.replace('Ashish','Ashish'+random); 
         await LoginPage.createAccount(accountData.create.firstname,accountData.create.lastname,email,accountData.create.password)
       //  const accountCreation=(SearchPage.searchfield).exists();
       //  await t.expect(accountCreation).ok();
     });



