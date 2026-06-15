const pt = require('puppeteer');
const fs = require('fs');
const path = require('path');
const leTitre  = "WHIST-20260527";

pt.launch().then(async () => {
		const browser = await pt.launch();
		const page = await browser.newPage();
		const htmlPath = path.join(__dirname, 'index.html');
		const htmlContent = fs.readFileSync(htmlPath, 'utf8');
        console.log("EXPORT-PDF\t"+leTitre);
		await page.setContent(htmlContent);
		await page.pdf({
			path: leTitre, 	
			format: 'A4', 
            landscape: true, 	
			printBackground: true 	
		});
		await browser.close();
		});
    return true;
