const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost/0000/WHIST/WHIST-NJS/public/dev/detail.htm');
    await page.pdf({ path: 'example.pdf' });
    await browser.close();
})();