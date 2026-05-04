const BasePage = require('./BasePage');
const { By } = require('selenium-webdriver');

class FormsPage extends BasePage {
    constructor(driver) {
        super(driver);
        
        // সব লোকেটার এখানে ডিফাইন করা হলো
        this.firstName = By.id('firstName');
        this.lastName = By.id('lastName');
        this.userEmail = By.id('userEmail');
        this.genderMale = By.id('gender-radio-1');
        this.userNumber = By.id('userNumber');
        this.dateOfBirthInput = By.id('dateOfBirthInput');
        this.subjectsInput = By.id('subjectsInput');
        this.hobbiesReading = By.id('hobbies-checkbox-2');
        this.uploadPicture = By.id('uploadPicture');
        this.currentAddress = By.id('currentAddress');
        this.stateInput = By.id('react-select-3-input');
        this.cityInput = By.id('react-select-4-input');
        this.submissionModalTitle = By.id('example-modal-sizes-title-lg');
    }

    // ফর্মের বেসিক তথ্য পূরণ করার মেথড
    async fillStudentForm(fName, lName, email, mobile) {
        await this.enterText(this.firstName, fName);
        await this.enterText(this.lastName, lName);
        await this.enterText(this.userEmail, email);
        
        // রেডিও বাটনে সরাসরি ক্লিক অনেক সময় কাজ করে না, তাই JS ক্লিক ব্যবহার করা হয়েছে
        const maleRadio = await this.find(this.genderMale);
        await this.driver.executeScript("arguments[0].click();", maleRadio);
        
        await this.enterText(this.userNumber, mobile);
    }

    async submitForm() {
        const btn = await this.find(By.id('submit'));
        await this.driver.executeScript("arguments[0].click();", btn);
    }

    // ওয়েট করার জন্য
    async sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

module.exports = FormsPage;