const config = require("../playwright.config");

// @ts-check
exports.LoginPage = class LoginPage {
 
    constructor(page){
        this.page = page;
        this.userName = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
        this.loginButton = page.locator("input[value='Login']");
    }

    async launchApplication() {
        await this.page.goto(config.use.baseURL);        
    }
    async Login(username, password){
        await this.userName.fill(username);
        await this.password.fill(password);
        // await this.page.waitForNavigation();
        await this.loginButton.click();
    }

    
}