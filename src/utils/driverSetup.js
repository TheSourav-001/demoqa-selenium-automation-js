const { Builder } = require('selenium-webdriver');

async function createDriver() {
    // ক্রোম ব্রাউজার ওপেন করার জন্য ড্রাইভার তৈরি করা হচ্ছে
    let driver = await new Builder().forBrowser('chrome').build();
    
    // ব্রাউজার উইন্ডোটি বড় (Maximize) করা
    await driver.manage().window().maximize();
    
    return driver;
}

// এই ফাংশনটি অন্য ফাইল থেকে ব্যবহার করার জন্য এক্সপোর্ট করা হচ্ছে
module.exports = { createDriver };