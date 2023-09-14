const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');


// Before running the file, automatically install the modular using the "npm install" or "yarn" command in the console.

// Use "node gmail.mjs" to run the file.

(async () => {
    puppeteer.use(StealthPlugin());

    const GmailOpt = {
        gmail:"israilmursalov9@gmail.com",
        password:"israil1977"
    }

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto('https://mail.google.com', { waitUntil: 'networkidle2' });

    await page.type('input[type="email"]', GmailOpt.gmail);
    await page.click('div[id="identifierNext"]');

    await page.waitForSelector('input[type="password"]', { visible: true });
    await page.type('input[type="password"]', GmailOpt.password);
    await page.click('div[id="passwordNext"]');
    await page.waitForSelector('span[class="zF"]');

    const unreadCount = await page.evaluate(async () => {
        const UnReadMessages = document.querySelectorAll('span[class="zF"]');
        if(UnReadMessages){
            return UnReadMessages.length;
        }
    });

    console.log("The number of unread messages: " + unreadCount);

    await browser.close();
})();
