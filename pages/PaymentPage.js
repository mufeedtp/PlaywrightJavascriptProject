const { expect } = require('@playwright/test')

exports.PaymentPage = class PaymentPage {

    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page){
        this.page = page
        this.creditCard = page.locator('.payment__type--cc.active')
        this.creditCardNumber = page.locator('input.text-validated').first()
        this.expiryDateMonth = page.getByRole('combobox').first()
        this.expiryDateYear = page.getByRole('combobox').nth(1)
        this.cvvCode = page.locator("input[class='input txt']").first()
        this.nameOnCard = page.locator("input[class='input txt']").last()
        this.applyCouponTextBox = page.locator("input[name='coupon']")
        this.applyCouponButton = page.locator("button[type='submit']")
        this.couponAppliedTextMessage = page.locator("p.ng-star-inserted")
        this.emailTextBox = page.locator(".user__name input[type='text']")
        this.selectCountryTextBox = page.locator("input[placeholder='Select Country']") 
        this.countrySuggestion = page.locator("span.ng-star-inserted")
        this.placeOrderbutton = page.locator("a.action__submit");
    }

    async makeCreditCardPayment(){
        await this.creditCard.click()
        await this.creditCardNumber.fill('956878549856')
        await this.expiryDateMonth.selectOption('08')
        await this.expiryDateYear.selectOption('29')
        await this.cvvCode.fill('658')
        await this.nameOnCard.fill('mufeed')
        await this.applyCouponTextBox.fill('rahulshettyacademy')
        await this.applyCouponButton.click()
        var message = await this.couponAppliedTextMessage.textContent()
        expect(message).toContain('Coupon Applied')
        await this.emailTextBox.fill('schgsh@gmail.com')
        await this.selectCountryTextBox.type('India',{delay:100});
        await this.countrySuggestion.first().waitFor();
        const ele = await this.countrySuggestion.count()
        for(let i=0; i<ele; i++ ){
            const country = await this.countrySuggestion.nth(i).textContent()
            if(country === " India"){
                await this.countrySuggestion.nth(i).click();
                break;
            }
        }
    
        await this.placeOrderbutton.click()

    }


}