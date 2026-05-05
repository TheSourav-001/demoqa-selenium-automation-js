const { createDriver } = require('../utils/driverSetup');
const FormsPage = require('../pages/FormsPage');
const { expect } = require('chai');
const { Key } = require('selenium-webdriver');

describe('DemoQA Practice Form Automation', function () {
    let driver;
    let formsPage;

    before(async function () {
        driver = await createDriver();
        formsPage = new FormsPage(driver);
    });

    it('should fill the form and verify success message', async function () {
        await formsPage.openBaseUrl("/automation-practice-form");
        
        await formsPage.fillStudentForm("Sourav Dipto", "Apu", "souravdipto@example.com", "1111111111");

        let dobInput = await formsPage.find(formsPage.dateOfBirthInput);
        await dobInput.click();
        await dobInput.sendKeys(Key.CONTROL, "a");
        await dobInput.sendKeys("27 Nov 2002");
        await dobInput.sendKeys(Key.TAB); 
    
        await formsPage.enterText(formsPage.subjectsInput, "MATHS");
        await (await formsPage.find(formsPage.subjectsInput)).sendKeys(Key.ENTER);

        const hobbyReading = await formsPage.find(formsPage.hobbiesReading);
        await driver.executeScript("arguments[0].click();", hobbyReading);

        await driver.executeScript("window.scrollBy(0, 500);");
        await formsPage.enterText(formsPage.uploadPicture, "C:\\Users\\hp\\Downloads\\8S.-Nikola-Tesla-1856-1943.jpg");

        await formsPage.enterText(formsPage.currentAddress, "YKSG2, DIU, Bangladesh");
        
        await formsPage.enterText(formsPage.stateInput, "NCR");
        await (await formsPage.find(formsPage.stateInput)).sendKeys(Key.ENTER);

        await formsPage.enterText(formsPage.cityInput, "Delhi");
        await (await formsPage.find(formsPage.cityInput)).sendKeys(Key.ENTER);
        await driver.sleep(1000);

        await formsPage.submitForm();
        await driver.sleep(2000);

        const successMsg = await formsPage.find(formsPage.submissionModalTitle);
        const msgText = await successMsg.getText();
        expect(msgText).to.equal("Thanks for submitting the form");
    });

    after(async function () {
        if (driver) {
            await driver.quit();
        }
    });
});