import { puppeteer } from 'puppeteer';
var strHTML  = parent.frames['RESU'].document.getElementById('RESULTATS').outerHTML;
generate2PDF("WHIST",strHTML)

function generate2PDF(title, content)
	{
    console.log("EXPORT-JS\tPRINTING HTML STRING TO PDF...");
	//const puppeteer = require('puppeteer');
	//const fs = require('fs');
	//const path = require('path');

	(async () => {
		const browser = await puppeteer.launch();
		const page = await browser.newPage();
		//const htmlPath = path.join(__dirname, 'index.html');
		//const htmlContent = fs.readFileSync(htmlPath, 'utf8');
        console.log("EXPORT-JS\t"+title);
		await page.setContent(content);
		await page.pdf({
			path: title, 	
			format: 'A4', 
            landscape: true, 	
			printBackground: true 	
		});
		await browser.close();
		})();
    return true;
	}
