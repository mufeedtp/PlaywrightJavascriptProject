const { expect } = require('@playwright/test');
exports.CartPage = class CartPage {
 
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page){
        this.page = page;
        this.prodcutName = page.locator('.cartSection h3')
        this.productNameList = page.locator('div.cartSection h3')
        this.productPrice = page.locator('.prodTotal p')
        this.checkOutButton = page.getByRole('button', { name: 'Checkout❯' });
        // //h3[contains(text(),"zara coat 3")]//following::div[@class="prodTotal cartSection"]
    }

    async getProductAmount(product){
        var amount = await this.page.locator('//h3[contains(text(),"'+product.toLowerCase()+'")]//following::div[@class="prodTotal cartSection"]').first().textContent();
        amount = amount.split(" ").pop();
        return amount
    }

    async clickCheckOut(){
        await this.checkOutButton.click();
    }
}