const { createDriver } = require('../utils/driverSetup');
const FormsPage = require('../pages/FormsPage');
const { expect } = require('chai');
const { Key } = require('selenium-webdriver');

describe('DemoQA Practice Form Automation', function () {
    let driver;
    let formsPage;

    // টেস্ট শুরুর আগে ড্রাইভার এবং পেজ অবজেক্ট ইনিশিয়ালাইজ করা
    before(async function () {
        driver = await createDriver();
        formsPage = new FormsPage(driver);
    });

    it('should fill the form and verify success message', async function () {
        // ১. ফর্ম পেজে নেভিগেট করা
        await formsPage.openBaseUrl("/automation-practice-form");
        
        // ২. নাম, ইমেইল ও মোবাইল নম্বর দেওয়া
        await formsPage.fillStudentForm("Sourav Dipto", "Apu", "souravdipto@example.com", "1111111111");
        await formsPage.sleep(1000); // দেখার সুবিধার জন্য সাময়িক স্লিপ

        // ৩. ডেট অফ বার্থ সেট করা (আপনার দেওয়া লজিক অনুযায়ী)
        let dobInput = await formsPage.find(formsPage.dateOfBirthInput);
        await dobInput.click();
        await dobInput.sendKeys(Key.CONTROL, "a");
        await dobInput.sendKeys("27 Nov 2002");
        await dobInput.sendKeys(Key.TAB); 
        await driver.sleep(1000);

        // ৪. সাবজেক্ট এবং হবি সিলেক্ট করা
        await formsPage.enterText(formsPage.subjectsInput, "MATHS");
        await (await formsPage.find(formsPage.subjectsInput)).sendKeys(Key.ENTER);

        const hobbyReading = await formsPage.find(formsPage.hobbiesReading);
        await driver.executeScript("arguments[0].click();", hobbyReading);

        // ৫. স্ক্রল করা এবং ফাইল আপলোড
        await driver.executeScript("window.scrollBy(0, 500);");
        // আপনার লোকাল পিসির সঠিক পাথ এখানে দিন
        await formsPage.enterText(formsPage.uploadPicture, "C:\\Users\\hp\\Downloads\\8S.-Nikola-Tesla-1856-1943.jpg");

        // ৬. অ্যাড্রেস ও স্টেট/সিটি সিলেক্ট করা
        await formsPage.enterText(formsPage.currentAddress, "YKSG2, DIU, Bangladesh");
        
        await formsPage.enterText(formsPage.stateInput, "NCR");
        await (await formsPage.find(formsPage.stateInput)).sendKeys(Key.ENTER);

        await formsPage.enterText(formsPage.cityInput, "Delhi");
        await (await formsPage.find(formsPage.cityInput)).sendKeys(Key.ENTER);
        await driver.sleep(1000);

        // ৭. ফর্ম সাবমিট করা
        await formsPage.submitForm();
        await driver.sleep(2000);

        // ৮. অ্যাসারশন (ভেরিফাই করা যে সাবমিট হয়েছে কি না)
        const successMsg = await formsPage.find(formsPage.submissionModalTitle);
        const msgText = await successMsg.getText();
        expect(msgText).to.equal("Thanks for submitting the form");
    });

    // টেস্ট শেষে ব্রাউজার বন্ধ করা
    after(async function () {
        if (driver) {
            await driver.quit();
        }
    });
});