// @ts-check
const {test, expect} = require('@playwright/test');
const { POManager } = require('../pages/POManager');

//conver test data file to --> string --> then to javascript object;
const data = JSON.parse(JSON.stringify(require("../testdata/testdata.json")))

test.only('Login Google', async ({page})=>{

  const poManager = new POManager(page) 
  const loginPage = poManager.getLoginPage();
  await loginPage.launchApplication();
  await loginPage.Login(data.username,data.password);
  const homePage = poManager.getHomePage()
  const productAmount = await homePage.searchItemAndAddtoCart(data.product);
  await homePage.clickCartButton();
  const cartPage = poManager.getCartPage();
  const cartAmount =await cartPage.getProductAmount(data.product)
  expect(productAmount).toEqual(cartAmount);
  await cartPage.clickCheckOut();
  const paymentPage = poManager.getPaymentPage();
  await paymentPage.makeCreditCardPayment();

  const orderConfirmationPage = poManager.getOrderConfirmationPage();
  await orderConfirmationPage.VerifySuccessOrderConfoirmation()
  const orderID = await orderConfirmationPage.getOrderId()
  const orderId = orderID?.split(" ")[2]
  await orderConfirmationPage.navigateToOrderHistoryPage()
  const ordersPage = poManager.getOrdersPage()
  console.log(orderId)
  ordersPage.checkOrderTrackIdAndViewOrder(orderId)  
  await page.pause();
});