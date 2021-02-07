# TestCafe

[![Build Status](https://dev.azure.com/AutomationsTools/Execution/_apis/build/status/TestCafe?branchName=master)](https://dev.azure.com/AutomationsTools/Execution/_build/latest?definitionId=6&branchName=master)

#### Testcafe is JavaScript based test automation framework. It directly works with the installed browsers hence no drivers are required.

### Getting Started 
* To install testcafe, run this command : `npm install testcafe --save-dev`
* To install `testcafe-reporter-xunit`, run this command : `npm install testcafe-reporter-xunit --save-dev`

To execute testcafe tests run this command : `npx testcafe <browser_alias> <location_of_your_tests>`
Some examples can be found below :
```powershell 
npx testcafe chrome mytest.js # For specifying a particular test
npx testcafe chrome spec/*.js # For specifying a Glob Pattern
npx testcafe chrome:headless spec/*.js # For running tests headless
npx testcafe chrome:headless spec/*.js --reporter spec,xunit:report.xml # For specifying reporter type and report location 
```

Testcafe's SelectorFactory `Selector` and TestController `t` can be used to identify elements on a webpage and interact with them.
Some examples to identify elements are shown below :
```javascript
Selector('#email')
Selector('#password')
Selector('a').withText(item)
```

A standard test set up in Testcafe will look like this :
```javascript
fixture `Login and Registration` .page `http://awswrkshpalb-1570520390.us-west-2.elb.amazonaws.com:3000/cts-shop/login`

    it('login should fail with invalid credentials', async t =>{ 
       await t
         .typeText(Selector('#email'),'username')
         .typeText(Selector('#password'),'password')
         .click(Selector('form.login > .MuiButtonBase-root > .MuiButton-label'))
         .expect(Selector('#loginerror').visible).ok()
    })   
```
The `fixture` and `test` functions are exposed globally.

For more on Testcafe follow [this link](https://devexpress.github.io/testcafe/)
