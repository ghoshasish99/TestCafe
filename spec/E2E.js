var Selector = require('testcafe').Selector;
var Contacts = require('../pageobjects/Contact');
var fs = require('fs');
var jsonbody = fs.readFileSync('./testdata/contacts.json')
var inputs = JSON.parse(jsonbody)

fixture `Contact Operations` .page `${inputs.url}`;

test(`user is able to create a Contact`, async t =>{
    await t
          .click(Contacts.NewButton)
          .typeText(Contacts.Name,inputs.create.name)
          .typeText(Contacts.Email,inputs.create.email)
          .typeText(Contacts.Mobile,inputs.create.mobile)
          .typeText(Contacts.WorkPhone,inputs.create.workphone)
          .click(Contacts.CreateButton)
          .expect(Contacts.UserList.innerText).contains(inputs.create.name)
          .wait(5000)
})
test.skip(`user is able to update a Contact`, async t =>{
   Contacts.SelectEmployeeToBeOperated(t);
      await t
            .selectText(Contacts.Name)
            .pressKey('delete')
            .typeText(Contacts.Name,inputs.update.name)
            .selectText(Contacts.Email)
            .pressKey('delete')
            .typeText(Contacts.Email,inputs.update.email)
            .selectText(Contacts.Mobile)
            .pressKey('delete')
            .typeText(Contacts.Mobile,inputs.update.mobile)
            .selectText(Contacts.WorkPhone)
            .pressKey('delete')
            .typeText(Contacts.WorkPhone,inputs.update.workphone)
            .click(Contacts.UpdateButton)
            .expect(Contacts.UserList.innerText).contains(inputs.update.name)
            .wait(5000)
})
test(`user is able to delete a Contact`, async t =>{
    Contacts.SelectEmployeeToBeOperated(t);
    await t
          .click(Contacts.DeleteButton)
          .expect(Contacts.UserList.innerText).notContains(inputs.create.name)
          .wait(5000)
})