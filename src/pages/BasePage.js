const { By } = require('selenium-webdriver');

class BasePage {
    constructor(driver) {
        this.driver = driver;
        this.baseUrl = 'https://demoqa.com';
    }

    // কোনো লিঙ্কে যাওয়ার জন্য
    async openUrl(url) {
        await this.driver.get(url);
    }

    // বেস ইউআরএল সহ খোলার জন্য
    async openBaseUrl(path = '') {
        await this.driver.get(this.baseUrl + path);
    }

    // এলিমেন্ট খুঁজে বের করার জন্য
    async find(locator) {
        return await this.driver.findElement(locator);
    }

    // টাইপ করার জন্য সহজ ফাংশন
    async enterText(locator, text) {
        const element = await this.find(locator);
        await element.clear();
        await element.sendKeys(text);
    }

    // ক্লিক করার জন্য সহজ ফাংশন
    async clickElement(locator) {
        const element = await this.find(locator);
        await element.click();
    }

    // এলিমেন্টের টেক্সট পাওয়ার জন্য
    async getText(locator) {
        const element = await this.find(locator);
        return await element.getText();
    }

    // এলিমেন্ট ভিজিবল হওয়ার জন্য অপেক্ষা করা
    async waitForElement(locator, timeout = 10000) {
        const { WebDriverWait, until } = require('selenium-webdriver');
        const wait = new WebDriverWait(this.driver, timeout);
        return await wait.until(until.elementLocated(locator));
    }
}

module.exports = BasePage;
