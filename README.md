# TestCafe

[![Build Status](https://dev.azure.com/AutomationsTools/Execution/_apis/build/status/TestCafe?branchName=master)](https://dev.azure.com/AutomationsTools/Execution/_build/latest?definitionId=5&branchName=master)

#### Protractor is JavaScript based test automation framework. It uses WebDriverJS which is a nodejs binding implementation for Selenium 2.0/webdriver. Protractor uses Jasmine as the framework by default.

To install `testcafe` : 
```powershell
npm install testcafe --save-dev
```
To install `chai` assertion libraries : 
```powershell
npm install chai --save-dev
```
Run this command to download latest drivers :
```powershell 
npx webdriver-manager update
```
To install `allure report` :
```powershell 
npm install jasmine-allure-reporter --save-dev
```
To execute Protractor run the command below :
```powershell 
npx protractor <location to the conf.js>
```
Protractor execution is governed by its configuration file. A sample `conf.js` is shown below :
```javascript
exports.config = {
    capabilities: {   
      'browserName' : 'chrome'
    },
    framework: 'jasmine',
    specs: ['specs/*.js'],
 }   
```
If you want to execute your protractor tests in a remote server or Selenium Grid, you need to modify your `conf.js` slightly :
```javascript
exports.config = {
    seleniumAddress: 'http://xx.xx.xxx.xxx:4444/wd/hub',
    multiCapabilities:
   [ 
    {
    'browserName': 'chrome'
    }
  ],
    framework: 'jasmine',
    specs: ['specs/*.js'],
 }   
```
To generate allure reports you can add the following block of code to the `conf.js` :
```javascript
onPrepare: function() {
    var AllureReporter = require('jasmine-allure-reporter');
    jasmine.getEnv().addReporter(new AllureReporter({
      resultsDir: 'allure-results'
    })); 
  }
```
#### Protractor stands out from a standard WebdriverJS implementation in terms of the support it provides for Angular/Angular JS Applications:
Protractor exposes `browser` and `element` globally.
Once can easily identify html objects using their Angular properties with Protractor, like so :
```javascript
element(by.model("first"))
element(by.binding("bindingname"))
```
For non Angular identifiers, one can use :
```javascript
element(by.id("gobutton"))
element(by.css("[value='ADDITION']"))
```
A standard test set up in Protractor - Jasmine will look like this :
```javascript
describe('Mathematical Operations',()=>{

    it('Should Perform Addition',()=>{ 
       browser.get('https://juliemr.github.io/protractor-demo/');
       element(by.model("first")).sendKeys('10');
       element(by.model("operator")).click();
       element(by.css("[value='ADDITION']")).click();
       element(by.model("second")).sendKeys('20');
       element(by.id("gobutton")).click();
       expect (element(by.cssContainingText('.ng-binding','30'))).to.exist;
    })
 }   
```
For more on Protractor follow [this link](https://github.com/angular/protractor)
