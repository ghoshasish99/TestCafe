var {Selector,t} = require('testcafe')

class SearchPage {
    
    get searchfield () { return Selector('input[aria-label="Product search"]') }
    get btnSearch () { return Selector('button[aria-label="Search"]') }
    get searchedProduct () { return Selector('.MuiCardContent-root > :nth-child(1)') }
    get btnAddToBasket () { return Selector('span').withText('Add to your basket')}
    get iconBasket () { return Selector('#basket')}
    get proceedToCheckout () { return Selector('#proceedtocheckout')}
    

    async searchProduct(item){
        await t
            .typeText(this.searchfield,item)
            .click(this.btnSearch)
    }

    async addProduct(item) {
        await t
            .click(Selector('a').withText(item))
            .click(this.btnAddToBasket)
            .click(this.iconBasket)
    }
}

module.exports = new SearchPage();
