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

app.use('/WHIST', (req, res) => {
    var appLoc = path.join(__dirname, '');
    var htmlWarning = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Bienvenue sur le site de comptage des points au Whist</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin-top: 100px;
        }
        .btn {
          padding: 10px 15px;
          background: #007bff;
          color: white;
          text-decoration: none;
          border-radius: 5px;
        }
      </style>
    </head>
    <body>
    <TABLE border=0 cellspacing=0 cellpadding=0 width=100% HEIGHT=100%>
    <TR ALIGN=CENTER VALIGN=MIDDLE><TD>
        <table border=0>
        <tr><td><h1>Bonjour!</h1></td></tr>
        <tr><td>Petite recommendation avant de continuer...
            <BR>
            Afin d'utiliser cette application de façon "efficace", il est conseillé:
            <OL> 
            <LI>D'utiliser le browser "GOOGLE CHROME"</LI>
            <LI>De configurer <B><U>SON</U></B> dossier de téléchargement avec le dossier suivant:
            <BR><b><u>${appLoc}</u></b></LI>
            </OL>
            </td></tr>
        <tr><td align=center>
            <a href="/Users/chef/WHIST/WHIST-NJS/public/dev/index.html" class="btn">WHIST</a>
            </td></tr>
        </table>
    </TD></TR></TABLE>
    </body>
    </html>
  `
res.send(htmlWarning);
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
