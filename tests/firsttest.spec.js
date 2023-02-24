// @ts-check
const {test, expect} = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { HomePage } = require('../pages/HomePage');
const { CartPage } = require('../pages/CartPage');
const { PaymentPage } = require('../pages/PaymentPage');
const { OrderConfirmationPage } = require('../pages/OrderConfirmationPage');
const { OrdersPage } = require('../pages/OrdersPage');

test.only('Login Google', async ({page})=>{

  const product = "ZARA COAT 3";
  const loginPage = new LoginPage(page);
  await loginPage.launchApplication();
  await loginPage.Login('rahul_9991@gmail.com','Tp@27041996');
  const homePage = new HomePage(page);
  const productAmount = await homePage.searchItemAndAddtoCart(product);
  await homePage.clickCartButton();
  const cartPage = new CartPage(page);
  const cartAmount =await cartPage.getProductAmount(product)
  expect(productAmount).toEqual(cartAmount);
  await cartPage.clickCheckOut();
  const paymentPage = new PaymentPage(page);
  await paymentPage.makeCreditCardPayment();

  const orderConfirmationPage = new OrderConfirmationPage(page);
  await orderConfirmationPage.VerifySuccessOrderConfoirmation()
  const orderID = await orderConfirmationPage.getOrderId()
  const orderId = orderID?.split(" ")[2]
  await orderConfirmationPage.navigateToOrderHistoryPage()
  const ordersPage = new OrdersPage(page)
  console.log(orderId)
  ordersPage.checkOrderTrackIdAndViewOrder(orderId)

  
  await page.pause();
});