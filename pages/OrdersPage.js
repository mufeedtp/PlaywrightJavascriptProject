const { expect } = require('@playwright/test')

exports.OrdersPage = class OrdersPage{

     /**
     * @param {import('@playwright/test').Page} page
     */
     constructor(page){
        this.page = page
        this.orderId = page.locator('tbody .ng-star-inserted th')
        this.orderTable = page.locator('tbody .ng-star-inserted')
        // //h3[contains(text(),"zara coat 3")]//following::div[@class="prodTotal cartSection"]
    }

    async checkOrderTrackIdAndViewOrder(trackId){
        await this.orderId.first().waitFor()
        const totalTarckIds = await this.orderId.count()
        for(var i=0; i<totalTarckIds; i++){
            const id = await this.orderId.nth(i).textContent()
            if(id === trackId){
                var idRecieved = await this.orderId.nth(i).textContent()
                await this.orderTable.nth(i).locator('td button:has-text("View")').click()
                break;
            }
        }
        expect(trackId).toEqual(idRecieved);
    }
}