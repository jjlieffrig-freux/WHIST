
const ckNameDef  = "PARTIES-WHIST";
const ckNamePfx  = "WHIST-"; 
let msgTXT;

//let ckNameDef  = top.frames[0].document.WHIST.CKNAME.value;
//let ckNamePfx  = top.frames[0].document.WHIST.PARPFX.value;

console.log("1>>>"+ckNameDef+"\t"+ckNamePfx);
console.log("@".repeat(50)+" "+sessionStorage.getItem("reloaded"));

if ( sessionStorage.getItem("reloaded") ) {

	let strURL = window.location.href;
	msgTXT = "Pages actualisées "+strURL;
	if ( strURL.indexOf("NAVIG.htm") > 0 ) {
		console.clear();
		console.log(msgTXT);
		//let textarea = parent.frames["RESU"].document.getElementById("RESULTS");
		//textarea.value = msgTXT;
		let partNO = parent.frames["HDR"].document.getElementById("COOKIE").value;	
		msgTXT = "Recharge les données "+partNO;
		reloadPointsArray();;
		}
    } 
else {
    sessionStorage.setItem("reloaded", "false");
    }

function resetAllFrames()
	{
	for (let i = 0; i < window.frames.length; i++) {
		console.log("Reset frame "+i+"\t"+window.frames[i].name);
  		window.frames[i].location.reload();
		}
	msgTXT = "Toutes les fenêtres rafraichies...";
	//parent.frames['RESU'].document.getElementById('RESULTS').value = msgTXT;
	}

function listFramesIndex()
	{
	const frames = window.parent.frames;
	for (let i = 0; i < frames.length; i++) {
  		console.log(i, frames[i].name);
		}
	}

function viewLocalStorage(swOPTION)
	{
	// swOPTION = 0 => return list of available parties to build buttons in ENTETE.htm
	// swOPTION = 1 => display/clean issues of all localStorage content in frame RESU.htm
	// swOPTION = 2 => display all localStorage content in pop-up window
	var cookieName   = parent.frames['TITRE'].document.getElementById('CKNAME').value;
	if ( typeof cookieName !== "undefined" ) {
		var strCookie = getCookie2(cookieName);
		}
	var arrayParties = [];
	
	const storeArray = Object.keys(localStorage).map(key => [ key, localStorage.getItem(key)]);
	var storageArray = storeArray.sort(
    	function (a, b) 
			{
			if (a[0] === b[0]) 
				{
				return 0;
				} 
			else {
				return (a[0] < b[0]) ? -1 : 1;
				}
			}
		);
	//console.log(storageArray);
	var sINFOOK    = true;
	var saveString = "";
	var cptParties = 0;

	saveString += "PARTIE DE WHIST EN ACTIVITE DANS LE NAVIGATEUR: "+strCookie+"\n\n";
	for (let i = 0; i < storageArray.length; i++) 
		{
		var sINFO = storageArray[i].toString().split(",")[0] + "]\t[";
		sINFO += storageArray[i].toString().split(",")[1] + "]\t[";
		sINFO += storageArray[i].toString().split(",")[2] + "]\t[";
		sINFO += storageArray[i].toString().split(",")[3] + "]\t";

		var chkCELLS = "("+storageArray[i].toString().split(",")[2]+"|"+storageArray[i].toString().split(",")[3]+")";
		var curKey   = storageArray[i].toString().split(",")[0];
		if ( curKey.endsWith(".00") ) { sINFOOK = true; }
		if ( chkCELLS === "(|)" ) { sINFOOK = false; }
		if (!sINFOOK)
			{
			console.log("["+sINFOOK+"]\t"+chkCELLS+"\t REC:"+i+"\tEFFACEMENT DE LA CLEF ["+curKey+"] DU 'LOCALSTORAGE'");
			localStorage.removeItem(curKey);
			}
		
		if ( curKey.endsWith(".00") ) 
			{ 
			cptParties ++;
			sINFOOK = true;
			var sCOOK  = storageArray[i].toString().split(",")[0].split(".")[0];
			saveString += "\nPARTIE #"+cptParties+" ["+sCOOK + "] EN MEMOIRE. LES JEUX SONT LES SUIVANTS:\n\n"; 
			sPartie    = sCOOK;
			arrayParties.push(sPartie);
			} 
		msgTXT = "["+sINFOOK+"]\tROW("+String(i).padStart(3, "0")+") "+storageArray[i];
		saveString += msgTXT + "\n";
		}
	var yBrowser   = parent.frames["HDR"].document.getElementById('BRWBOUT').outerHTML;
	var maxParties = arrayParties.length;
	saveString += "\nVOUS AVEZ "+maxParties+" PARTIES DANS LA MEMOIRE DE VOTRE NAVIGATEUR ["+yBrowser+"]:\n" + arrayParties+"\n\n\n\n"; 
	switch (swOPTION)
		{
		case 0:
			console.log("Parties en mémoire:\n"+arrayParties)
			return arrayParties;
			break;
		case 1:
			// Display all localStorage content in frame RESU.htm
			saveString = "<PRE>"+saveString+"</PRE>";
			//parent.frames['RESU'].history.go(-2);
			parent.frames['RESU'].document.getElementById('RESULTATS').innerHTML = saveString;	
			break;
		case 2:
			// Display all localStorage content in pop
			return storageArray;
			break;
		default:
			//RAF
		}

	}

function initialiseData()
	{
	parent.frames['RESU'].document.getElementById('RESULTATS').innerHTML = "";
	parent.location.reload();
	msgTXT = "L'OPTION [EFFACE] REMET TOUT à 0. \t\t1 CONSEIL: FAITES UN EXPORT AVANT D'EFFACER."
	parent.frames['RESU'].document.getElementById('RESULTS').value = msgTXT;
	do 	{
		var rep = prompt("Etes-vous bien sûr(e) de vouloir effacer?\n(O)ui / (n)on ?","n");
		}
	while ( !(rep ==="O" || rep === "n" ) );

	if ( rep === "O" )
		{
		localStorage.clear();
		document.cookie = ckNameDef + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
		msgTXT = "LOCALSTORAGE et COOKIE effacés!";
		console.log(msgTXT);
		parent.frames['RESU'].document.getElementById('RESULTS').value = msgTXT;
		}
	else {
		parent.frames['RESU'].document.getElementById('RESULTATS').innerHTML = "";
		}
	}

function refreshPage()
	{
	parent.frames['RESU'].document.getElementById('RESULTATS').innerHTML = "";
	}

function effaceUnJeu()
	{
	strD = parent.frames['HDR'].document.getElementById('COOKIE').value;
	console.log("EFFACEMENT - NOM PARTIE:"+strD);
	if ( typeof strD === "undefined" ) { 
		strD = getCookie2(ckNameDef); 
		}			
	console.log("NOM PARTIE:"+strD+"\t\tKeyname:"+ckNameDef);
	maxJeu = localStorage.length;
	noJeu = prompt("Numéro de jeu de la partie ["+strD+"] à effacer\nTapez '0' pour annuler l'action!",0);
	if ( noJeu === 0 ) { 
		return; 
		}
	maxJeuLim = maxJeu - 1;
	if ( noJeu > maxJeuLim ) { 
		msgTXT = "Jeu numéro "+noJeu+" à effacer. Incorrect! Max "+maxJeuLim;
		parent.frames['RESU'].document.getElementById('RESULTS').value = msgTXT;
		return; 
		}

	uRES = reloadPointsArray();
	console.log("Nbre lignes de jeux: "+maxJeu);
	var xline = "";
	for (i=0; i<maxJeu; i++)
		{
		for (j=0; j<uRES[i].length; j++)
			{
			xline = xline + uRES[i][j] + "\t";
 			}
		xline = xline + "\n";
		}
	console.log("TABLE POINTS:\n"+xline);
	
	console.log("Début effacement de la ligne de jeu n° "+noJeu)+" de la partie ["+strD +"]";

	var xcpt = 0;
	var oldXLine = "";
	for (i=0; i<maxJeu; i++)
		{
		var curKey = strD+"."+String(i).padStart(2, '0');
		var curXLine = localStorage.getItem(curKey);
		var xline = "";
		var swLocStor = 0;
		for (j=0; j<uRES[i].length; j++)
			{
			if ( i >= noJeu )
				{
				swLocStor = 1;
				if ( i === maxJeu - 1 )				
					{
					uRES[i].fill(0);
					uRES[i][0] = i;
					uRES[i][1] = "";
					uRES[i][2] = "";
					swLocStor  = 2;
					}
				else {
					if ( j > 3 )
						{
						if ( i === 1 )
							{
							uRES[i][j] = parseInt(uRES[i+1][j]) - parseInt(uRES[i][j]);
							}
						else {
							uRES[i][j] = parseInt(uRES[i+1][j]) - parseInt(uRES[i][j]) + parseInt(uRES[i-1][j]);
							}
						}
					else {
						uRES[i][j] = uRES[i+1][j];
						uRES[i][0] = i;
						}
					}
				}
			console.log(i+":"+noJeu+":"+maxJeuLim+":"+swLocStor);
			xline = xline + uRES[i][j];
			if ( j < uRES[i].length - 1 ) { xline = xline + "," }
 			}
		if ( swLocStor > 0 )
			{
			xcpt++; 
			var keyName = strD+"."+i.toString().padStart(2, '0');
			console.log("REMOVEITEM:"+curKey+"\t\t"+curXLine);
			localStorage.removeItem(curKey);
			if ( swLocStor === 1 ) { 
				console.log("...SETITEM:"+keyName+"\t\t"+xline); 
				localStorage.setItem(keyName, xline );
				}			
			}
		}
	console.log(localStorage);
	parent.frames['HDR'].document.HEADER.NPARTIE.value = xcpt;
	rebuildHTML(maxJeuLim ,strD,"1");
	//rebuildHTML(xcpt,uRES[0][2],"1");
	}

function importPartie()
	{
	document.write("<input id='fileInput' type='file' accept='.csv'>");
	//const content   = document.getElementById("content");
	const fileInput = document.getElementById("fileInput");
	console.log("INPUTFILE="+fileInput);
	fileInput.addEventListener("change", previewFile);
	}

function previewFile() 
	{
	console.log("Importing...");
	const d = new Date();
	let ms = d.getMilliseconds();
	const file = fileInput.files[0];
	const reader = new FileReader();

	reader.addEventListener("load", () => {
		console.log("MS:"+ms+"\tFILE:"+file);
		// this will then display a text file
		//content.innerText = reader.result;
		var content = reader.result;
		content = content.replaceAll("[WHIST-","§");
		content = content.replaceAll("WHIST-","@");
		const arrayLS = content.split("@");
		for (let i=0; i<arrayLS.length; i++)
			{		
			arrayLINE = arrayLS[i].toString();
			if ( arrayLINE !== "" )
				{
				arrayLINE = "WHIST-"+arrayLINE.replace("§","[WHIST-");
				var keyName = arrayLINE.split(",")[0];
				var valData = arrayLINE.split(",").slice(1).join(",").trim();
				console.log(i+"\t"+keyName+"\t["+valData+"]");
				localStorage.setItem(keyName, valData);
				}
			}
		});
	if (file) {
		console.log("FILE:"+reader.readAsText(file,'utf-8'));
		}
	}			

function manageWhistRes(sTYPE)
	{
	const d  = new Date();
	const yString = String(new Date().getFullYear()).padStart(4, '0');
	const xString = String(new Date().getMonth() + 1).padStart(2, '0');
	const dString = String(new Date().getDate()).padStart(2, '0');
	
	var ficName = ckNamePfx+yString+"-"+xString+"-"+dString+"-jeux.csv";
	var strCOOKIE = parent.frames['HDR'].document.HEADER.COOKIE.value;
	ficName = strCOOKIE + "-jeux.csv";

	var ficENTRY = prompt("ENTREZ UN NOM DE FICHIER:",ficName);
	if ( ficENTRY != "") { ficName = ficENTRY; }
	if ( !ficName.endsWith(".csv") ) { ficName += ".csv"; }

	switch (sTYPE)
		{
		case "EJ":
			const storeArray = Object.keys(localStorage).map(key => [ key, localStorage.getItem(key)]);

			var storageArray = storeArray.sort(
    			function (a, b) 
					{
        			if (a[0] === b[0]) 
						{
            			return 0;
        				} 
					else {
            			return (a[0] < b[0]) ? -1 : 1;
        				}
    				}
				);
			var saveString = "";
			for (let i = 0; i < storageArray.length; i++) 
				{ 
				//console.log(storageArray[i][0]+"\t"+storageArray[i][1]);
				if ( storageArray[i][0].includes(strCOOKIE) )
					{
					console.log("---> ROW("+i+")("+strCOOKIE+") "+storageArray[i]);
					saveString += storageArray[i]+"\n"; 
					//saveString += JSON.stringify(storageArray[i]);
					}
				}
			//console.log(saveString);
			
			const blob = new Blob([saveString], { type: "text/plain;charset=utf-8" });
			const link = document.createElement("a");
  			link.href = URL.createObjectURL(blob);
  			link.download = ("./"+ficName).replaceAll("_","");
			document.body.appendChild(link);
  			link.click();
			document.body.removeChild(link);
  			URL.revokeObjectURL(link.href);
			break;
		case "IJ1":
			async function loadCSV() 
				{
				console.log("Chargement du fichier [./"+ficName+"]");
				const response = await fetch("./"+ficName);
				const text = await response.text();
				//const rows = text.trim().split('\n').map(row => row.split(','));
				const rows = text.trim().split('\n')
				console.log(text.trim().split('\n'));
				return rows;
				}
			rows = loadCSV();
			console.log("Chargement terminé!");
			console.log(rows);
			for(let i=0; i<rows.length-1; i++)
				{
				console.log(">>"+rows[i]);
				}
			break;
		case "IJ5":
			//=== JavaScript (Fetch JSON)
			fetch("./"+ficName)
				.then(response => response.json())
				.then(data => {
					console.log(data);
				})
				.catch(error => {
					console.error("Error loading JSON:", error);
				});
			break;
		case "IJ2":
				// TEXT FILE
				const fileInput = document.getElementById("fileInput");
				console.log("INPUTFILE="+fileInput);
				fileInput.addEventListener("change", previewFile);

				function previewFile() {
					const d = new Date();
					let ms = d.getMilliseconds();
					const file = fileInput.files[0];
					const reader = new FileReader();
					reader.addEventListener("load", () => {
						console.log("MS:"+ms+"\tFILE:"+file);
						// this will then display a text file
						//content.innerText = reader.result;
						var content = reader.result;
						content = content.replaceAll("[WHIST-","§");
						content = content.replaceAll("WHIST-","@");
						const arrayLS = content.split("@");
						for (let i=0; i<arrayLS.length; i++)
							{		
							arrayLINE = arrayLS[i].toString();
							if ( arrayLINE !== "" )
								{
								arrayLINE = "WHIST-"+arrayLINE.replace("§","[WHIST-");
								var keyName = arrayLINE.split(",")[0];
								var valData = arrayLINE.split(",").slice(1).join(",").trim();
								console.log(i+"\t"+keyName+"\t["+valData+"]");
								localStorage.setItem(keyName, valData);
								}
							}
						});
					if (file) {
						console.log("FILE:"+reader.readAsText(file,'utf-8'));
						}
					}	
			break;
		case "IJ3":
			//=== NodeJS using "fs"
			const fs   = require("fs");
			const raw  = fs.readFileSync(ficName);
			data = JSON.parse(raw);
			console.log(data);
			break;
		case "IJ4":
			//=== Node.js (CommonJS)
			data = require("./"+ficName);
			console.log(data);
			break;
		case "PDF":

			break;
		default:
			console.log("OPTION ["+sTYPE+"] NON GEREE");
		}
	}

function displayCompile()
	{
	console.clear();
	console.log("Debut calculs...");
		
	Object.entries(localStorage).forEach(([k,v]) => console.log(k.padEnd(50), v, v.length, (v.length / 1024).toFixed(1) + 'KB'))	

	if(localStorage.length < 1)
	{
		msgTXT = "AUCUNE DONNEE DANS LE SYSTEME. REQUETE IMPOSSIBLE";
		console.log(msgTXT);
		//alert(msgTXT);
		parent.frames['RESU'].document.getElementById('RESULTS').value = msgTXT;
	}
	else {
		var localStorageArray = new Array();
		var keyName = ckNamePfx;
		console.log("RECHERCHE DES INFORMATIONS DE JEU AVEC LA CLEF '"+keyName+"'");
		console.log("SYSTEM STORAGE SIZE:"+localStorage.length);
		console.log("CREATE STORAGE SIZE:"+localStorageArray.length);
		xcpt = -1;

		for (i=0;i<localStorage.length;i++)
			{
			if ( localStorage.key(i).includes(keyName) )
				{
				xcpt += 1;
				localStorageArray[xcpt] = localStorage.key(i)+"|"+localStorage.getItem(localStorage.key(i));
				}
			}
		var sortedArray = localStorageArray.sort();
		console.log(sortedArray);

		var maxRELOAD	= localStorageArray.length;
		console.log("LE SYSTEME A TROUVE "+maxRELOAD+" LIGNE(S) AVEC CETTE CLE '"+keyName+"'");

		var xParties    = document.WHIST.PARTIES.value;
		var nbrJoueurs  = document.WHIST.JOUEURS.value;
		const arrayJ    = nbrJoueurs.split('\n');
		var xJOUEURS	= arrayJ.length + 3;
		console.log("APPEL ROUTINE DE CREATION TABLE DE WHIST ["+xParties+"x"+xJOUEURS+"]");

		aRES = twoDimensionArray(xParties, xJOUEURS, "EMPTY2"); 
		const d = new Date();
		let year = d.getFullYear();
		var oldKeyLine = "";
		var oldLocLine = "";
		var k = -1;
		for (i=0;i<localStorageArray.length;i++)
			{
			curKeyLine = localStorageArray[i].toString().split("|")[0].split(".")[0];
			curLocLine = localStorageArray[i].toString().split("|")[1].split(",");
			if ( i === 0 ) 
				{ 
				k += 1;
				for (j=0; j<curLocLine.length; j++)
					{
					aRES[k][j] = curLocLine[j];
					aRES[k][2] = "Soirées Whist "+year;
					oldLocLine = curLocLine; 
					oldKeyLine = curKeyLine;
					}
				}
			if ( curKeyLine != oldKeyLine ) 
				{ 
				oldLocLineArray = oldLocLine.toString().split(",");
				k += 1;
				for (j=0; j<oldLocLineArray.length; j++)
					{
					aRES[k][j] = oldLocLineArray[j];
					aRES[k][1] = "-";
					aRES[k][2] = "Soirée "+oldKeyLine;
					aRES[k][3] = "-";
					oldLocLine = curLocLine; 
					}
				}
			oldKeyLine = curKeyLine;
			oldLocLine = curLocLine;
			}
		oldLocLineArray = oldLocLine.toString().split(",");
		k += 1;
		for (j=0; j<oldLocLineArray.length; j++)
			{
			aRES[k][j] = oldLocLineArray[j];
			aRES[k][1] = "-";
			aRES[k][2] = "Soirée "+oldKeyLine;
			aRES[k][3] = "-";
			}
		
		for (j=4; j<aRES[k+1].length; j++)
				{
				aRES[k+1][j] = 0;
				}
		aRES[k+1][0] = 0;

		console.log(aRES);
		
		// TOTAUX GENERAUX

		aRES[k+1][3] = 0;
		aRES[k+1][0] = 0;
		for (i=1; i<k+1; i++)
			{
			totalPTS	 = 0;
			aRES[k+1][0] = parseInt(aRES[k+1][0])+parseInt(aRES[i][0]);
			for (j=4; j<aRES[0].length; j++)
				{
				console.log("("+k+")("+i+","+j+")\t"+aRES[k+1][j]+"\t\t"+parseInt(aRES[k+1][j])+"\t\t\t"+aRES[i][j]);
				aRES[k+1][j] = parseInt(aRES[k+1][j])+parseInt(aRES[i][j]);
				if ( parseInt(aRES[i][j]) > 0 ) { totalPTS += parseInt(aRES[i][j]); }
				}
			aRES[i][3]    = totalPTS;
			aRES[k+1][3] += totalPTS;
			}

		rebuildHTML(k,"Soirées Whist "+year,"1");
		parent.frames['HDR'].document.HEADER.ENJEUX.value = aRES[k+1][3];
		parent.frames['HDR'].document.HEADER.COOKIE.value = "LA SAISON "+ year;
		}
	}

function recupererCookie(nom) 
	{
    nom = nom + "=";
    var liste = document. cookie. split (';');
	console.log("COOKIE RECUPERE: "+liste);
    for (var i = 0; i < liste.length; i++) 
		{
        var c = liste[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nom) == 0) return c.substring(nom.length, c.length);
    	}
    return null;
	}

function imprimerZone(idElement) 
	{
	parent.frames['RESU'].document.getElementById('RESULTS').value=idElement;
	console.log(idElement);

	const text = idElement;
	const blob = new Blob([text], { type: 'text/csv' });
	const url  = URL.createObjectURL(blob);
	const link = document.createElement('a');
	link.href = url;
	link.download = 'Whist.csv';
	link.click();

	}

function impressionRes(strFORMAT)
    {
	console.log("Demande impression au format '"+strFORMAT+"'");

    if ( strFORMAT === 'PRINT' )
        {
		var htmlString = parent.frames['RESU'].document.getElementById("RESULTATS").outerHTML;	
		console.log(htmlString);
		var opts = "height=250,width=950,top=350,left=450,resizable=yes";
		var oNewWin = window.open("", "", opts);
		oNewWin.document.body.innerHTML = htmlString;
		oNewWin.print(); 
		oNewWin.close();
        }	

    if ( strFORMAT === 'CSV' )
        {
        //const strD = new Date().toISOString().slice(0, 10).replace(/-/g, '');
		var keyName = getCookie2(ckNamePfx); 
		console.log("CSV (key): "+keyName);
        //Object.entries(localStorage).filter(([key]) => key.startsWith(keyName)).forEach(([k,v]) => console.log(k.padEnd(50), v, v.length, (v.length / 1024).toFixed(1) + 'KB'))
        
        if ( localStorage.length > 0 )
            {
            var localStorageArray = new Array();
			var j=0;
            for (i=0;i<localStorage.length;i++)
                {
                if ( localStorage.key(i).includes(keyName) )
                    {
					console.log("=> ("+i+")("+j+")\t("+localStorage.key(i)+")\t("+keyName+")");
                    localStorageArray[j] = localStorage.key(i)+"|"+localStorage.getItem(localStorage.key(i));
					j++;
                    }
                }
            }
        var sortedArray = localStorageArray.sort();
		console.log("Nombre de parties (CSV): "+localStorageArray.length);
		var allARRAY = ""
        for ( let i=0; i < sortedArray.length; i++ )
            {
			console.log("Ligne("+i+")\t"+sortedArray[i]);
            //infoARRAY = (sortedArray[i].split("|")[1]).split(",");
			infoARRAY = sortedArray[i].replace("|",",").split(",");
			allARRAY += infoARRAY+"\n";
            }
		imprimerZone(allARRAY);	
    	}
	}

function generatePDF(title, content) 
	{
	console.log("CONFIGURE PDF");
	console.log("TITRE:"+title);
	console.log(content);
	
	const { jsPDF } = window.jspdf;
	const doc = new jsPDF();

	//const title   = document.getElementById("title").value;
	//const content = document.getElementById("content").value;

	if (!title.trim() && !content.trim()) {
		alert("Please enter valid content before generating the PDF.");
		return;
		}

	const margin = 10;
	let y = 20;

	const pageWidth = doc.internal.pageSize.getWidth();
	const pageHeight = doc.internal.pageSize.getHeight();
	const maxWidth = pageWidth - margin * 2;

	doc.setFontSize(18);

	const titleLines = doc.splitTextToSize(title, maxWidth);
	doc.text(titleLines, margin, y);

	const titleLineHeight = doc.getLineHeight() / doc.internal.scaleFactor;
	y += titleLines.length * titleLineHeight + 5;

	doc.setFontSize(12);

	const lines = doc.splitTextToSize(content, maxWidth);

	const lineHeight = doc.getLineHeight() / doc.internal.scaleFactor;

	lines.forEach((line) => {
		if (y > pageHeight - margin) {
			doc.addPage();
			y = margin;
			}

		doc.text(line, margin, y);
		y += lineHeight;
	});

	doc.save("invoice.pdf");															
	}

function handle(evnt)
	{
	if(evnt.type == "click")
		{
		console.log("Click event occurred.\n");
		}
	if(evnt.type == "mousedown")
		{
		console.log("MouseDown event occurred.\n");
		}
	if(evnt.type == "keypress")
		{
		console.log("Keypress event occurred.\n");
		}
	return true;
	}
function calculator()
	{
	console.clear();
	var cptDON = 0;
	var cptJEU = 0;
	var cptPAR = 0;
	var elms = document.querySelectorAll("[name='DONNEPAR']");
	console.log(elms);
 	for(var i = 0; i < elms.length; i++) { if (elms[i].checked) { cptDON ++ }; }
	var elms = document.querySelectorAll("[name='ENJEUPAR']");
	for(var i = 0; i < elms.length; i++) { if (elms[i].checked) { cptJEU ++ }; }
	var elms = document.querySelectorAll("[name='JOUERPAR']");
	for(var i = 0; i < elms.length; i++) { if (elms[i].checked) { cptPAR ++ }; }
	var configJeu = cptDON.toString()+cptJEU.toString()+cptPAR.toString();
	console.log("CONFIG JEU: "+configJeu);

	switch (configJeu)
		{
		case "122":
			//=== 122 => 1 donneur et 2 emballages et 2 contres
			var swOK = true;
			break;
		case "113":
			//=== 113 => 1 donneur et 1 seul et 3 contres
			var swOK = true;
			break;
		default:
			var swOK = false;
		}
	
	if ( !(swOK) ) 
		{
		msgTXT = "swOK="+swOK+"\tMAUVAISE DEFINITION DE JOUEUR ["+configJeu+"] au lieu de [122] ou [113]";
		top.RESU.document.getElementById("RESULTS").value = msgTXT;
		}
	else {
		calculator2();	
		}
	return swOK;

	}

function calculator2()
	{

	var separator = "*".repeat(150);
	console.log(separator);

  	var data    = [];

	var enjeu   = document.getElementById("RESULTATSJEU");
	var points  = enjeu.value;
	if ( points === "" )
		{
		alert("Vous n'avez pas choisi une mise/annonce\nFaites-le!")
		return
		}
	var mise    = enjeu.options[enjeu.selectedIndex].text;
	
	data.push("@"+mise);
	data.push("&"+points);

	count=0;
  	for (var j=0;j<3;j++)
  		{
		switch(j) 
			{
			case 0:
    			var chBox = document.getElementsByName("DONNEPAR");
				//console.log("Analyse DONNEUR");
				var strValue = "?"
    			break;
  			case 1:
    			var chBox = document.getElementsByName("ENJEUPAR");
				//console.log("Analyse EN-JEU");
				var strValue = "€"
    			break;
  			case 2:
    			var chBox = document.getElementsByName("JOUERPAR");
				//console.log("Analyse JOUEURS");
				var strValue = "£"
    			break;
  			default:
    			alert("Il y a un bug de logique! Voir JJL");
				console.log("Il y a un bug de logique! Voir JJL")
				var strValue = "X" 
			}
		var nbrChBox = 0; 
		for(var k = 0; k < chBox.length; k++)  
    			{ 
        		if(chBox[k].checked) 
    				{   
            		nbrChBox++; 
					strValue += chBox[k].value + "!";
    				}  
    			}
		data.push(strValue);			
    	count++;
  		}
	console.log(data);
	var sCook = parent.frames['HDR'].document.HEADER.COOKIE.value;
	reloadPointsArray(sCook);
	memorise(data);
	return false;  
 	}

function memorise(strDATA1)
	{
	console.log("*".repeat(50)+"\n"+strDATA1+"\n"+"*".repeat(50));
	var strDATA2 = strDATA1.toString()+"$";
	strDATA3 = strDATA2.split(",").join("\n");

	if (typeof aRES === 'undefined') 
	   	{
		xParties = document.WHIST.PARTIES.value;		
		console.log("Pas encore de résultats. Création matrice pour "+xParties+" partie(s)!");
		cptPARTIE = 0;
		cptPOINTS = 0;
		parent.frames['HDR'].document.HEADER.NPARTIE.value = cptPARTIE;
		parent.frames['HDR'].document.HEADER.ENJEUX.value  = cptPOINTS;
		var nbrJoueurs  = document.WHIST.JOUEURS.value;
		const arrayJ    = nbrJoueurs.split('\n');
		var xJOUEURS	= arrayJ.length - 1;
		console.log("JOUEURS DEFINIS.....:\n"+document.WHIST.JOUEURS.value);
		console.log("NOMBRE DE JOUEURS...:\t"+xJOUEURS)
		console.log("#PARTIES:"+xParties+"\t\t#JOUEURS:"+xJOUEURS);
		aRES = twoDimensionArray(xParties , 4+xJOUEURS, "ALL") 
		}
	   else {
		//console.log("Matrice existante!");
		}
	console.log(strDATA2);
	var indic = document.WHIST.switch.value;
	p1=strDATA2.indexOf("@")+1; p2=strDATA2.indexOf("&")-1; sANNONCE=strDATA2.substring(p1,p2);  
	if ( indic === "?" ) console.log(p1+"/"+p2+"/"+sANNONCE);
	p1=strDATA2.indexOf("&")+1; p2=strDATA2.indexOf("?")-1; sPOINTS=strDATA2.substring(p1,p2);
	if ( indic === "?" ) console.log(p1+"/"+p2+"/"+sPOINTS);
	p1=strDATA2.indexOf("?")+1; p2=strDATA2.indexOf("€")-2; sDONNEUR=strDATA2.substring(p1,p2); 
	if ( indic === "?" ) console.log(p1+"/"+p2+"/"+sDONNEUR);
	p1=strDATA2.indexOf("€")+1; p2=strDATA2.indexOf("£")-2; sBONNI=strDATA2.substring(p1,p2); 
	if ( indic === "?" ) console.log(p1+"/"+p2+"/"+sBONNI);   	
	p1=strDATA2.indexOf("£")+1; p2=strDATA2.indexOf("$")-1; sMALUS=strDATA2.substring(p1,p2);  
	if ( indic === "?" ) console.log(p1+"/"+p2+"/"+sMALUS); 

	sANNONCE = sPOINTS.split('!')[1].trim() + " " + sPOINTS.split('!')[2].trim();
	sTYPEJEU = sPOINTS.split('!')[4];
	sPOINTS	 = sPOINTS.split('!')[3].trim();
	sDONNEUR = sDONNEUR.split('-')[0];
	console.log("DONNEUR:"+sDONNEUR);
	sBONNI	 = sBONNI.replaceAll("[","");
	sMALUS 	 = sMALUS.replaceAll("[","");

	nPARTIE  = Math.floor(parent.frames['HDR'].document.HEADER.NPARTIE.value) + 1;
	strDATA4 = "ANN:"+sANNONCE+"\nPTS:"+sPOINTS+"\nDON:"+sDONNEUR+"\nJEU:"+sBONNI+"\nOPP:"+sMALUS+"\nPAR:"+nPARTIE+"\nTYPE:"+sTYPEJEU;

	console.log(strDATA4);
	if ( document.WHIST.switch.value === "?")
		{
		console.log("@".repeat(50));
		console.log(strDATA4)
		console.log("*".repeat(50));
		//parent.frames["TITRE"].document.WHIST.getElementById("PARAM").value = strDATA4;
		}
	
	//console.log("BONNI: "+sBONNI);
	strJENJEU = sBONNI.split("!"); 
	txtWIN=" (";
	//console.log("WINNER: "+strJENJEU);
	for (let k = 0; k < strJENJEU.length; k++)
		{
		//console.log("K="+k+"\t"+strJENJEU[k]);
		var indJ = strJENJEU[k].split("-")[0] - 1
		var iniJ = arrayJ[indJ].split("!")[1]
		if ( k === 0 ) 
			{
			txtWIN  = txtWIN + iniJ;
			}
		else { 
			txtWIN  = txtWIN + "+" + iniJ; 
			}
		//console.log("WIN-IND:"+indJ+"\t\tJOUEUR:"+arrayJ[indJ]+"\t\tWIN-CELL:"+iniJ);
		}
	txtWIN = txtWIN + ")";	
	//console.log("TXTWIN:"+txtWIN)

	//console.log("MALUS:"+sMALUS)
	strJCONTRE = sMALUS.split("!");
	//console.log("LOOSERS:"+strJCONTRE);
	//console.log("DONNEUR:"+sDONNEUR);

    txtDONNE   = arrayJ[sDONNEUR - 1].split('!')[1].trim();
	xDONNEUR   = parseInt(sDONNEUR)+4; 
	if ( document.WHIST.switch.value === "?" ) console.log("(Partie:"+nPARTIE+") Index gagnant:"+strJENJEU);
	if ( document.WHIST.switch.value === "?" ) console.log("(Partie:"+nPARTIE+") Index perdant:"+strJCONTRE);
	if ( document.WHIST.switch.value === "?" ) console.log("COLONNE DONNEUR SUR LISTING: "+xDONNEUR);

	totalPTS  = parseInt(parent.frames['HDR'].document.HEADER.ENJEUX.value);
	totalPTS += Math.abs(parseInt(sPOINTS));
	parent.frames['HDR'].document.HEADER.ENJEUX.value = totalPTS;

	console.log("#".repeat(50));
	console.log("#ENJEU:"+strJENJEU.length+"\t\t#CONTRE:"+strJCONTRE.length+"\t\tIND-DONNEUR:"+xDONNEUR);
	//console.log("#".repeat(50));

	if ( sTYPEJEU === "3" ) {
		var msgTXT = "";
		var vainq1 = strJENJEU.toString().split(",")[0]; var v1 = vainq1.substring(0,1);
		var vainq2 = strJENJEU.toString().split(",")[1]; var v2 = vainq2.substring(0,1);
		msgTXT += "Qui a gagné UNE des '"+sANNONCE+"'?\n";
		msgTXT += "entre "+vainq1+" et "+vainq2+"\n";
		msgTXT += "Entrez la valeur ["+ v1 + "] ou [" + v2 + "] pour valider le vainqueur";
		do {
			var vainqueur = prompt(msgTXT, 0);
			}
		while (vainqueur != v1 && vainqueur != v2);
		winOnTwo = vainq1;
		if ( vainqueur === v2 ) { winOnTwo = vainq2; }
		console.log("Vainqueur de la partie "+nPARTIE+" est "+winOnTwo);
		}

	var htmlTAB="<TABLE BORDER=1 CELLSPACING=0 CELLPADDING=5 WIDTH=100%>";
	var limHTML = aRES.length;
	//var limHTML = nPARTIE;
	for (let i = 0; i< limHTML; i++) 
		{		
		if ( i == 0 )
			{
			htmlTAB += "<TR BGCOLOR=YELLOW>";
			}
	   	   else {
			htmlTAB += "<TR>";
			}
		var rowSIZE = aRES[i].length;
		if ( i <= nPARTIE )
			{
			//console.log("I="+i+"\tTAILLE:"+rowSIZE+"\tPARTIE:"+nPARTIE+"\n"+aRES[i]);
			}
        for(let j = 0; j< rowSIZE; j++) 
			{

			if ( i == nPARTIE )
				{
				aRES[i][0] = nPARTIE;
				aRES[i][1] = txtDONNE;
				aRES[i][2] = sANNONCE + txtWIN;
				if ( sTYPEJEU === "3" ) {
					aRES[i][2] = sANNONCE + txtWIN + " (WIN:" + winOnTwo + ")";
					}
				aRES[i][3] = sPOINTS;
					
				//==============================================
				//===== AJUSTE LES DONNEES DU DONNEUR ==========
				//==============================================

				if ( i > 0 )
					{
					if ( i === 1 ) 
						{
						aRES[i][xDONNEUR-1] = 0;
						}
					else {
						aRES[i][xDONNEUR-1] = parseInt(aRES[i-1][xDONNEUR-1]);
						}
					//console.log("LIGNE:"+i+"\t\tPas de changement pour le donneur. Colonne listing = "+xDONNEUR+"\t\tPts précédents:"+aRES[i-1][xDONNEUR-1]);
					}

				//==============================================
				//===== AJUSTE LES DONNEES DES ANNONCES ========
				//==============================================

				console.log("-".repeat(25)+"ANNONCES"+"-".repeat(25)+" ARRAY ["+i+"]["+j+"]\t\tDATA:"+aRES[i][j]);

				for (let k = 0; k < strJENJEU.length; k++)
					{
					var sGAINS = sPOINTS;
					indexJ = parseInt(strJENJEU[k]);
					indexJoueur = parseInt(strJENJEU[k]) + 3;
					if ( indexJoueur === j ) 
						{ 	
						if ( parseInt(sTYPEJEU) === 3 ) {	
							if ( indexJ === parseInt(vainqueur) ) { 	
								sGAINS = ( parseInt(sPOINTS) / -6 ) * 5; 
								}
							if ( indexJ != parseInt(vainqueur) ) { 	
								sGAINS = ( parseInt(sPOINTS) / -6 ) * -7; 
								}
							} 
						if ( nPARTIE === 1 )
							{
							//console.log("-PARTIE:"+i+"\t\tW-JOUEUR="+k+"\t\tAVANT:"+aRES[i][indexJoueur]+"\t\tAPRES=POINTS:"+sGAINS);
							aRES[i][indexJoueur] = parseInt(sGAINS);
							}					
						else	{
							console.log("=PARTIE:"+i+"\tWIN:"+vainqueur+"\tW-index-JOUEUR="+indexJ+"\t\tAVANT:"+aRES[i-1][indexJoueur]+"\t\tPOINTS:"+sGAINS+"\t\tAPRES:"+aRES[i][indexJoueur]);
							aRES[i][indexJoueur] = parseInt(aRES[i-1][indexJoueur]) + parseInt(sGAINS);	
							}
						}													
					}
					
				//==============================================
				//===== AJUSTE LES DONNEES DES ADVERSAIRES======
				//==============================================

				//console.log("=".repeat(25)+"ADVERSAIRES"+"=".repeat(25));	
				for (let k = 0; k < strJCONTRE.length; k++)
					{
					indexJoueur = parseInt(strJCONTRE[k]) + 3;
					if ( indexJoueur === j )
						{
						divPTS = sPOINTS;
						if ( parseInt(sTYPEJEU) === 3 ) { 	
							divPTS = ( parseInt(sPOINTS) / 6 ); 
							console.log("Division des points par 6 ==> "+sPOINTS+"/6="+divPTS);
							}
						else {
							if ( strJENJEU.length < strJCONTRE.length )
									{
									nbrDIV = strJCONTRE.length;
									divPTS = parseInt(sPOINTS) / nbrDIV;
									//console.log("Division des points par "+nbrDIV+" ==> "+sPOINTS+"/"+nbrDIV+"="+divPTS);
									}
							}
						if ( nPARTIE === 1 )
							{
							aRES[i][indexJoueur] = parseInt( 0 - parseInt(divPTS));
							//console.log("-PARTIE:"+i+"\t\tL-JOUEUR="+k+"\t\tAVANT:"+aRES[i][indexJoueur]+"\t\tAPRES=POINTS:"+divPTS);
							}					
						else	{
							aRES[i][indexJoueur] = parseInt(aRES[i-1][indexJoueur]) - parseInt(divPTS);
							console.log("=PARTIE:"+i+"\tWIN:"+vainqueur+"\tL-Index-JOUEUR="+indexJoueur+"\t\tAVANT:"+aRES[i-1][indexJoueur]+"\t\tPOINTS:"+divPTS+"\t\tAPRES:"+aRES[i][indexJoueur]);
							}	
						}				
					}					
				}

			if ( j > 0 )
				{
				var tdHTML = "<TD align=CENTER>";
				if ( j === 2 && aRES[i][3] < 0 )
					{
					var tdHTML = "<TD align=CENTER BGCOLOR=ORANGE>";		
					}
				if ( j === 3 && aRES[i][3] < 0 )
					{
					var tdHTML = "<TD align=CENTER BGCOLOR=RED>";		
					}
				htmlTAB += tdHTML+aRES[i][j]+"</TD>";
				}
	   		else {
				htmlTAB += "<TD>"+aRES[i][j]+"</TD>";
				}
			if ( i === 0 ) {
				var tdHTML = "<TD align=CENTER BGCOLOR=LIGHTGREEN>";
				}
        	}
		htmlTAB += "</TR>";
    	}
	htmlTAB += "</TABLE>";

	parent.frames['HDR'].document.HEADER.NPARTIE.value = nPARTIE;
	parent.frames['HDR'].document.HEADER.ENJEUX.value  = totalPTS;
	parent.frames['RESU'].document.getElementById('RESULTATS').innerHTML = htmlTAB;

	savePointsArray(aRES, nPARTIE);	

 	}

function rebuildHTML(nTR, keyName,sKEY)
	{
	console.log("RECREATION D'UNE CHAINE HTML <TABLE> DE "+nTR+" LIGNE(S) DEPUIS LA CLE PARTIE ["+keyName+"]");
	var totalPTS = 0;
	var limHTML  = aRES.length;
	var htmlTAB  = "";

	//htmlTAB += "<button onclick='savePdf()'>Export PDF</button>";
	console.log("REBUILD\n"+htmlTAB);	
	htmlTAB += "<TABLE ID='POINTS' BORDER=1 CELLSPACING=0 CELLPADDING=5 WIDTH=100%>";
	for (let i = 0; i< limHTML; i++) 
		{	
		htmlTAB += "<TR>";	
		if ( i === 0 ) { htmlTAB += '<TR>'; }
		if ( i === nTR - 1 )
			{
			console.log("DERNIERE LIGNE N° "+ i +" --- CALCUL DES TOTAUX");
			var sommeLinePos = 0; var sommeLineNeg = 0;
			for(ix=4; ix<aRES[i].length; ix++)
				{
				var ptJoueur = parseInt(aRES[i][ix]);
				if ( ptJoueur > 0 )
					{
					sommeLinePos += ptJoueur;	
					}
				else {
					sommeLineNeg += ptJoueur;
					}
				}
			var totauxPts = sommeLineNeg.toString()+"/"+sommeLinePos.toString();
			console.log(">>>>>> TOTAUX: "+totauxPts);
			}
		if ( i === nTR+1 && sKEY === "1") { htmlTAB += "<TR BGCOLOR=LIGHTGREEN>";}
		var rowSIZE = aRES[i].length;
        for (let j = 0; j< rowSIZE; j++) 
			{
			switch (j) 
				{
				case 0:
					var tdHTML = "<TD CLASS='SPECIAL'>";
					break;
				case 2:
					var tdHTML = "<TD align=CENTER>";
					if ( parseInt(aRES[i][3]) < 0 ) { var tdHTML = "<TD align=CENTER BGCOLOR=ORANGE>";}
					break;
				case 3:
					if ( i === 0 ) 
						{ 
						var totalPTS = 0; 
						}
					else {
						totalPTS += Math.abs(parseInt(aRES[i][3]));
						}
					var tdHTML = "<TD align=CENTER>";
					if ( parseInt(aRES[i][3]) < 0 ) { var tdHTML = "<TD align=CENTER BGCOLOR=RED>";}
					break;
				default:
					var tdHTML = "<TD align=CENTER>";
				}
			if ( i === 0 ) 
				{ 
				var tdHTML = '<TD CLASS="SPECIAL" align=center>';
				}
			htmlTAB += tdHTML+aRES[i][j]+"</TD>";
        	}
		htmlTAB += "</TR>";
    	}
	htmlTAB += "</TABLE>";
	
	sizeLS = getLocalStorageSize();
	
	//var totauxPts = totalPTS;

	parent.frames['HDR'].document.HEADER.sizeLS.value  = String(sizeLS)+ " Bytes.";
	parent.frames['HDR'].document.HEADER.NPARTIE.value = nTR - 1;
	parent.frames['HDR'].document.HEADER.ENJEUX.value  = totauxPts;
	parent.frames['RESU'].document.getElementById('RESULTATS').innerHTML = htmlTAB;
	
	}

function getLocalStorageSize() 
	{
	let size = 0;
	for (let i = 0; i < localStorage.length; i++) 
		{
		const key = localStorage.key(i);
		const value = localStorage.getItem(key);
		size += key.length + value.length;
		}
	// If "UTF-16" : multiplication par 2 car 2 octets par caractère (size * 2)
	return size;
	}

function getCookie2(name) 
	{
	const value = document.cookie;
    const parts = value.split(";");
	console.log(parts);
	var ckName = "";
	for (const element of parts)
		{
		if ( element.split("=")[0] === name ) { 
			console.log("ELEMENT:\n"+element);
			var ckName = element.split("=")[1] 
			}
		var ckName = element.split("=")[1]
		}
	console.log("COOKIE VALUE='"+ckName+"'");
    return ckName
	}

function savePointsArray(xARR, ind)
	{
	//const strD = new Date().toISOString().slice(0, 10).replace(/-/g, '');
	//strD = parent.frames['HDR'].document.HEADER.COOKIE.value;
	//strD = window.parent.parent.frames['HDR'].HEADER.getElementById("COOKIE").value;
	//console.log(window.parent.parent.frames['HDR'].document)
	
	var strD = getCookie2("PARTIE-WHIST");

	console.log("COOKIE-FOUND:"+strD);
	console.log("[0]:"+xARR[0].toString());
	console.log("[1]:"+xARR[1].toString());
	console.log("[2]:"+xARR[2].toString());
	console.log("[3]:"+xARR[3].toString());

	if ( ind === 1 )
		{
		let strHDR = xARR[0].toString();
		console.log(">>HEADER:"+strHDR);
		var keyName = strD+".00";
		localStorage.setItem(keyName, strHDR );		
		}

	if ( document.WHIST.switch.value === "?" )
		{
		console.log("==INDICE:"+ind+"\n"+xARR[ind]);
		}
	var targetRow = xARR[ind].toString();
	var keyName = strD+"."+ind.toString().padStart(2, '0');
	console.log("==ROW["+ind+"]:"+targetRow+"\nTYPE:"+typeof targetRow+"\nkeyName:"+keyName);
	localStorage.setItem(keyName, targetRow );
	}

function reloadPointsArray(strCookParam)
	{
	console.log("$".repeat(80));
	console.log("RELOAD POINTS ARRAY DEPUIS LA CLE ["+strCookParam+"]");
	console.log("$".repeat(80));
	if (typeof strCookParam !== "undefined" && strCookParam !== null) 
		{
    	var cookParam = strCookParam; 
		parent.frames['HDR'].document.HEADER.COOKIE.value = cookParam;
		}
	else {
		var cookParam = recupererCookie(ckNameDef); 
		}
	
	var boolStat = sessionStorage.getItem("reloaded");
	var msgTXT = "#".repeat(25)+" ("+boolStat+") Reload detected\t\tRECUP COOKIE:"+ckNameDef+"\tPARAM:"+cookParam;
	console.log(msgTXT);

	if ( ! cookParam )
		{
		msgTXT = "Choisissez tout d'abord un nom de partie de WHIST dans le panneau de droite"
		//alert(msgTXT);
		top.RESU.document.getElementById("RESULTS").value = msgTXT;
		return;
		}
    console.log("Recharge en mémoire des parties depuis le 'LOCALSTORAGE' du browser'");
	console.log("PARTIES DE WHIST DEMANDEES: "+cookParam);

	top.RESU.document.getElementById("RESULTS").value = "";

	var strD = new Date().toISOString().slice(0, 10).replace(/-/g, '');
	strD = parent.frames['HDR'].document.HEADER.COOKIE.value 

	var strDate = strD;
	strSELECT = true;
	while (strSELECT) 
		{
		//Object.entries(localStorage).forEach(([k,v]) => console.log(k.padEnd(50), v, v.length, (v.length / 1024).toFixed(1) + 'KB'))	
		xcpt = -1;
		if(localStorage.length > 0)
			{
			var localStorageArray = new Array();
			var keyName = ckNamePfx;
			keyName = cookParam;
			console.log("RECHERCHE DES INFORMATIONS DE JEU AVEC LA CLEF '"+keyName+"'");
			console.log("La 'localStorage' actuelle contient "+localStorage.length+" record(s)");
			//console.log("CREATE STORAGE SIZE:"+localStorageArray.length+" record(s)");

			for (i=0;i<localStorage.length;i++)
				{
				if ( localStorage.key(i).includes(keyName) )
					{
					xcpt += 1;
					localStorageArray[xcpt] = localStorage.key(i)+"|"+localStorage.getItem(localStorage.key(i));
					//console.log("OK POUR CETTE LIGNE "+xcpt+"/" +i+"'"+localStorageArray[xcpt]+"'");
					}
				}
			}
		if ( xcpt < 0 )
			{
			msgTXT = "Encore aucun jeu enregistré dans la partie ["+cookParam+"]";
			top.RESU.document.getElementById("RESULTS").value = msgTXT;
			return;
			}
		var maxRELOAD	= localStorageArray.length;
		console.log("LE SYSTEME A TROUVE "+maxRELOAD+" LIGNE(S) AVEC CETTE CLE '"+keyName+"'");

		if ( maxRELOAD === 0 )	
			{
			msgRELOAD = ""
			msgRELOAD += "PAS DE PARTIES ["+keyName+"] TROUVEES\n";
			msgRELOAD += "ESSAYEZ UNE AUTRE CLE DE PARTIE.\n";
			msgRELOAD += "TAPEZ 'Q' POUR QUITTER";
			keyName = prompt(msgRELOAD, strD);
			if ( keyName.toUpperCase() === "Q" )
				{
				strSELECT = false;
				}
			}
		else {
			strSELECT = false;
			}
		}
	
	if ( !(strSELECT) )
		{
		if ( maxRELOAD === 0 )
			{
			console.log("Le LOCALSTORAGE est vide!");
			return;
			}
		console.log("VOUS AVEZ CHOISI LES PARTIES '"+keyName+"'");
		}

	//var nbrJoueurs  = document.WHIST.JOUEURS.value;
	//var xParties    = document.WHIST.PARTIES.value;
	var nbrJoueurs  = parent.frames["TITRE"].document.WHIST.JOUEURS.value;
	var xParties    = parent.frames["TITRE"].document.WHIST.PARTIES.value;
	const arrayJ    = nbrJoueurs.split('\n');
	var xJOUEURS	= arrayJ.length - 1;

	aRES = twoDimensionArray(xParties , 4+xJOUEURS, "EMPTY");

	console.log("LOCALSTORAGE triée par clefs ("+keyName+')');
	var sortedArray = localStorageArray.sort();
	console.log("CREATE STORAGE SIZE:"+localStorageArray.length+" record(s)");

	for ( var ii=0; ii < sortedArray.length; ii++ )
		{
		infoROW = keyName + "."+ii.toString().padStart(2, '0');
		var strInfoArray1 = sortedArray[ii].toString().split("|")[1];
		var strInfoArray2 = strInfoArray1.toString().split(",");
		//console.log(strInfoArray2);
		for ( let j=0; j < strInfoArray2.length; j++)
			{
			aRES[ii][j] = strInfoArray2[j];
			}
		}
	console.log("VALEURS PARAMETRES: "+ii+"\t"+keyName);
	rebuildHTML(ii,keyName,"0");
	return aRES;
    }

function twoDimensionArray(a, b, typeTable) 
	{

	console.log("Creation table des parties: ["+a+"x"+b+"]. TYPE: "+typeTable);

	var arrRES = [];
	xCPT=0;
	for (let i = 0; i< a; i++) 
		{
		arrRES[i] = [];
		for(let j = 0; j< b; j++) 
			{
            arrRES[i][j] = 0;
			if ( typeTable === "EMPTY2" ) { arrRES[i][j] = "-"; }
			xCPT += 1;
        	}
		if ( typeTable != "EMPTY2" )
			{
			arrRES[i][0] = i;
			arrRES[i][1] = "";
			arrRES[i][2] = "";
			}
    	}
	console.log("NOMBRE DE CELLS: "+xCPT);

	if ( typeTable === "EMPTY" || typeTable === "EMPTY2" ) 
		{ 
		console.log("On recrée simplement la table!")
		return arrRES; 
		}
    
	count=-1;
	for (let i = 0; i< a; i++) 
		{	
		count++;
        	for (let j = 0; j< b; j++) 
			{
			switch(j) 
				{
				case 0:
					arrRES[i][j] = count;
					//arrRES[i][j] = i.toString()+"-"+j.toString();
    				break;
  				case 1:
					arrRES[i][j] = " ";
					//arrRES[i][j] = i.toString()+"-"+j.toString();
    				break;
  				case 2:
					arrRES[i][j] = " ";
					//arrRES[i][j] = i.toString()+"-"+j.toString();
    				break;
  				default:
					arrRES[i][j] = 0;
    				//arrRES[i][j] = i.toString()+"-"+j.toString();
				}
        	}
    	}
	//var nomCOOKIE = top.HDR.document.getElementById("COOKIE").value;
	//var nomCOOKIE = parent.frames['HDR'].document.HEADER.COOKIE.value;
	var nomCOOKIE = getCookie3();
	arrRES[0][0] = 'Jeux';			
	arrRES[0][1] = 'Donneur';
	arrRES[0][2] = 'Annonces de la partie ['+nomCOOKIE+']';			
	arrRES[0][3] = 'Points';	
	
	console.log("TITRE LISTING:"+arrRES[0][2]);

	var nbrJoueurs  = document.WHIST.JOUEURS.value;
	const arrayJ    = nbrJoueurs.split('\n');
	var xJOUEURS	= arrayJ.length - 1;
	for (i = 0; i < xJOUEURS; i++) 
		{
		var key  = arrayJ[i].split('!')[0].trim();
		var data = arrayJ[i].split('!')[1].trim();
		j = i + 4;
		console.log("HEADER: [0]["+j+"] = "+data);
		arrRES[0][j] = data;
		}
	console.log("TABLE des joueurs créée:\n"+arrayJ);

	console.log("ROW(0)\t\tSIZE: "+arrRES[0].length+"\t\tCONTENU: "+arrRES[0]);
	console.log("ROW(1)\t\tSIZE: "+arrRES[1].length+"\t\tCONTENU: "+arrRES[1]);
	console.log("ROW(2)\t\tSIZE: "+arrRES[2].length+"\t\tCONTENU: "+arrRES[2]);
	console.log("ROW(3)\t\tSIZE: "+arrRES[3].length+"\t\tCONTENU: "+arrRES[3]);

	return arrRES;
	}

function getCookie3() 
	{
	console.log("COOKIE:3-LOADING COOKIE ["+ckNameDef+"]");
    const value = document.cookie;
    const parts = value.split(";");
	console.log(parts);
	var ckName = "";
	for (const element of parts)
		{
		if ( element.split("=")[0] === ckNameDef ) { var ckName = element.split("=")[1] }
		var ckName = element.split("=")[1]
		}
	console.log("COOKIE VALUE='"+ckName+"'");
    return ckName
	}

function choosePartie(nomPAR)
	{
	console.clear();
	var strD      = new Date().toISOString().slice(0, 10).replace(/-/g, '');
	var select1   = parent.frames['HDR'].document.getElementById("NOMPARTIE");
	console.log("CHOIX PARTIE:"+nomPAR);

	if ( nomPAR === "??" )
		{
		var keyName = parent.frames['TITRE'].document.getElementById("PARPFX").value;
		console.log("Regénère la liste des parties mémorisées sur le PREFIX:'"+keyName+"'");
		const keys = [];

		while (select1.options.length > 1) { select1.remove(1); }

		for (let i = 0; i < localStorage.length; i++) {
  			const key = localStorage.key(i).toString();
  			if ( key.startsWith(keyName) && key.endsWith('.00')) { 
				var strPartie = key.split(".")[0];
				keys.push(strPartie); 
				select1.add(new Option(strPartie, strPartie));
				console.log("Ajout <option> au tag HTML <SELECT>: "+strPartie);
				}
			}
		console.log(keys);
		return;
		}
	if ( nomPAR === "CNN" )
		{
		var nomPAR = prompt("Entrez le nom de votre nouvelle partie",strD);
		nomPAR = nomPAR.toUpperCase();
		nomPAR = nomPAR.replace(ckNamePfx,"");
		console.log("VOUS AVEZ CHOISI DE NOMMER UNE NOUVELLE PARTIE: '"+nomPAR+"'");

		switch (nomPAR)
			{
			case "":
				mgTXT = "Vous avez entré aucun nom de PARTIE. Aucune action sera appliquée."
				nomPAR = null;
				break;
			case undefined:
				mgTXT = "Vous avez entré aucun nom de PARTIE. Aucune action sera appliquée."
				nomPAR = null;
				break;	
			case null:
				mgTXT = "Vous avez entré aucun nom de PARTIE. Aucune action sera appliquée."
				nomPAR = null;
				break;	
			default: 
				msgTXT = "";
			}
		//parent.frames['RESU'].document.RES.getElementById('RESULTS').value = msgTXT;
		top.RESU.document.getElementById("RESULTS").value = msgTXT;
		}

	if ( nomPAR != null )
		{
		var xCPT = -1;
		console.log("NOM:"+nomPAR.slice(0,6)+"\t\tckNamePfx:"+ckNamePfx);
		if ( nomPAR.slice(0,6) === ckNamePfx )
			{
			//===== C'est une PARTIE qui existe. On cherche les jeux de cette PARTIE =========
			xCPT = 0;
			document.HEADER.COOKIE.value = nomPAR;
			limiteJeux = parent.frames['TITRE'].document.WHIST.NBRPARTIES.value.split(":")[1];
			console.log("Prêt pour une série de "+limiteJeux+" jeux dans la partie ["+nomPAR+"]");
			console.log("LOCALSTORAGE ["+nomPAR+"].....");

			for (let i=0; i < limiteJeux; i++)
				{
				var xPARTIE = nomPAR + "."+i.toString().padStart(2, '0');
				var parName = localStorage.getItem(xPARTIE);
				//console.log("("+i+") Recherche jeu(x) ["+xPARTIE+"]\t\tTrouvé: "+parName);
				if ( ! parName ){ break; }	
				xCPT +=1;
				}
			}

		console.log("COMPTEUR DE JEUX POUR LA PARTIE ["+nomPAR+"]="+xCPT);
		if ( xCPT === 0 ) 
			{
			var ckDATA = getCookie2(ckNameDef);
			if ( ckDATA === ckNamePfx + nomPAR )
				{
				//===== PARTIE existante mais aucun jeux =====
				var msgTXT = "La PARTIE ["+ckNamePfx+nomPAR+"] déjà créée. Pas de jeux dans cette PARTIE";
				console.log(msgTXT)
				top.RESU.document.getElementById("RESULTS").value = msgTXT;
				}
			else {
				//===== PARTIE nouvelle. On crée le COOKIE =====
				msgTXT = "La partie de Whist ["+ckNamePfx+nomPAR+"] inexistante! En route pour la créer...";
				console.log(msgTXT);
				top.RESU.document.getElementById("RESULTS").value = msgTXT;
				}
			}
		else {
			if ( xCPT === -1 )
				{
				//=== CHECK SI LA NOUVELLE PARTIE N'EXISTE PAS DEJA
				limiteJeux = parent.frames['TITRE'].document.WHIST.NBRPARTIES.value.split(":")[1];
				for (let i=0; i < limiteJeux; i++)
					{
					var xPARTIE = ckNamePfx+nomPAR + "."+i.toString().padStart(2, '0');
					var parName = localStorage.getItem(xPARTIE);
					console.log("("+i+") Recherche jeu(x) ["+xPARTIE+"]\t\tTrouvé: "+parName);
					if ( ! parName ){ break; }	
					xCPT +=1;
					}
				if ( xCPT > 0 )
					{
					msgTXT = "LA NOUVELLE PARTIE SOUHAITEE ["+nomPAR+"] EXISTE DEJA. CREATION REFUSEE";
					//top.RESU.document.getElementById("RESULTS").value = msgTXT;
					top.RESU.document.getElementById("RESULTATS").innerHTML = "";
					}
				else {
					//===== CREATION NOUVEAU COOKIE POUR NOUVELLE PARTIE
					nomPAR = ckNamePfx + nomPAR;
					var ckName = creerCookie(ckNameDef, nomPAR);
					var ckName = createNewOptionSelect(nomPAR)
					var msgTXT = "LE SYSTEME EST PRET A L'ENTREE DE JEUX POUR CETTE NOUVELLE PARTIE ["+ckName+"]";
					console.log(msgTXT);
					//top.RESU.document.getElementById("RESULTS").value = msgTXT;
					refreshPageDetail("HDR",msgTXT);
					refreshPageDetail("RESU",msgTXT);
					}
				}
			else {
				//=== DEMANDE DE VISIONNAGE D'UNE PARTIE =====
				var ckName = creerCookie(ckNameDef, nomPAR);
				//var ckName = createNewOptionSelect(nomPAR);
				var msgTXT = "Sélectionnez l'activité [RECHARGE PARTIE] pour charger la partie ["+ckName+"] en mémoire";
				//top.RESU.document.getElementById("RESULTS").value = msgTXT;
				console.log(msgTXT);
				refreshPageDetail("RESU",msgTXT);
				reloadPointsArray(ckName);
				}
			}
		}
	else {
		//===== CREATION NOUVEAU COOKIE POUR NOUVELLE PARTIE
		//===== REFUSEE CAR LE NOM DE PARTIE EST "NULL"
		//var ckName = createCookie(nomPAR)
		//var msgTXT = "LE SYSTEME EST PRET A L'ENCODAGE DE LA PARTIE ["+ckName+"]";
		//top.RESU.document.getElementById("RESULTS").value = msgTXT;
		//refreshPageDetail("RESU",msgTXT);
		}
	}

function creerCookie(nom, contenu) 
	{

	contenu = contenu.replaceAll(";","");
	contenu = contenu.replaceAll(",","");
	contenu = contenu.replaceAll(".","");
	contenu = contenu.replaceAll(":",""); 
	contenu = contenu.replaceAll(" ",""); 
	contenu = contenu.replaceAll("@",""); 
	contenu = contenu.replaceAll("§",""); 
	//contenu = contenu.replace(/[^a-zA-Z0-9]/g, '');
	contenu = contenu.toUpperCase();

	console.log("Mise à jour du COOKIE ["+nom+"] avec valeur ["+contenu+"]");

	var jours = parent.frames['HDR'].document.HEADER.DUREE.value;
	console.log("DUREE COOKIE:"+jours);
    var e = null;
    var date = new Date ();
    date. setTime (date.getTime() + (jours * 24 * 60 * 60 * 1000));
    e = "; expires=" + date. toGMTString();
	var cookieDATA = nom + "=" + contenu + e + "; path=/";
	if ( getCookie2(nom) != "" )
		{
		var delKeyCookie = nom + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
		document.cookie = delKeyCookie;
		console.log("Effacement ANCIEN COOKIE ["+delKeyCookie+"]");
		}

    document.cookie = cookieDATA
	var cookieValue = (cookieDATA.split(";")[0]).split("=")[1]
	console.log("Création NOUVEAU COOKIE: "+cookieDATA);
	console.log(cookieValue)
	parent.frames['HDR'].document.HEADER.COOKIE.value = cookieValue;
	return cookieValue;
	}

function getCookie2(cname) 
	{
	console.log("LOADING COOKIE ["+cname+"]");
    const value = document.cookie;
    const parts = value.split(";");
	console.log(parts);
	var ckName = "";
	for (const element of parts)
		{
		if ( element.split("=")[0] === cname ) { var ckName = element.split("=")[1] }
		var ckName = element.split("=")[1]
		}
	console.log("COOKIE VALUE='"+ckName+"'");
    return ckName
	}

manageNomPartie();

function manageNomPartie()
	{
	console.log("Recherche de parties en traitement...");
	var x = "";
	console.log(localStorage);
	for (let i = 0; i < localStorage.length; i++) 
		{
		if ( i > 0 ) { x += ","; }  
		const keyALL = localStorage.key(i);
		const keyCLE = keyALL.split(".");
		keyCLE.pop();
		x += keyCLE.toString();
		}
	console.log("#"+x);
	x = Array.from(new Set(x.split(',')));
	console.log(x)

	if ( x === "" )
		{
		console.log("PAS DE DONNEES DANS LE LOCALSTORAGE. CONTROLEZ SI UN COOKIE ["+ckNameDef+"] EXISTE!");
		var ckDATA = getCookie2(ckNameDef);
		if ( ckDATA != "" )
			{
			var strOPT2 = "<option CLASS='couleur2' value='"+strOPT1+"'><B>"+strOPT1+"</B></option>";
			console.log(strOPT2);
			document.write(strOPT2);
			}
		}

	for (let i = 0; i < x.length; i++) 
		{
		var strOPT1 = x[i].toString();
		if ( strOPT1 != "" )
			{
			var strOPT2 = "<option CLASS='couleur2' value='"+strOPT1+"'><B>"+strOPT1+"</B></option>";
			console.log(strOPT2);
			document.write(strOPT2);
			}
		else {

			}
		}
	document.write("</SELECT>");
	}



function createNewOptionSelect(nomPartieNew)
	{
	
	nomPartieNew = (ckNameDef, nomPartieNew.toLocaleUpperCase());
	nomPartieNew = nomPartieNew.replaceAll(";","");
	nomPartieNew = nomPartieNew.replaceAll(",","");
	nomPartieNew = nomPartieNew.replaceAll(".","");
	nomPartieNew = nomPartieNew.replaceAll(":",""); 
	nomPartieNew = nomPartieNew.replaceAll(" ",""); 
	//nomPartieNew = nomPartieNew.replace(/[^a-zA-Z0-9]/g, '');
	nomPartieNew = nomPartieNew.toUpperCase();
	const select = document.getElementById("NOMPARTIE");
	console.log("SELECT:["+select.id+"] KEY:"+nomPartieNew+"]");
	select.add(new Option(nomPartieNew, nomPartieNew));

	msgTXT = "Option ["+nomPartieNew+"] ajoutée à l'ordre HTML SELECT";
	top.RESU.document.getElementById("RESULTS").value = msgTXT;
	console.log(msgTXT);
	//parent.frames['HDR'].document.getElementById('RESULTS').innerHTML = msgTXT;
	return nomPartieNew;
	}
	
function checkHote()
	{
	var xCPT = 0;
	var elms = document.querySelectorAll("[name='HOTEPAR']");
	for(var i = 0; i < elms.length; i++) 
		{
		if ( elms[i].checked )
			{
			xCPT += 1;
			console.log("L'élément "+i+" est CHECKED")
			var JOUEUR = arrayJ[i].split("!")[2]
			console.log("Hôte:"+JOUEUR);
			parent.frames['HDR'].document.HEADER.NHOTE.value = "Hôte:"+JOUEUR.trim();
			}
		}

	switch (xCPT)
		{
		case 0:
			msgTXT = "Pas de hôte ce soir. Prenez un absent!";
			break;
		case 1:
			msgTXT = "Hôte: "+JOUEUR;
			break;
		default:
			msgTXT = "Un seul hôte par soirée. Faites votre choix!";
		}
		parent.frames["RESU"].document.getElementById("RESULTS").value = msgTXT;
		console.log(msgTXT);	
	}

function import2localStorage(sType1,sType2)
	{ 
	var opts = "height=250,width=950,top=350,left=450,resizable=yes";
	switch (sType1)
		{
		case "SYNCHRO": 
			sType2 = "WIN";
			if ( sType2 === "WIN" ) {
				console.log("IMPORTATION SYNCHRONE DEPUIS OBJECT 'WINDOW'");
				var popup = window.open('./importFile.html', 'IMPORTE', opts);
				if (!popup) {
					alert("Popup blocked");
					}
				else {					
					popup.document.close();	
					}
				}
			else {
				console.log("IMPORTATION SYNCHRONE DEPUIS OBJECT 'FRAME'");
				parent.frames['RESU'].document.getElementById('RESULTATS').innerHTML = JsCode;
				}
			break;
		case "SYNCHRO2":			
			var JsCode = `
			<!DOCTYPE html>
			<html>
			<head>
			<title>IMPORTE FICHIER DE JEUX<\/title>
		 	<\/head>
			<body>
			<input type="file" id="csvFile" accept=".csv">
			<pre id="output"><\/pre>
			<script>
			const fileInput = document.getElementById("fileInput");
			fileInput.addEventListener("change", (e) => {
    			console.log("File selected");
				});
			document.getElementById("csvFile").addEventListener("change", function(event) {
				document.getElementById("output").textContent = "DEBUT IMPORTATION";
				const file = event.target.files[0];
				console.log("Chargement du fichier "+file);
				if (!file) return;
				const reader = new FileReader();
				reader.onload = function(e) {
					const csvText = e.target.result;
					const rows = csvText.trim().split("\n");
					const headers = rows[0].split(",");
					const data = rows.slice(1).map(row => {
						const values = row.split(",");
						return headers.reduce((obj, header, index) => {
							obj[header.trim()] = values[index]?.trim();
							return obj;
						}, {});
					});
					//localStorage.setItem("csvData", JSON.stringify(data));
					console.log("Parsed CSV stored in localStorage", data);
					const data = JSON.parse(localStorage.getItem("csvData") || "[]");
					console.log(data);
				};
				reader.readAsText(file);
			});
			<\/script>
			<\/body>
			<\/html>
			`;
			if ( sType2 === "WIN" ) {
				console.log("IMPORTATION SYNCHRONE DEPUIS OBJECT 'WINDOW'");
				var popup = window.open('', 'IMPORTE', opts);
				if (!popup) {
					alert("Popup blocked");
					}
				else {
					popup.document.write(JsCode);					
					popup.document.close();	
					}
				}
			else {
				console.log("IMPORTATION SYNCHRONE DEPUIS OBJECT 'FRAME'");
				parent.frames['RESU'].document.getElementById('RESULTATS').innerHTML = JsCode;
				}			
			break;
		case "ASYNCHRO": 
			JsCode = `
			<!DOCTYPE html>
			<html>
			<head>
			<title>IMPORTE FICHIER DE JEUX<\/title>
			</head>
			<body>
				<input type="file" id="fileInput" accept=".csv">
				<pre id="output"><\/pre>
				<script>
					document.getElementById("output").textContent= "DEBUT IMPORTATION";
					document.getElementById('fileInput').addEventListener('change', async (e) => {
						const file = e.target.files[0];
						OK = false;
						if (!file) return;
						try {
							const text = await file.text();
							document.getElementById('output').textContent = text;
							alert(text);
							OK = true;
							}
						} 
						catch (err) {
							document.getElementById('output').textContent =
								'Error reading file: ' + err.message;
						}
						if (OK) 
							{
							//localstorage.clear;
							const arrayLS = document.getElementById('output').value.split("\n");
							console.log(arrayLS);
							for (i=0;i<arrayLS.length; i++)
								{
								arrayLINE   = arrayLS[i].toString();
								var keyName = arrayLINE.split(",")[0];
								var valData = arrayLINE.split(",").slice(1).join(",").trim();
								//localStorage.setItem(keyName, valData);
								}
							}
					});
				<\/script>
			<\/body>
			<\/html>
			`;
			if ( sType2 === "WIN" ) {
				console.log("IMPORTATION A-SYNCHRONE DEPUIS OBJECT 'WINDOW'");
				var popup = window.open('', 'IMPORTE', opts);
				if (!popup) {
					alert("Popup blocked");
					}
				else {
					popup.document.write(JsCode);					
					popup.document.close();	
					}	
				}
			else {
				console.log("IMPORTATION A-SYNCHRONE DEPUIS OBJECT 'FRAME");
				parent.frames['RESU'].document.getElementById('RESULTATS').innerHTML = JsCode;
				}			
			break;
		case "BLOB":
			const html = `
			<!DOCTYPE html>
			<html>
			<body>
				<input type="file" id="fileInput" accept=".csv">
				<input type="button" value="IMPORTE" onclick="importData()">
				<pre id="output"><\/pre>
				<script>
					document.getElementById("output").textContent= "DEBUT IMPORTATION";
					document.getElementById('fileInput').addEventListener('change', async (e) => {
						const file = e.target.files[0];
						if (!file) return;
						document.getElementById('output').textContent = await file.text();
						});
				<\/script>
			<\/body>
			<\/html>
			`;
			if ( sType2 === "WIN" ) {
				console.log("IMPORTATION A-SYNCHRONE BLOB DEPUIS OBJECT 'WINDOW'");
				const blob = new Blob([html], { type: 'text/html' });
				const url = URL.createObjectURL(blob);
				oNewWin = window.open(url, '_blank', opts);
				if (!oNewWin) {
					alert("Popup blocked");
					}
				else {
					oNewWin.document.write(JsCode);					
					oNewWin.document.close();	
					}		
				}
			else {
				console.log("IMPORTATION A-SYNCHRONE BOLB DEPUIS OBJECT 'FRAME'");
				const blob = new Blob([html], { type: 'text/html' });
				const url = URL.createObjectURL(blob);
				parent.frames['RESU'].document.getElementById('RESULTATS').innerHTML = url;
				}				
			break;
		default:
			//RAF
		}	
	}

function refreshPageDetail(sFrame,xMesg)
	{
	console.log("=====> "+xMesg);
	parent.frames[sFrame].document.getElementById("RESULTATS").innerHTML = "";
	//parent.frames[sFrame].location.reload();
	//parent.location.reload();
	parent.frames[sFrame].document.getElementById("RESULTS").value = xMesg;
	}

	function localStorage2JSON()
		{
	    const arr = localStorage;
	    var cles  = localStorage.getItem(strD+".00").split(",");
        cles[2]   = "Annonce";

        console.table(arr);

        var formatted = [];
	    for (var i=1; i<arr.length; i++) {
			var d = localStorage.getItem(strD+"."+String(i).padStart(2, '0')).split(",");
            o = {};
			for (var j=0; j<cles.length; j++)
                {
                o[cles[j]] = d[j];
                }
			formatted.push(o);
	        }
        console.table(formatted);
        const JSONdataLS = JSON.stringify(formatted);
		}

function generatePartiesButton()
{
	
}		