const { CartPage } = require('./CartPage')
const { HomePage } = require('./HomePage')
const { LoginPage } = require('./LoginPage')
const { OrderConfirmationPage } = require('./OrderConfirmationPage')
const { OrdersPage } = require('./OrdersPage')
const { PaymentPage } = require('./PaymentPage')

exports.POManager = class POManager {

    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page){
        this.page = page
        this.loginPage = new LoginPage(this.page)
        this.homePage = new HomePage(this.page)
        this.cartPage = new CartPage(this.page)
        this.paymentPage = new PaymentPage(this.page)
        this.orderConfirmationPage = new OrderConfirmationPage(this.page)
        this.ordersPage = new OrdersPage(this.page)
    }

    getLoginPage(){
        return this.loginPage;
    }

    getHomePage() {
        return this.homePage;
    }

    getCartPage(){
        return this.cartPage;
    }

    getPaymentPage(){
        return this.paymentPage;
    }

    getOrderConfirmationPage(){
        return this.orderConfirmationPage;
    }

    getOrdersPage(){
        return this.ordersPage;
    }
}