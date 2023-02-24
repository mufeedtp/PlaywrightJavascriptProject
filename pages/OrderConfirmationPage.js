const { expect } = require('@playwright/test')


exports.OrderConfirmationPage = class OrderConfirmationPage {

    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page){
        this.page = page
        this.orderConfirmationMessage =page.locator("h1.hero-primary")
        this.orderHistoryPageLink = page.locator('label:has-text("Orders History Page")') 
        this.orderTrackId = page.locator('label.ng-star-inserted')
    }

    async VerifySuccessOrderConfoirmation(){
        const message = await this.orderConfirmationMessage.textContent()
        expect(message).toContain("Thankyou for the order")
    }

    async navigateToOrderHistoryPage(){
        await this.orderHistoryPageLink.click()
    }

    async getOrderId(){
        return await this.orderTrackId.textContent()
    }
}