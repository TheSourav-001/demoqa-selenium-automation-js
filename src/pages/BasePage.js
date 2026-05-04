class BasePage {
    constructor(driver) {
        this.driver = driver;
    }

    // কোনো লিঙ্কে যাওয়ার জন্য
    async openUrl(url) {
        await this.driver.get(url);
    }

    // টাইপ করার জন্য সহজ ফাংশন
    async enterText(locator, text) {
        await this.driver.findElement(locator).sendKeys(text);
    }

    // ক্লিক করার জন্য সহজ ফাংশন
    async clickElement(locator) {
        await this.driver.findElement(locator).click();
    }
}

module.exports = BasePage;