var express    = require('express');
var serveIndex = require('serve-index');
var path = require('path');
const fs = require('fs');

var app = express()

var appLoc = path.join(__dirname, '');
console.log("DIRNAME:"+appLoc);

app.use('/', express.static('/'), serveIndex('/', {'icons': true}))

app.use(express.static(__dirname + "/"))
app.use('/', serveIndex(__dirname + '/'));
app.use(express.json());

app.get('/JOUEURS', (req, res) => {
    const contenuJ = fs.readFileSync(__dirname + '/JOUEURS.csv.json', 'utf8');
    res.send(contenuJ);
    });
app.get('/ANNONCES', (req, res) => {
    const contenuA = fs.readFileSync(__dirname + '/POINTS.csv.json', 'utf8');
    res.send(contenuA);
    });
app.get('/CONFIG', (req, res) => {
    //const contenuA = fs.readFileSync(__dirname + '/WHIST.config.json', 'utf8');
    //res.send(contenuA);
    //res.send(JSON.stringify(contenuA, null, 2));
    fs.readFile(__dirname + '/WHIST.config.json', 'utf8', (err, data) => {
        res.type("application/json");
        res.send(data);
        });
    });
app.get('/myIP', (req, res) => {
    const os = require("os");
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
        for (const net of interfaces[name]) {
            if (net.family === "IPv4" && !net.internal) {
                console.log(net.address);
                res.send(net.address);
                }
            }
        } 
    });

app.get('/favicon.ico', (req, res) => {
  res.status(204).end();
});

app.use('/WHIST00', (req, res) => {
    var appLoc = path.join(__dirname, "Avertissement.htm" );
    console.log("Display file "+appLoc);
    //var htmlWarning = "";
    //fetch(appLoc)
    //    .then(response => response.text())
    //    .then(html => {
    //        var htmlWarning = html;
    //        });
    //res.send(htmlWarning);
    res.sendFile(appLoc);
    });

app.get('/pdfs', (req, res) => {
    const dir = path.join(__dirname, '');
    const files = fs.readdirSync(dir).filter(file => file.endsWith('.pdf'));
    const html = files.map(file => `<li><a href="/pdf/${file}">${file}</a></li>`).join('');
    res.send(`
        <h1>PDF Files</h1>
        <ul>${html}</ul>
        `);
    });

app.use('/pdf', express.static(path.join(__dirname, '')));

app.get('/Users/chef/WHIST/WHIST-NJS/public/dev/restoreLS.htm', (req, res) => {
    res.sendFile(path.join(__dirname, 'restoreLS.htm'));
    //res.status(200);
    });

app.get('/Users/chef/WHIST/WHIST-NJS/public/dev/headerIN.html.txt', (req, res) => {
    res.sendFile(path.join(__dirname, './headerIN.html.txt'));
    //res.status(200);
    });
app.get('/Users/chef/WHIST/WHIST-NJS/public/dev/headerOUT.html.txt', (req, res) => {
    res.sendFile(path.join(__dirname, './headerOUT.html.txt'));
    //res.status(200);
    });

app.get('/WHIST/WHIST-NJS/public/dev/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
    //res.status(200);
    });

app.get('/api/moi', async (req, res) => {
    res.json([
        { id: 1, prenom: 'Jean-Jacques', nom: 'LIEFFRIG' },
        { id: 2, prenom: 'Jean-Jacques', nom: 'LIEFFRIG' }
    ]);
});

app.post('/api/generate2PDF', (req, res) => {
    console.log(req.body.in); 
    console.log(req.body.out); 
    console.log(req.body.nbr);
    console.log(req.body.fld);

    res.json({ received: req.body });
    });

app.get('/api/generate2PDF', async (req, res) => {
    console.log("========================== Proceed generate PDF file generation ==========================");
    console.log("WEB.JS|generate2PDF ........");

    const pt   = require('puppeteer');
    const fs   = require('fs');
    const path = require('path');

    console.log("=-".repeat(40));
    console.log(req.query);
    console.log("=-".repeat(40));

    console.log("PDF File Name.:"+req.query.out);
    console.log("HTM File Name.:"+req.query.in); 
    console.log("Nombre de jeux:"+req.query.nbr); 
    console.log("Folder........:"+req.query.fld); 
 
    const pdfFile = req.query.out;
    const htmFile = req.query.in;
    let nbrJeux   = parseInt(req.query.nbr);
    let fldName   = String(req.query.fld);

    const now = new Date();
    nbrJeux += 1;
    
    console.log("\nGenerating PDF at "+now.toLocaleTimeString()+".....");
    pt.launch().then(async () => {
        const ctrlVText0 = fs.readFileSync(htmFile, 'utf8');
        const clef1 = "<"+"tr"+"><"+"td"+">"+String(nbrJeux)+"<"+"/td"+">";
        const clef2 = "</tbody>";
        const clef3 = "table";
        const xpos1 = ctrlVText0.indexOf(clef1) - 1;
        const xpos2 = ctrlVText0.indexOf(clef2) - 1;
        const xpos3 = ctrlVText0.indexOf(clef3) - 1;
        const ctrlVText1 = ctrlVText0.slice(xpos3, xpos1);
        const ctrlVText2 = ctrlVText0.slice(xpos2);
        const ctrlVText3 = ctrlVText1 + ctrlVText2;
        const pdfPath    = path.join(__dirname,pdfFile);
        const appHtmlLoc = path.join(__dirname,htmFile);

        console.log("(R)-HTML DATA SIZE:"+ctrlVText0.toString().length);
        console.log("REMOVING POSITIONS: 0,"+xpos3+","+xpos1+","+xpos2);
        console.log("CLE1="+clef1);
        console.log("EXPORT-PDF\t"+pdfPath);
        
        let browser;
        try { 
            console.log("PDF conversion process STARTED. ("+new Date().getSeconds()+")");
            browser = await pt.launch({
                headless: true,
                args: ['--no-sandbox', '--disable-setuid-sandbox']
                });
            const page = await browser.newPage();
            await page.setContent(ctrlVText3);
            const pdfBuffer = await page.pdf({
                path: pdfPath, 	
                format: 'A4', 
                landscape: true, 	
                printBackground: true,
                margin: {
                    top: '20mm',
                    right: '15mm',
                    bottom: '20mm',
                    left: '15mm'
                    }	
                });
            console.log("PDF conversion process ENDED. ("+new Date().getSeconds()+")");

            console.log("Deleting HTML file "+appHtmlLoc);
            fs.unlink(appHtmlLoc, (err) => {
                if (err) {
                    console.log('Delete failed:', err.code, err.message);
                    }
                console.log('Deleted');
                });

            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition','attachment; filename="'+pdfPath+'"');
            //console.log(pdfBuffer);
            return res.send(pdfBuffer);
            }
        catch (error) {
            console.error(error);
            return res.status(500).json({
                success: false,
                message: error.message
                });
            } 
        finally {
            if (browser) { await browser.close(); }
            }
        });                
    })

// Listen
app.listen(80);
