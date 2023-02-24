const { expect } = require('@playwright/test');
exports.HomePage = class HomePage {
 
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page){
        this.page = page;
        this.productTitles = page.locator(".card-body b");
        this.productCard = page.locator(".card-body");
        this.cartButton = page.locator("button[routerlink='/dashboard/cart']");
    }

    async searchItemAndAddtoCart(item) {
        await this.page.waitForLoadState('networkidle');
        const titles = await this.productTitles.allTextContents();
        for (let i = 0; i < titles.length; i++) {
            if(titles[i].toUpperCase().match(item)){
                var amount = await this.productCard.nth(i).locator('.text-muted').first().textContent();
                amount = amount.split(" ")[1];
                await this.productCard.nth(i).getByRole('button').filter({ hasText: 'Add To Cart'}).first().click();
            }
        }
        return amount;
    }

    async clickCartButton(){
        await this.cartButton.click();
    }
}