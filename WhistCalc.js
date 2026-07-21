console.log('\u058D'.repeat(25)+"DEMARRAGE JS"+'\u058D'.repeat(25));
console.log("Chargement JS dans frame ["+window.name+"] et ajustement taille police")

function init()
	{
	//const { captureRejectionSymbol } = require("events");
	//let sepCSV	  = "!";					//* caractere séparation pour CSV
	//let joueursPfx  = "WHISTER.";
	//let annoncesPfx = "ANNONCES.";
	//let opts        = "height=500,width=1100,top=100,left=100,resizable=yes";
	//var msgTXT 	  = "";
	let ckNamePfx   = "WHIST-"; 
	let ckNameDef   = "PARTIES-WHIST";

	console.log("1>>>"+ckNameDef+"\t"+ckNamePfx);
	console.log("@".repeat(50)+" "+sessionStorage.getItem("reloaded"));

	console.log("1) Check switch sur URL " + top.location.href);
	var xPOS = top.location.href.indexOf("?")
	console.log("1) Controle URL sur '?'. Pos="+xPOS);
	//parent.frames["TITRE"].document.getElementById("switch").value = "";
	//if ( xPOS > -1) { parent.frames["TITRE"].document.getElementById("switch").value = "?"; }

	if ( sessionStorage.getItem("reloaded") ) {

		let strURL = window.location.href;
		msgTXT = "Pages actualisées "+strURL;
		if ( strURL.indexOf("NAVIG.htm") > 0 ) {
			//console.clear();
			console.log(msgTXT);
			//let textarea = parent.frames["RESU"].document.getElementById("RESULTS");
			//textarea.value = msgTXT;
			//let partNO = parent.frames["HDR"].document.getElementById("COOKIE").value;	
			//msgTXT = "Recharge les données "+partNO;
			//reloadPointsArray();;
			}
		} 
	else {
		sessionStorage.setItem("reloaded", "false");
		}

	//manageNomPartie();
	}

function setDefaultFontSizeOnLoad()
	{
	const sizeFont = 90;
	const sizePCcookName = "SCREENSIZE-whist";

	if ( !document.cookie.includes(sizePCcookName) )
		{
		const expires = new Date();
		document.cookie = encodeURIComponent(sizePCcookName) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";	document.cookie = encodeURIComponent(sizePCcookName) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
		expires.setTime(expires.getTime() + 7 * 24 * 60 * 60 * 1000);
		document.cookie =
			encodeURIComponent(sizePCcookName) + "=" +
			encodeURIComponent(sizeFont) +
			"; expires=" + expires.toUTCString() +
			"; path=/";
		}
	console.log("Il y a "+parent.frames.length+" frames à charger...");
	for (let i = 0; i < parent.frames.length; i++) {
		const doc = parent.frames[i].document;
		var sSizeFont = String(sizeFont)
		doc.body.style.zoom = String(sSizeFont)+"%";
		}
	}

function checkNavigateur()
	{
	var msgTXT = "";
	var status = false
	if (navigator.userAgentData) {
		const brands = navigator.userAgentData.brands;
		console.log(brands);
		const hasGoogleChrome = brands.some(item => item.brand === "Google Chrome");
		if ( hasGoogleChrome ) {
			msgTXT += "Bravo. Vous surfez avec Google Chrome. Tout va bien se passer"
			status = true;
			}
		else {
			msgTXT += "Aïe. Vous surfez avec "+brands[2].brand+". Doute sur le bon déroulement. Utilisez 'CHROME'!";
			}
		parent.frames["RESU"].document.RES.RESULTS.value = msgTXT;
		}
	return status;
	}

function changeFontSize(action)
	{
	const expires = new Date();
	var valCookie = 0;
	var sizePCcookName = "SCREENSIZE-whist";
	if ( document.cookie.includes(sizePCcookName) )
		{
		const cookies = document.cookie.split(";");
    	for (let cookie of cookies) {
        	cookie = cookie.trim();
        	if (cookie.startsWith(sizePCcookName + "=")) {
            	valCookie = cookie.substring(name.length + 1).split("=")[1];
				valCookie = valCookie.replace(")","");
        		}
			}
		valCookie = parseInt(valCookie);
		}
	else {
		valCookie = 100;
		expires.setTime(expires.getTime() + 7 * 24 * 60 * 60 * 1000);
		document.cookie =
			encodeURIComponent(sizePCcookName) + "=" +
			encodeURIComponent(valCookie) +
			"; expires=" + expires.toUTCString() +
			"; path=/";
		}

	switch(action) 
		{
		case "-": 
			sizePC = valCookie - 15;
			break;
		case "-+":
			do 	{
				var rep = prompt("Changement de la taille des caractères (en %).\n[20;150]-Proposition: 80%",80);
				if ( rep === "" ) { rep = 80; }
				rep = parseInt(rep);
				}
			while ( !( rep > 19 && rep < 151 ) );
			sizePC = rep;
			break;
		case "+":
			sizePC = valCookie + 15; 
			break;
		default:
			sizePC = valCookie; 
		}
	var msgTXT = parent.frames.length+"x la dimension de caractères de "+valCookie+"% à "+sizePC+"%";
	console.log(msgTXT);

	for (let i = 0; i < parent.frames.length; i++) {
    	const doc = parent.frames[i].document;
		doc.body.style.zoom = String(sizePC)+"%";
		}
	valCookie = sizePC;
	document.cookie = encodeURIComponent(sizePCcookName) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";	document.cookie = encodeURIComponent(sizePCcookName) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
    expires.setTime(expires.getTime() + 7 * 24 * 60 * 60 * 1000);
	document.cookie =
        encodeURIComponent(sizePCcookName) + "=" +
        encodeURIComponent(valCookie) +
        "; expires=" + expires.toUTCString() +
        "; path=/";
	parent.frames["RESU"].document.getElementById("RESULTS").value = msgTXT;
	}

function prepareData()
	{
	console.log('\u25A0'.repeat(25)+"FUNCTION PREPAREDATA"+'\u25A0'.repeat(25));
    
	init();
	setDefaultFontSizeOnLoad();
	
	var xPOS = top.location.href.indexOf("?")
	console.log("Controle URL sur '?'. Pos="+xPOS);
	if ( xPOS > 1 )
		{
		//document.WHIST.getElementById('switch').value = "?" ?? " ";	
		parent.frames["TITRE"].document.WHIST.switch.value	= "?" ?? " ";			
		}

	for (const s of document.scripts) {
    	console.log(">>> "+s.src);
		if ( String(s.src).includes("WhistCalc.js")) { getLastModified(s.src) }
		}
	var msgTXT = "";
	msgTXT += "\nPage web pour saisie des jeux en place";

	listFramesIndex();
	checkIfNodeJS();

	var arrayM = lectureSyncJSON("A");
	msgTXT += "\nLecture fichier JSON des ANNONCES (Lgt="+arrayM.length+")"
	var arrayJ = lectureSyncJSON("J");
	msgTXT += "\nLecture fichier JSON des JOUEURS (Lgt="+arrayJ.length+")"
		
	let navStatus = checkNavigateur();

	var xParties     = reuseParameter("nbrJeux");
	
	const ckNamePfx  = reuseParameter("ckNamePfx");
	const prefix     = ckNamePfx;
	const suffix     = ".00";
	const regex      = new RegExp(`^${prefix}.*${suffix}$`);
	const arrPARTIES = Object.keys(localStorage).filter(key => regex.test(key))
	
	const joueursPfx = reuseParameter("joueursPfx");
 	const arrJOUEURS = Object.keys(localStorage).filter(k => k.startsWith(joueursPfx))

	var flagCREATE = 0;
	if ( arrPARTIES.length === 0 ) {
		flagCREATE = 1;
		if ( arrJOUEURS.length  < 4 ) { flagCREATE++; } 
		if ( parseInt(xParties) < 1 ) { flagCREATE++; } 
		}
	else {
		flagCREATE = 5;
		if ( arrJOUEURS.length  < 4 ) { flagCREATE++; } 
		if ( parseInt(xParties) < 1 ) { flagCREATE++; } 
		}
	switch (flagCREATE)
		{
		case 0:
			msgTXT = "Impossible techniquement";
			break;
		case 1:
			msgTXT = "OK! Encodage nouvelle partie de whist demandée";
			break;
		case 2:
			msgTXT = "Pas moyen de connaitre la liste des joueurs";
			break;
		case 3:
			msgTXT = "Pas de liste des joueurs et pas de limite de jeux";
			break;
		case 5:
			msgTXT = "OK!Déjà "+arrPARTIES.length+" partie(s) de Whist en cours..."
			break;
		case 6:
			msgTXT = arrPARTIES.length+" partie(s) de Whist en cours et pas de JOUEURS";
			break;
		case 7:
			msgTXT = arrPARTIES.length+" partie(s) de Whist en cours et pas de JOUEURS ni de limite de jeux";
			break;
		default:
			msgTXT = "Inconnu techniquement";
		}
	//console.clear();
	msgTXT  = "FLAG="+flagCREATE+"\t"+msgTXT;
	msgTXT += "\n#PARTIES="+arrPARTIES.length+"\t#JOUEURS="+arrJOUEURS.length+"\t#MAX.PARTIES="+xParties;
	console.log(msgTXT);
	//alert(msgTXT);
	if ( flagCREATE === 5 )
		{
		//RAF
		}
	else {
		if ( flagCREATE !== 1 )
			{
			//--- Il y a un soucis de recupérations de données (#joueurs, limite jeux, ...)
			alert(msgTXT);
			}
		else {
			msgTXT += "\nCreation nouvelle partie";
			const arrJOUEURS = [];
			for (let i = 0; i < localStorage.length; i++) {
				const key = localStorage.key(i);
				const val = localStorage.getItem(key)
				if (key.startsWith(joueursPfx)) { arrJOUEURS.push(val); }
				}
			arrJOUEURS.sort();

			remplissageEncodageJeux();
			choosePartie("CNN");

			console.log("@".repeat(100));
			var sCook 	    = parent.frames['HDR'].document.HEADER.COOKIE.value;
			var xCols 	    = (4 + arrJOUEURS.length) + 1;
			//== A PARTIR DU 22/06/26 rajout d'une colonne supplementaire dans la table de JEUX
			//== Cette colonne contient le numero de l'annonce réalisée et a pour but de faciliter
			//== la routine de calculs de statistiques.
			msgTXT += "\nCreation tableau 2D VIDE de "+xParties+"x"+xCols+" cells.";
			console.log(msgTXT);
			aRES = twoDimensionArray(xParties , xCols, "EMPTY", 0);
			console.log(aRES);
			msgTXT += "\nMise à jour LIGNE 0 (header) du tableau 2D"
		
			aRES[0][0] = 'Jeux';			
			aRES[0][1] = 'Donneur';
			aRES[0][2] = 'Annonces de la partie ['+sCook+']';			
			aRES[0][3] = 'Points';		
			for (i = 0; i < arrJOUEURS.length; i++) 
				{
				var joueurID = arrJOUEURS[i].split("!");
				var dataJ = "["+(i+1)+"-"+joueurID[1]+"]";
				j = i + 4;
				aRES[0][j] = dataJ;
				console.log("("+i+","+j+")\t"+dataJ);
				}
			aRES[0][xCols - 1] = 'C-Jeu';
			var lnLine = "";
			for(i = 0; i < xCols; i++)
				{
				lnLine +=aRES[0][i] + ","
				}
			var lsVal = lnLine.slice(0, -1);
			var lsKey = sCook+".00";
			localStorage.setItem(lsKey, lsVal);	
			console.log(aRES);
			msgTXT += "\NREGÉNÉRATION DU CODE HTML POUR VOIRE TABLEAU 2D";
		
			rebuildHTML(0,sCook,"0");
			}
		}
	}

function checkNavigator()
	{
	const isChrome = navigator.userAgentData?.brands.some(
    	b => b.brand === "Google Chrome"
  		) ?? false;
	alert(isChrome);
	if ( !isChrome ) {
		var msgTEXT = "Vous n'utilisez pas Google chrome. Dommage. Des soucis en perspectives dès lors;"
		parent.frames["RESU"].document.getElementById("RESULTATS").value = msgTEXT;
		}
	}

function remplissageEncodageJeux()
	{		
    var ligneData = "";
	var thisHtml  = `
<TABLE CLASS="MATRICE" BORDER=0 BORDERCOLOR=RED CELLSPACING=10 CELLPADDING=2 WIDTH=100%>
<TR ALIGN=CENTER VALIGN='TOP'>
<TD WIDTH=10%   CLASS="tdHote"   >H<BR>Ô<BR>T<BR>E</TD>
<TD WIDTH=10%   CLASS="tdDonne"  >D<BR>O<BR>N<BR>N<BR>E</TD>
<TD WIDTH=10%   CLASS="tdEnjeu"  >E<BR>N<BR>J<BR>E<BR>U</TD>
<TD WIDTH=10%   CLASS="tdContre" >C<BR>O<BR>N<BR>T<BR>R<BR>E</TD>
<TD WIDTH=60%   CLASS="tdJoueurs"><BR><BR><B><U>Joueurs</U></B><BR><BR></TD>
</TR>`;

	let joueursPfx  = "WHISTER.";
	const el = document.getElementById("JOUEURSHTM");
	console.log(el);
	el.innerHTML = "...";
	const arrJ= Object.keys(localStorage).filter(k => k.startsWith(joueursPfx)).sort().map(k => ({ key: k, value: localStorage.getItem(k) }));
	console.log(arrJ);
	for (i = 0; i < arrJ.length; i++) {	
		var clef  = arrJ[i].key
		var data  = arrJ[i].value.toString().split("!");
		var pNom  = "JOUEUR" + i.toString().padStart(2, "0");
		var key   = data[0]+"-"+data[1];
		//var pIde  = " ["+key+"] "+data[2]+" ";
		var pIde  = "["+key+"]";

		ligneData += pIde+"\n";
		console.log("Création ligne de HTML checkBox pour: '"+pIde+"'");

		thisHtml += "\n"+"<TR ALIGN=CENTER VALIGN=MIDDLE>";
		thisHtml += "\n"+"<TD CLASS='tdHote'>	 	<input type='checkbox' class='cbMatrice' value='"+key+"' NAME='HOTEPAR'  id='HOTEPAR'  unchecked onchange='JavaScript:checkHote()'></TD>";
		thisHtml += "\n"+"<TD CLASS='tdDonne'>		<input type='checkbox' class='cbMatrice' value='"+key+"' NAME='DONNEPAR' id='DONNEPAR' unchecked ></TD>";
		thisHtml += "\n"+"<TD CLASS='tdEnjeu'> 		<input type='checkbox' class='cbMatrice' value='"+key+"' NAME='ENJEUPAR' id='ENJEUPAR' unchecked ></TD>";
		thisHtml += "\n"+"<TD CLASS='tdContre'> 	<input type='checkbox' class='cbMatrice' value='"+key+"' NAME='JOUERPAR' id='JOUERPAR' unchecked ></TD>";
		thisHtml += "\n"+"<TD CLASS='tdJoueurs'> 	<b>"+pIde+"</b></TD>";
		thisHtml += "\n"+"</TR>";
		}
	thisHtml += "</TABLE>";
	el.innerHTML = thisHtml;

	}

function loopSeconds(nSec)	
	{
	const duree = nSec * 1000;
	const debut = Date.now();
	console.log(new Date().getSeconds());
	do 	{
		// R
		} 
	while (Date.now() - debut < duree); 
	console.log(new Date().getSeconds());
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

function getCookieByPrefix(prefix) 
	{
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name.startsWith(prefix)) {
            return {
                name: name,
                value: decodeURIComponent(value)
            	};
        	}
    	}
    return null;
	}

function viewLocalStorage(swOPTION)
	{
	// swOPTION = 0 => return list of available parties to build buttons in ENTETE.htm
	// swOPTION = 1 => display/clean issues of all localStorage content in frame RESU.htm
	// swOPTION = 2 => display all localStorage content in pop-up window

	const srcCook    = "SCREENSIZE-whist";
	var arrayParties = [];
	var cookieName   = reuseParameter("ckNameDef");
	if ( typeof cookieName !== "undefined" ) {
		var strCookie = getCookie2(cookieName);	
		}
	var strCookie = getCookieByPrefix(cookieName);
	const screenCookie = getCookieByPrefix(srcCook);
	const ckNamePfx = reuseParameter("ckNamePfx");
	const ckNameDef = reuseParameter("ckNameDef");
	let joueursPfx  = reuseParameter("joueursPfx"); 
	let annoncesPfx = reuseParameter("annoncesPfx"); 
	const arrPfx4 = Object.keys(localStorage).filter(k => k.startsWith("0-WHISTAPP")).sort().map(k => ({ key: k, value: localStorage.getItem(k) }));
	const arrPfx1 = Object.keys(localStorage).filter(k => k.startsWith(ckNamePfx)).sort().map(k => ({ key: k, value: localStorage.getItem(k) }));
	const arrPfx2 = Object.keys(localStorage).filter(k => k.startsWith(joueursPfx)).sort().map(k => ({ key: k, value: localStorage.getItem(k) }));
	for (let i = 0; i < arrPfx2.length; i++) {
		arrPfx2[i].value = String(arrPfx2[i].value).replaceAll("!",",");
		}
	const arrPfx3 = Object.keys(localStorage).filter(k => k.startsWith(annoncesPfx)).sort().map(k => ({ key: k, value: localStorage.getItem(k) }));
	for (let i = 0; i < arrPfx3.length; i++) {
		arrPfx3[i].value = String(arrPfx3[i].value).replaceAll("!",",");
		}
	const storeArray = arrPfx1.concat(arrPfx2, arrPfx3, arrPfx4);
	console.log(storeArray);
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

	console.log(storageArray);

	if ( swOPTION === 1 ) {
		saveBrowserLS(storageArray, "LS");
		}

	var flag	   = true;
	var htmlString = "";
	var csvString  = "<H3>\n<PRE style='text-align:left;'>"
	
	if (strCookie) {
		csvString += "COOKIE: "+strCookie.name+"="+strCookie.value+"\n";
		}
	if (screenCookie) {
		csvString += "COOKIE: "+screenCookie.name+"="+screenCookie.value+"\n";
		}
	
	var cptParties = 0;
	var xcpt = -1;

	csvString  += '\u25A0'.repeat(120)+"\n"; 
	htmlString += "<H3>";
	htmlString += "PARTIE DE WHIST EN ACTIVITE DANS LE NAVIGATEUR: "+strCookie+"</H3>";
	htmlString += "<OL>";

	for (let i = 0; i < storageArray.length; i++) 
		{
		row    = storageArray[i];
		curKey = row.key;
		curVal = row.value.split(",");
		chkNb1 = "("+String(curVal[2]).trim()+"|"+String(curVal[3]).trim()+")";
		chkNb2 = curVal.some(cell => cell.toString().toLowerCase().includes("nan"));
		if ( curKey.endsWith(".00")) { flag = true; }
		if ( chkNb1 === "(|)" ) { flag = false; }
		if ( chkNb2 ) { flag = false; }
		if (!flag){
			console.log("["+flag+"]\t"+chkNb1+"\t REC:"+i+"\tEFFACEMENT DE LA CLEF ["+curKey+"] DU 'LOCALSTORAGE'");
			//localStorage.removeItem(curKey);
			}
		
		if ( curKey.endsWith(".00") ) { 
			cptParties ++;
			if ( cptParties > 1 ) {
				htmlString  += "</UL></LI><BR>";
				csvString	+= '\u25A0'.repeat(120)+"\n"; 
				}
			xcpt = -1;
			flag = true;
			var sCOOK   = storageArray[i].toString().split(",")[0].split(".")[0];
			htmlString += '<LI CLASS="persLI1">'+'PARTIE #'+cptParties+' ['+curKey + '] EN MEMOIRE. LES JEUX SONT LES SUIVANTS:';
			htmlString += "<HR><UL>"; 
			sPartie     = curKey.replace(".00","");
			arrayParties.push(sPartie);
			} 
	
		xcpt++;
		xcptStr = String(i + 1).padStart(3, "0")+"-"+String(xcpt).padStart(3, "0");
		msgTXT = "<LI CLASS='persLI2'>["+flag+"]\tROW("+xcptStr+") "+storageArray[i]+"</LI>";
		htmlString  += msgTXT + "<BR>";
		keyLine 	 = curKey;
		dataLine 	 = curVal;
		csvString	+= flag+"\t"+xcptStr+"\t\t"+keyLine+"\t"+dataLine+"\n";
		}
	htmlString += "</UL></LI></OL><BR>"; 
	var yBrowser   = parent.frames["HDR"].document.getElementById('BRWBOUT').outerHTML;
	var maxParties = arrayParties.length;
	htmlString += "<P CLASS='persLI1'>";
	htmlString += "VOUS AVEZ "+maxParties+" PARTIES DANS LA MEMOIRE DE VOTRE NAVIGATEUR ";
	htmlString += yBrowser;
	htmlString += "<BR>" + arrayParties; 
	csvString  += "\n\n";
	switch (swOPTION)
		{
		case 0:
			console.log("Parties en mémoire:\n"+arrayParties)
			return arrayParties;
			break;
		case 1:
			// Display all localStorage content in frame RESU.htm
			csvString = "<PRE CLASS='petit'>"+csvString+"</FONT></PRE>";
			//parent.frames['RESU'].history.go(-2);
			parent.frames['RESU'].document.getElementById('RESULTATS').innerHTML = csvString;	
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
	const ckNameDef = parent.frames["HDR"].document.HEADER.ckNameDef.value;
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
		msgTXT = "LOCALSTORAGE et COOKIE effacés! (LGT="+localStorage.length;
		console.log(msgTXT);
		alert(msgTXT);
		parent.frames['RESU'].document.getElementById('RESULTS').value = msgTXT;
		}
	else {
		parent.frames['RESU'].document.getElementById('RESULTATS').innerHTML = "";
		}
	}

function saveBrowserLS(xARR, sKEY)
	{
	if ( sKEY === null ) { sKEY = "__"; }

	var csv = " \n";
	for (let i = 0; i < xARR.length; i++) {
		var key = xARR[i].key;
		var val = xARR[i].value;
    	csv += key + "," + val + "\n";
		}

	const filename  = generateFileName('csv');
	const ckNamePfx = reuseParameter("ckNamePfx");
	const ficName   = ckNamePfx + sKEY+"-"+filename;

	const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
	const link = document.createElement("a");
	link.href = URL.createObjectURL(blob);
	link.download = (ficName).replaceAll("_","");
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
	URL.revokeObjectURL(link.href);
	console.log("Fichier '"+ficName+"' sauvé dans le folder téléchargement du navigateur");
	}

function refreshPage()
	{
	parent.frames['RESU'].document.getElementById('RESULTATS').innerHTML = "";
	}

function effaceUnJeuSelection()
	{
	const ckNamePfx = reuseParameter("ckNamePFX");
	var keyName = getCookie2(ckNamePfx); 
	console.log("CLE DE LA PARTIE: "+keyName);
	
	var html = parent.frames["RESU"].document.RES.headerDELIN.value;

	const arrayPartie = Object.keys(localStorage)
    	.filter(key => key.startsWith(keyName))
    	.map(key => ({
        	key,
        	value: localStorage.getItem(key)
    		}))
    	.sort((a, b) => a.key.localeCompare(b.key));

	const stats = new Map(); var cptParties = 0; var cbInd = -1;
	for(i=0; i<arrayPartie.length; i++) {
		var cle  = arrayPartie[i].key;
		var val  = arrayPartie[i].value;
		var valS = val;
		if ( i > 0 ) { 
			val = val.split(",");
			valS  = "";
			valS += val[0].padEnd(3, " ");
			valS += val[1].padEnd(6, " ");
			valS += val[2].padEnd(45, " ");
			for(j=3; j<val.length; j++) { valS += val[j].padEnd(9, " "); }
			}
		cbInd++;
		cbIndex = String(cbInd).padStart(2, "0");
		html += '\n<tr align=top id="tROW">\n<td id="titre2">&nbsp;&nbsp;&nbsp;';		
		if ( i > 0 ) {
			html += "\n<input type='checkbox' id='"+cbIndex+"' unchecked class='large-checkbox'>";
			}
		html += "&nbsp;&nbsp;&nbsp;</td>\n<td>&nbsp;"+cle+"&nbsp;</td>";
		html += "\n<td>&nbsp;<pre>"+valS+"</pre>\n</td></tr>";
		}
		html += parent.frames["RESU"].document.RES.headerDELOUT.value;
	parent.frames["RESU"].document.getElementById("RESULTATS").innerHTML = html;
	}

function effacerJeux()  
    {
    const checked = document.querySelectorAll('input[type="checkbox"]:checked');
	const keyName = parent.frames["HDR"].document.getElementById("COOKIE").value;
    console.log(checked);
    var arrayCB = "";
    checked.forEach(cb => { arrayCB += keyName+"."+cb.id+"!" });
    console.log(arrayCB);
    effaceJeuPartie(arrayCB);
    }

function effaceJeuPartie(xCB) 
	{
	//alert(xCB.split("!"));
	console.log(xCB.split("!"));
	return;

	const ckNameDef = parent.frames["HDR"].document.HEADER.ckNameDef.value;
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
	const ckNamePfx = parent.frames["HDR"].document.HEADER.ckNamePfx.value;

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
  			link.download = (ficName).replaceAll("_","");
			document.body.appendChild(link);
  			link.click();
			document.body.removeChild(link);
  			URL.revokeObjectURL(link.href);
			break;
		case "IJ1":
			async function loadCSV() 
				{
				console.log("Chargement du fichier ["+ficName+"]");
				const response = await fetch(ficName);
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
	//console.clear();
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
		//const ckNamePfx = parent.frames["HDR"].document.HEADER.ckNamePfx.value;
		const ckNamePfx = reuseParameter("ckNamePfx");
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

		// var xParties    = document.WHIST.PARTIES.value;
		// var xParties    = parent.frames['TITRE'].document.WHIST.PARTIES.value
		// var nbrJoueurs  = document.WHIST.JOUEURS.value;
		var nbrJoueurs  = parent.frames['TITRE'].document.WHIST.JOUEURS.value
		var xParties	= reuseParameter("nbrJeux");
		const arrayJ    = nbrJoueurs.split('\n');
		var xJOUEURS	= arrayJ.length + 3;
		console.log("APPEL ROUTINE DE CREATION TABLE DE WHIST ["+xParties+"x"+xJOUEURS+"]");

		//== A PARTIR DU 22/06/26 rajout d'une colonne supplementaire dans la table de JEUX
		//== Cette colonne contient le numerode l'annonce réalisée et a pour but de faciliter
		//== la routine de calculs de statistiques.
		var xCols = (xJOUEURS) + 1;

		aRES = twoDimensionArray(xParties, xCols, "EMPTY2",0); 
		const d = new Date();
		let year = d.getFullYear();
		var oldKeyLine = "";
		var oldLocLine = "";
		var k = -1;
		for (i=0;i<localStorageArray.length;i++)
			{
			curKeyLine = localStorageArray[i].toString().split("|")[0].split(".")[0];
			curLocLine = localStorageArray[i].toString().split("|")[1].split(",");
			console.log(curLocLine);
			if ( i === 0 ) 
				{ 
				k += 1;
				curLocLine[curLocLine.length] = "-";
				for (j=0; j<curLocLine.length - 1; j++)
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
				aRES[k][10] = "/";		//* une colonne de + depuis le 22/6/26
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
		aRES[k][10] = "/";		//* une colonne de + depuis le 22/6/26

		for (j=4; j<aRES[k+1].length; j++)
				{
				aRES[k+1][j] = 0;
				}
		aRES[k+1][0] = 0;
		aRES[k+1][10] = "/";		//* une colonne de + depuis le 22/6/26

		console.log(aRES);
		
		// TOTAUX GENERAUX

		aRES[k+1][3] = 0;
		aRES[k+1][0] = 0;
		for (i=1; i<k+1; i++)
			{
			totalPTS	 = 0;
			aRES[k+1][0] = parseInt(aRES[k+1][0])+parseInt(aRES[i][0]);
			for (j=4; j<aRES[0].length - 1; j++)
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
	return aRES;
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

function imprimerZone(idElement,sType) 
	{
	var msgTXT = "Fichier 'CSV' sauvé dans le folder de téléchargement du navigateur";
	parent.frames['RESU'].document.getElementById('RESULTS').value=msgTXT;
	console.log("TYPE:"+sType);
	console.log(idElement);
	var pfx = parent.frames['HDR'].document.getElementById('ckNamePfx').value;
	const timestamp = new Date().toISOString().replaceAll(":",".");
	if ( pfx === "" ) { pfx = "WHIST-"; }
	var fichier = pfx+timestamp+'.csv';
	if ( sType === "MEM" ) {
		fichier = pfx+'MEMOIRE-'+timestamp+'.csv';
		console.log("FICHIER:"+fichier);
		}
	
	const text = idElement;
	const blob = new Blob([text], { type: 'text/csv' });
	const url  = URL.createObjectURL(blob);
	const link = document.createElement('a');
	link.href = url;
	link.download = fichier;
	link.click();

	}

function impressionRes(strFORMAT)
    {
	console.log("Demande impression au format '"+strFORMAT+"'");

    if ( strFORMAT === 'LARGE' )
        {
		var dataIN  	= parent.frames["RESU"].document.RES.headerIN.value;
		var dataOUT 	= parent.frames["RESU"].document.RES.headerOUT.value;
		var htmlString 	= parent.frames['RESU'].document.getElementById("RESULTATS").outerHTML;	
		//webPage += dataIN + "\n";
		//webPage + "\n" + dataOUT;

		var webPage = "";
		webPage += "<HTML>";
		webPage += "\n<meta http-equiv='Content-Type' content='text/html; charset=utf-8'/>";
		webPage += "\n<meta http-equiv='Cache-Control' content='no-cache'>";
		webPage += "\n<HEAD></HEAD>\n<BODY>";
		webPage += htmlString;
		webPage += "\n</BODY></HTML>";

		var webHead		= getCookie2(reuseParameter("ckNameDef"));
		var optsWin		= reuseParameter("defOpts");

		var swKEEP = parent.frames["NAV"].document.getElementById("copie").checked;
		if ( swKEEP ) {
			const ficName = generateFileName("html");
			const blob = new Blob([webPage], { type: "text/html;charset=utf-8" });
			const link = document.createElement("a");
			link.href = URL.createObjectURL(blob);
			link.download = (ficName).replaceAll("_","");
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
			URL.revokeObjectURL(link.href);
			}
		
		const blob = new Blob([webPage], { type: "text/html" });
		const url  = URL.createObjectURL(blob);
		window.open(url, "_blank");
		setTimeout(() => URL.revokeObjectURL(url), 60000);

        }

	if ( strFORMAT === 'PRINT' )
        {
		var htmlString = parent.frames['RESU'].document.getElementById("RESULTATS").outerHTML;	
		console.log(htmlString);
		let opts = "height=500,width=1100,top=100,left=100,resizable=yes";
		var oNewWin = window.open("", "", opts);
		oNewWin.document.body.innerHTML = htmlString;
		oNewWin.print(); 
		oNewWin.close();
        }	

    if ( strFORMAT === 'CSV' )
        {
		var htmlData = parent.frames["RESU"].document.getElementById("RESULTATS").outerHTML;
		var posKey1  = htmlData.indexOf("<h3>");
		var posKey2  = htmlData.indexOf("</h3>");
		console.log("SPECIAL CSV - MEMOIRE:("+posKey1+","+posKey2+")");
		if ( posKey1 > 0 && posKey2 > posKey1 + 4 )
			{
			imprimerZone(htmlData.slice(posKey1 + 4, posKey2),"MEM");	
			}
		else {
			//var stPrefix = parent.frames["HDR"].document.getElementById("ckNamePfx").value;
			//var laPartie = parent.frames["HDR"].document.getElementById("COOKIE").value;
			var stPrefix = reuseParameter("ckNamePfx");
			var laPartie = reuseParameter("ckNameDef");
			console.log("PARTIE:"+laPartie+"\t"+"PREFIX:"+stPrefix);

			if ( laPartie.startsWith(stPrefix) )
				{
				//const strD = new Date().toISOString().slice(0, 10).replace(/-/g, '');
				//const ckNamePfx = parent.frames["HDR"].document.HEADER.ckNamePfx.value;
				const ckNamePfx = reuseParameter("ckNamePFX");
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
				imprimerZone(allARRAY,"");	
				}
			else {
				var htmlTable = parent.frames['RESU'].document.getElementById("RESULTATS").outerHTML;
				var xpos1 = htmlTable.indexOf("<table id");
				var xpos2 = htmlTable.indexOf('<tr><td class="SPECIAL">-</td>'); 
				console.log("From:"+xpos1+"\tTill:"+xpos2);
				htmlTable  = htmlTable.slice(xpos1, xpos2);
				htmlTable += "</table>";
				htmlTable  = htmlTable.replace("<tr></tr>", "");
				console.log(htmlTable);
				const parser = new DOMParser();
				const doc = parser.parseFromString(htmlTable, 'text/html');
				const table = doc.body.firstElementChild;
				console.log(table);
				var csvLines = "";
				for (const row of table.rows) {
					for (const cell of row.cells) {
						csvLines += cell.textContent.trim() + ","
						}
					csvLines  = csvLines.slice(0, -1) + "\n"
					}
				console.log(csvLines);
				imprimerZone(csvLines,"");
				}
			}
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
function calculator(strOption)
	{ 
	console.log('\u25A0'.repeat(25)+"FUNCTION CALCULATOR ('"+strOption+"')"+'\u25A0'.repeat(25));

	var cptDON = 0;
	var cptJEU = 0;
	var cptPAR = 0;

	const frameDoc = parent.frames["TITRE"].document;
	var elms = frameDoc.querySelectorAll("[name='DONNEPAR']");
	console.log(elms);
 	for(var i = 0; i < elms.length; i++) { if (elms[i].checked) { cptDON ++ }; }
	var elms = frameDoc.querySelectorAll("[name='ENJEUPAR']");
	for(var i = 0; i < elms.length; i++) { if (elms[i].checked) { cptJEU ++ }; }
	var elms = frameDoc.querySelectorAll("[name='JOUERPAR']");
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
		calculator2(strOption);	
		}
	return swOK;

	}

function calculator2(xOption)
	{
	console.log('\u25A0'.repeat(25)+"FUNCTION CALCULATOR2 ('"+xOption+"')"+'\u25A0'.repeat(25));

  	var data    = [];
	var enjeu   = document.getElementById("RESULTATSJEU");
	var enjeuX	= enjeu.options[enjeu.selectedIndex].value;
	var mise    = enjeu.options[enjeu.selectedIndex].text;

	// RETIRE LA CLE DE L'ANNONCE POUR AJOUTER FIN TABLE
	console.log("§".repeat(60));
	console.log(enjeuX);
	var enjeuXX = enjeuX.split("!");
	console.log(enjeuXX);
	var cleJEU = enjeuXX[1];
	console.log("CLE:"+cleJEU);
	enjeuX = enjeuX.replace("!"+cleJEU+"!","!");
	console.log(enjeuX);
	console.log("§".repeat(60));

	var points  = enjeu.value;
	points = points.replace("!"+cleJEU+"!","!");
	var msgTXT	= "ENJEU FINAL:\nPOS:["+cleJEU+"]\n[X="+enjeuX+"]\n[V="+points+"]\n[T="+mise+"]";
	console.log(msgTXT);

	parent.frames['RESU'].document.RES.RESULTS.value = msgTXT;
	
	if ( points === "" )
		{
		alert("Vous n'avez pas choisi une mise/annonce\nFaites-le!")
		return
		}
	
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
	console.log("^".repeat(80));
	console.log(data);
	var sCook = parent.frames['HDR'].document.HEADER.COOKIE.value;
	reloadPointsArray(sCook);
	memorise(data,cleJEU,xOption);
	return false;  
 	}

function memorise(strDATA1, cleJEU, StrOptionM)
	{
	console.log('\u25A0'.repeat(25)+"FUNCTION MEMORISE ('"+StrOptionM+"')"+'\u25A0'.repeat(25));
	console.log("*".repeat(50)+"\n"+strDATA1+"\n"+"*".repeat(50));
	var strDATA2 = strDATA1.toString()+"$";
	strDATA3 = strDATA2.split(",").join("\n");

	var xParties    = reuseParameter("nbrJeux");
	var nbrJoueurs  = parent.frames["TITRE"].document.WHIST.JOUEURS.value;
	const arrayJ    = nbrJoueurs.split('\n');
	var xJOUEURS	= arrayJ.length - 1;
	console.log("JOUEURS DEFINIS.....:\n"+document.WHIST.JOUEURS.value);
	console.log("NOMBRE DE JOUEURS...:\t"+xJOUEURS);
	console.log("#PARTIES:"+xParties+"\t\t#JOUEURS:"+xJOUEURS);

	if (typeof aRES === 'undefined') 
	   	{
		//xParties = parent.frames["TITRE"].document.WHIST.PARTIES.value;	
		xParties = reuseParameter("nbrJeux")	
		console.log("Pas encore de résultats. Création matrice pour "+xParties+" partie(s)!");
		cptPARTIE = 0;
		cptPOINTS = 0;
		parent.frames['HDR'].document.HEADER.NPARTIE.value = cptPARTIE;
		parent.frames['HDR'].document.HEADER.ENJEUX.value  = cptPOINTS;

		//== A PARTIR DU 22/06/26 rajout d'une colonne supplementaire dans la table de JEUX
		//== Cette colonne contient le numerode l'annonce réalisée et a pour but de faciliter
		//== la routine de calculs de statistiques.
		var xCols = (4 + xJOUEURS) + 1;

		aRES = twoDimensionArray(xParties , xCols, "ALL",0) 
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
	sANNONCE = "["+cleJEU+"] "+sANNONCE;
	sTYPEJEU = sPOINTS.split('!')[4];
	sPOINTS	 = sPOINTS.split('!')[3].trim();
	sDONNEUR = sDONNEUR.split('-')[0];
	console.log("DONNEUR:"+sDONNEUR);
	sBONNI	 = sBONNI.replaceAll("[","");
	sMALUS 	 = sMALUS.replaceAll("[","");

	nPARTIE  = Math.floor(parent.frames['HDR'].document.HEADER.NPARTIE.value) + 1;
	strDATA4 = "CLE:"+cleJEU+"\tANN:"+sANNONCE+"\nPTS:"+sPOINTS+"\nDON:"+sDONNEUR+"\nJEU:"+sBONNI+"\nOPP:"+sMALUS+"\nPAR:"+nPARTIE+"\nTYPE:"+sTYPEJEU;

	console.log(strDATA4);
	if ( document.WHIST.switch.value === "?")
		{
		console.log("@".repeat(50));
		console.log(strDATA4)
		console.log("*".repeat(50));
		parent.frames["TITRE"].document.WHIST.PARAM.value = strDATA4;
		}
	
	//console.log("BONNI: "+sBONNI);
	strJENJEU = sBONNI.split("!"); 
	txtWIN=" (";
	//console.log("WINNER: "+strJENJEU);
	for (let k = 0; k < strJENJEU.length; k++)
		{
		console.log("K="+k+"\t"+strJENJEU[k]);
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
			//console.clear();
			console.log("Multi option? '"+StrOptionM+"' ");
			if ( StrOptionM.toUpperCase() === "X" )
				{
				var vainqueur = v1;
				}
			else {
				var vainqueur = prompt(msgTXT, 0);
				}
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
			htmlTAB += "<TR CLASS='.cellinfo'>";
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
				aRES[i][rowSIZE - 1] = cleJEU;
					
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

			if ( j >= 0 )
				{
				var tdHTML = "<TD align=CENTER>";
				if ( j === 0 )
					{
					var tdHTML = "<TD CLASS='.cellinfo'>";		
					}			
				if ( j === 2 && aRES[i][3] < 0 )
					{
					var tdHTML = "<TD CLASS='PERDU1'>";		
					}
				if ( j === 3 && aRES[i][3] < 0 )
					{
					var tdHTML = "<TD align=CENTER  CLASS='PERDU2'>";		
					}
				htmlTAB += tdHTML+aRES[i][j]+"</TD>";
				}
	   		else {
				htmlTAB += "<TD>"+aRES[i][j]+"</TD>";
				}
			if ( i === 0 ) {
				//var tdHTML = "<TD align=CENTER BGCOLOR=LIGHTGREEN>";
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

async function fetchFichier(fic, sType) 
	{
	var text;
	try {
		const response = await fetch(fic);
		if (!response.ok) {
			text = `HTTP ${response.status}`; 
			throw new Error(text); 
			}
		else {
			switch (sType.toUpperCase())
				{
				case "TEXT":
					text = await response.text();
					return text;
					break;
				case "HTML":
					text = await response.text();
					return text;
					break;
				case "CSV":
					text = await response.text();
					return text;
					break;
				case "JSON":
					text = await response.json();
					return text;
					break;
				default:
					text = "Extension ["+sType+"] invalide.";
				}
			}
		} 
	catch (error) {
		text = "Fetch failed:" + error;
		}
	parent.frames["WHIST"].document.getElementById("PARAM").value = text;
	return;
	}

function rebuildHTML(nTR, keyName,sKEY)
	{
	console.log('\u25A0'.repeat(25)+"FUNCTION REBUILDHTML"+'\u25A0'.repeat(25));

	var totalPTS = 0;
	var limHTML  = aRES.length;
	var limCOLS  = aRES[0].length;

	console.log("RECREATION D'UNE CHAINE HTML <TABLE> DE "+nTR+" LIGNE(S) et "+limCOLS+" COLONNES\nDEPUIS LA CLE PARTIE ["+keyName+"]");

	var strURL  = location.hostname;
		
	console.log("APPLICATION HOSTEE SUR SERVER '"+strURL+"'");
	
	const dataIN  = parent.frames["RESU"].document.getElementById("headerIN").value;
	const dataOUT = parent.frames["RESU"].document.getElementById("headerOUT").value;
	
	var htmlTAB = "";
	htmlTAB += dataIN;
	htmlTAB += "\n<TABLE id='innerHtmlTable' CLASS='mytr' ID='POINTS' BORDER=1 BORDERCOLOR='RED' CELLSPACING=0 CELLPADDING=5 WIDTH=100%>";
	for (let i = 0; i< limHTML; i++) 
		{	
		if ( i === 0 ) { 
			htmlTAB += '\n<thead>\n<tr>\n'; 
			}
		else {
			htmlTAB += "\n<TR>";
			}
	
		if ( i === nTR - 1 )
			{
			console.log("DERNIERE LIGNE N° "+ i +" --- CALCUL DES TOTAUX");
			var sommeLinePos = 0; var sommeLineNeg = 0;
			for(ix=4; ix<aRES[i].length - 1; ix++)
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
		strCLASS = "CLASS='cellinfo'";
		//if ( i >= nTR+1 && sKEY === "1" ) { 
		var xLIM = nTR
		if ( sKEY === "1" ) { xLIM = nTR + 2; }
		if ( i >= xLIM ) { 
			htmlTAB += "<TR BGCOLOR=LIGHTGREEN>";
			strCLASS = ""
			}

		var rowSIZE = aRES[i].length;
        for (let j = 0; j< rowSIZE; j++) 
			{
			var hOrD  = i === 0 ? "<TH "  : "<TD ";
			var hOrDf = i === 0 ? "</TH>" : "</TD>";
			switch (j) 
				{
				case 0:
					var tdHTML = hOrD + strCLASS + ">";
					break;
				case 2:
					var tdHTML = hOrD + " align=LEFT>";
					if ( parseInt(aRES[i][3]) < 0 ) { var tdHTML = hOrD + " CLASS='PERDU1'>"; }
					break;
				case (rowSIZE - 1):
					var tdHTML = hOrD +strCLASS+" align=RIGHT>";
					break;
				case (3):
					if ( i === 0 ) 
						{ 
						var totalPTS = 0; 
						}
					else {
						totalPTS += Math.abs(parseInt(aRES[i][3]));
						}
					var tdHTML = hOrD + " align=CENTER>";
					if ( parseInt(aRES[i][3]) < 0 ) { var tdHTML = hOrD + " align=CENTER CLASS='PERDU2'>";}
					break;
				default:
					strCLASS = "";
					if ( i > 0 ) { strCLASS = "CLASS='celldata'"; }
					strCLASS = "CLASS='celldata'";
					var tdHTML = hOrD + strCLASS+" align=CENTER>";
				}
			if ( i === 0 ) 
				{ 
				var tdHTML = hOrD + strCLASS+" align=center>";
				}
			htmlTAB += tdHTML+aRES[i][j]+hOrDf;
        	}
		htmlTAB += "</TR>\n";
		if ( i === 0 ) 
			{ 
			htmlTAB += "</thead>\n<tbody>";
			}
    	}
	htmlTAB += "\n</tbody>\n</TABLE>\n";
	htmlTAB += dataOUT;

	var sizeLS = String(getLocalStorageSize()) + "KB < 5MB";;
	
	//var totauxPts = totalPTS;

	parent.frames['HDR'].document.HEADER.sizeLS.value  = sizeLS;
	parent.frames['HDR'].document.HEADER.NPARTIE.value = nTR - 1;
	parent.frames['HDR'].document.HEADER.ENJEUX.value  = totauxPts;
	parent.frames['RESU'].document.getElementById('RESULTATS').innerHTML = htmlTAB;
	
	}

function getLocalStorageSize() 
	{
	const encoder = new TextEncoder();
	let totalBytes = 0;
	for (let i = 0; i < localStorage.length; i++) 
		{
		const key   = localStorage.key(i);
		const value = localStorage.getItem(key);
		totalBytes += encoder.encode(key).length;
		totalBytes += encoder.encode(value).length;
		}
	totalBytes = (totalBytes / 1024).toFixed(2)
	console.log("LS size in Kb:"+totalBytes);
	return totalBytes;
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
	var sCar = reuseParameter("bSquare");
	console.log(sCar.repeat(25)+"FUNCTION SAVEPOINTSARRAY"+sCar.repeat(25));
	//const strD = new Date().toISOString().slice(0, 10).replace(/-/g, '');
	//strD = parent.frames['HDR'].document.HEADER.COOKIE.value;
	//strD = window.parent.parent.frames['HDR'].HEADER.getElementById("COOKIE").value;
	//console.log(window.parent.parent.frames['HDR'].document)
	
	var cookParm = reuseParameter("ckNameDef")
	var strD = getCookie2(cookParm);

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
	console.log('\u25A0'.repeat(25)+"FUNCTION RELOADPOINTSARRAY"+'\u25A0'.repeat(25));
	console.log("$".repeat(80));
	console.log("RELOAD POINTS ARRAY DEPUIS LA CLE ["+strCookParam+"]");
	console.log("$".repeat(80));
	ckNameDef = reuseParameter("ckNameDef");
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

	msgTXT = "";
	if ( ! cookParam )
		{
		msgTXT += "\nChoisissez tout d'abord un nom de partie de WHIST dans le panneau de droite"
		//alert(msgTXT);
		//parent.frames['RES'].document.getElementById("RESULTS").value = msgTXT;
		//const docFrameR = parent.frames["RESU"].document;
		//docFrameR.getElementByID("RESULTS").value = msgTXT;
		console.log(msgTXT);
		return;
		}
    console.log("Recharge en mémoire des parties depuis le 'LOCALSTORAGE' du browser'");
	console.log("PARTIES DE WHIST DEMANDEES: "+cookParam);
	msgTXT += "\nRecherche dans le LS de tous les jeux de la partie "+cookParam;
	if ( checkFormFieldAvailability("RESU", "RES",	"RESULTS") ) {
		parent.frames['RESU'].document.getElementById("RESULTS").value = "";
		}

	var strD = new Date().toISOString().slice(0, 10).replace(/-/g, '');
	//strD = parent.frames['HDR'].document.HEADER.COOKIE.value 
	strD = reuseParameter("ckNameDef");

	var strDate = strD;
	strSELECT = true;
	while (strSELECT) 
		{
		//Object.entries(localStorage).forEach(([k,v]) => console.log(k.padEnd(50), v, v.length, (v.length / 1024).toFixed(1) + 'KB'))	
		xcpt = -1;
		if(localStorage.length > 0)
			{
			var localStorageArray = new Array();
			//const ckNamePfx = parent.frames["HDR"].document.HEADER.ckNamePfx.value;
			ckNamePfx = reuseParameter("ckNamePfx");
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
			msgTXT += "\nEncore aucun jeu enregistré dans la partie ["+cookParam+"]";
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
	var nbrJoueurs  = parent.frames["TITRE"].document.WHIST.JOUEURS.value;
	var frameDoc = parent.frames["TITRE"].document;
	var swAVAIL  = checkFormFieldAvailability("TITRE","WHIST","JOUEURS");
	if ( swAVAIL ) { 
		var nbrJoueurs = frameDoc.WHIST.JOUEURS.value;
		}
	var xParties    = reuseParameter("nbrJeux");
	const arrayJ    = nbrJoueurs.split('\n');
	var xJOUEURS	= arrayJ.length - 1;
	if ( xJOUEURS < 4 ) {
		var joueursPfx = reuseParameter("joueursPfx");
 		arrayJ = Object.keys(localStorage).filter(k => k.startsWith(joueursPfx))
		xJOUEURS = arrayJ.length - 1;
		}

	//== A PARTIR DU 22/06/26 rajout d'une colonne supplementaire dans la table de JEUX
	//== Cette colonne contient le numerode l'annonce réalisée et a pour but de faciliter
	//== la routine de calculs de statistiques.
	var xCols = (4 + xJOUEURS) + 1;

	msgTXT += "\nCreation d'un tableau VIDE 2D de "+xParties+"x"+xCols;
	aRES = twoDimensionArray(xParties , xCols, "EMPTY", 0);

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
	msgTXT += "\nCreation d'une chaine HTML contenant le tableau 2D";
	rebuildHTML(ii,keyName,"0");
	console.log(msgTXT);
	return aRES;
    }

function twoDimensionArray( a, b, typeTable, codeJeu) 
	{

	console.log('\u25A0'.repeat(25)+"FUNCTION twoDimensionArray"+'\u25A0'.repeat(25));
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
				case (b - 1):
					arrRES[i][j] = codeJeu;
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
	arrRES[0][b - 1] = 'C-Jeu';	
	
	console.log("TITRE LISTING:"+arrRES[0][2]);

	var nbrJoueurs  = parent.frames["TITRE"].document.WHIST.JOUEURS.value;
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
	arrRES[0][b - 1] = "C-Jeu";
	console.log("TABLE des joueurs créée:\n"+arrayJ);

	console.log("ROW(0)\t\tSIZE: "+arrRES[0].length+"\t\tCONTENU: "+arrRES[0]);
	console.log("ROW(1)\t\tSIZE: "+arrRES[1].length+"\t\tCONTENU: "+arrRES[1]);
	console.log("ROW(2)\t\tSIZE: "+arrRES[2].length+"\t\tCONTENU: "+arrRES[2]);
	console.log("ROW(3)\t\tSIZE: "+arrRES[3].length+"\t\tCONTENU: "+arrRES[3]);

	return arrRES;
	}

function getCookie3() 
	{
	const ckNameDef = parent.frames["HDR"].document.HEADER.ckNameDef.value;
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
	var strD      = new Date().toISOString().slice(0, 10).replace(/-/g, '');
	var select1   = parent.frames['HDR'].document.getElementById("NOMPARTIE");
	console.log("CHOIX PARTIE:"+nomPAR);
	//const ckNamePfx = parent.frames["HDR"].document.HEADER.ckNamePfx.value;
	//const ckNameDef = parent.frames["HDR"].document.HEADER.ckNameDef.value;
	const ckNamePfx = reuseParameter("ckNamePfx");
	const ckNameDef = reuseParameter("ckNameDef");

	var msgTXT = "";
	if ( nomPAR === "??" )
		{
		msgTXT += "Recherche les parties existantes dans le localStorage\n";
		console.log(msgTXT);

		//var keyName = parent.frames['TITRE'].document.getElementById("PARPFX").value;
		keyName = ckNamePfx;
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
		msgTXT += "\nDemande de création d'une nouvelle partie";
		console.log(msgTXT);

		var nomPAR = prompt("Entrez le nom de votre nouvelle partie",strD);
		nomPAR = nomPAR.toUpperCase();
		nomPAR = nomPAR.replace(ckNamePfx,"");
		console.log("VOUS AVEZ CHOISI DE NOMMER UNE NOUVELLE PARTIE: '"+nomPAR+"'");

		switch (nomPAR)
			{
			case "":
				mgTXT += "\nEMPTY - Vous avez entré aucun nom de PARTIE. Aucune action sera appliquée."
				nomPAR = null;
				break;
			case undefined:
				mgTXT += "\nUNDEF - Vous avez entré aucun nom de PARTIE. Aucune action sera appliquée."
				nomPAR = null;
				break;	
			case null:
				mgTXT += "\nNULL - Vous avez entré aucun nom de PARTIE. Aucune action sera appliquée."
				nomPAR = null;
				break;	
			default: 
				//msgTXT = "";
			}
		//parent.frames['RESU'].document.RES.getElementById('RESULTS').value = msgTXT;
		top.RESU.document.getElementById("RESULTS").value = msgTXT;
		}

	if ( nomPAR != null )
		{
		msgTXT += "\nAnalyse de la nouvelle partie";
		console.log(msgTXT);

		var xCPT = -1;
		console.log("NOM:"+nomPAR.slice(0,6)+"\t\tckNamePfx:"+ckNamePfx);
		if ( nomPAR.slice(0,6) === ckNamePfx )
			{
			msgTXT += "\nNouvelle partie déjà existante. Lecture dans LS des jeux de cette partie";
			console.log(msgTXT);

			//===== C'est une PARTIE qui existe. On cherche les jeux de cette PARTIE =========
			xCPT = 0;
			document.HEADER.COOKIE.value = nomPAR;
			//limiteJeux = parent.frames['TITRE'].document.WHIST.NBRPARTIES.value.split(":")[1];
			limiteJeux = Object.keys(localStorage).filter(key => key.includes(nomPAR)).length;
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
				msgTXT += "\nNouvelle partie déjà crée mais ne contient AUCUN jeu";
				console.log(msgTXT);

				//===== PARTIE existante mais aucun jeux =====
				msgTXT += "\nLa PARTIE ["+ckNamePfx+nomPAR+"] déjà créée. Pas de jeux dans cette PARTIE";
				console.log(msgTXT)
				top.RESU.document.getElementById("RESULTS").value = msgTXT;
				}
			else {
				msgTXT += "\nCréation de la nouvelle PARTIE. Suite....";
				console.log(msgTXT);

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
				//limiteJeux = parent.frames['TITRE'].document.WHIST.NBRPARTIES.value.split(":")[1];
				limiteJeux = reuseParameter("nbrJeux");
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
					msgTXT += "\nLA NOUVELLE PARTIE SOUHAITEE ["+nomPAR+"] EXISTE DEJA. CREATION REFUSEE";
					//top.RESU.document.getElementById("RESULTS").value = msgTXT;
					top.RESU.document.getElementById("RESULTATS").innerHTML = "";
					}
				else {
					//===== CREATION NOUVEAU COOKIE POUR NOUVELLE PARTIE
					nomPAR = ckNamePfx + nomPAR;
					msgTXT += "\nCréation du nouveau cookie ["+nomPAR+"]";

					var ckName = creerCookie(ckNameDef, nomPAR);
					var ckName = createNewOptionSelect(nomPAR);
					msgTXT += "\nReset du tableau 2D pour le cookie "+nomPAR;
					reloadPointsArray(ckName);
					msgTXT += "\nLE SYSTEME EST PRET A L'ENTREE DE JEUX POUR CETTE NOUVELLE PARTIE ["+ckName+"]";
					console.log(msgTXT);
					//top.RESU.document.getElementById("RESULTS").value = msgTXT;
					refreshPageDetail("HDR",msgTXT);
					refreshPageDetail("RESU",msgTXT);
					}
				}
			else {
				//=== DEMANDE DE VISIONNAGE D'UNE PARTIE =====
				var ckName = creerCookie(ckNameDef, nomPAR);
				msgTXT += "\nDemande de visionnage de la PARTIE ["+ckName+"]";
	
				//var ckName = createNewOptionSelect(nomPAR);
				var msgTXT1 = "Sélectionnez l'activité [RECHARGE PARTIE] pour charger la partie ["+ckName+"] en mémoire\n";
				//top.RESU.document.getElementById("RESULTS").value = msgTXT;
				console.log(msgTXT1);
				refreshPageDetail("RESU",msgTXT1);
				reloadPointsArray(ckName);
				}
			}
		}
	else {
		//===== CREATION NOUVEAU COOKIE POUR NOUVELLE PARTIE
		//===== REFUSEE CAR LE NOM DE PARTIE EST "NULL"
		//var ckName = createCookie(nomPAR)
		//msgTXT += "LE SYSTEME EST PRET A L'ENCODAGE DE LA PARTIE ["+ckName+"]\n";
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
		console.log("'"+(element.split("=")[0]).trim()+"'::'"+cname+"'");
		if ( (element.split("=")[0]).trim() === cname ) { var ckName = element.split("=")[1] }
		//var ckName = element.split("=")[1]
		}
	if ( ckName === "" ) {
		var msgTXT = "Veuillez charger une partie ou bien en créer une nouvelle";
		parent.frames["RESU"].document.getElementById("RESULTS").value = msgTXT;
		}
	console.log("COOKIE VALUE='"+ckName+"'");
    return ckName
	}

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
		const ckNameDef = parent.frames["HDR"].document.HEADER.ckNameDef.value;
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
	const ckNameDef = parent.frames["HDR"].document.HEADER.ckNameDef.value;
	nomPartieNew = (ckNameDef, nomPartieNew.toLocaleUpperCase());
	nomPartieNew = nomPartieNew.replaceAll(";","");
	nomPartieNew = nomPartieNew.replaceAll(",","");
	nomPartieNew = nomPartieNew.replaceAll(".","");
	nomPartieNew = nomPartieNew.replaceAll(":",""); 
	nomPartieNew = nomPartieNew.replaceAll(" ",""); 
	//nomPartieNew = nomPartieNew.replace(/[^a-zA-Z0-9]/g, '');
	nomPartieNew = nomPartieNew.toUpperCase();
	const select = top.frames["HDR"].document.getElementById("NOMPARTIE");	
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
	var frameDoc = parent.frames["TITRE"].document;
	var swAVAIL  = checkFormFieldAvailability("TITRE","WHIST","JOUEURS");
	if ( swAVAIL ) { 
		var arrayJ = frameDoc.WHIST.JOUEURS.value.split("\n");
		}
	var swAVAIL  = checkFormFieldAvailability("TITRE","WHIST","HOTEPAR");
	if ( swAVAIL ) 
		{ 
		var elms = frameDoc.querySelectorAll("[name='HOTEPAR']");
		}
	else {
		msgTXT = "N'ouliez pas de dire qui invite ce soir..."
		parent.frames['RESU'].document.getElementById("RESULTS").value = msgTXT;
		return false;
		}
	var xCPT = 0;
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
			var lgt=localStorage.length;
			if ( lgt === 0 ){
				msgTXT = "La 'localStorage' du navigateur pour cette application est vide (l="+lgt+")";
			}
			else {
				msgTXT = "Pas de hôte ce soir? Prenez un absent!";
			}
			break;
		case 1:
			msgTXT = "Hôte: "+JOUEUR;
			break;
		default:
			msgTXT = "Un seul hôte par soirée. Faites votre choix!";
		}
		console.log(msgTXT);
		if ( checkFormFieldAvailability("RESU", "RES",	"RESULTS") ) {
			parent.frames['RESU'].document.getElementById("RESULTS").value = msgTXT;
			}
		console.log(msgTXT);	
	}

function import2localStorage(sType1,sType2)
	{ 
	let opts = "height=500,width=1100,top=100,left=100,resizable=yes";
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
				let opts = "height=500,width=1100,top=100,left=100,resizable=yes";
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
				let opts = "height=500,width=1100,top=100,left=100,resizable=yes";
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
				let opts = "height=500,width=1100,top=100,left=100,resizable=yes";
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
	var field = parent.frames[sFrame].document.getElementById("RESULTATS")
	if ( field != null ) { field.innerHTML = "" };
	//parent.frames[sFrame].location.reload();
	//parent.location.reload();
	field = parent.frames[sFrame].document.getElementById("RESULTS");
	if ( field != null ) { field.value = xMesg; }
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

function computeStats()
	{
	msgTXT = "Quelques statistiques...";
	parent.frames['RESU'].document.getElementById('RESULTS').value = msgTXT;

	var listJeux = reuseParameter("ckNamePfx");
	const arrParam = Object.keys(localStorage).filter(k => k.startsWith(listJeux)).sort().map(k => ({ key: k, value: localStorage.getItem(k) }));
	const stats = new Map(); var cptParties = 0;
	for(i=0;i<arrParam.length;i++) {
		var lineJeuKey = arrParam[i].key;
		var lineJeuVal = arrParam[i].value;
		if ( lineJeuKey.endsWith(".00") ) { 
			cptParties++;
			}
		else {
			lineJeuVal   = lineJeuVal.split(",");
			var nbrCeJeu = 0;
			if ( lineJeuVal.length < 11 ) {
				// Depuis le 22/06/26 ajout d'une colonne avec le code "annonce"
				// utile pour le calcul de statistiques.
				var codeJeu = 0;
				}
			else {
				var codeJeu = lineJeuVal[lineJeuVal.length - 1];
				}
			if ( stats.has(codeJeu) ) { var nbrCeJeu = stats.get(codeJeu); }
			nbrCeJeu++;
			stats.set(codeJeu,nbrCeJeu);
			}
		}
	const today = new Date();
	const date  =
    	String(today.getDate()).padStart(2, '0') + '/' +
    	String(today.getMonth() + 1).padStart(2, '0') + '/' +
    	today.getFullYear();
	const nbrJeux = i - cptParties;
	const clefJeu = reuseParameter("annoncesPfx"); var icpt = 0;
	const arr2D = [];
	for (const [key, value] of stats) {
		var ix	   = String(parseInt(key) - 1).padStart(2, '0');
		var ind    = clefJeu+ix;
		var lineLS = localStorage.getItem(ind);
		var lineLS = String(lineLS).split("!");
		var leJeu  = lineLS[1]+" "+lineLS[2];
		var lesPoints = lineLS[3];
		arr2D[icpt] = [];
		arr2D[icpt][0] = leJeu;
		arr2D[icpt][1] = lesPoints;
		arr2D[icpt][2] = value;
		icpt++;
		}
	statsHTML = "";
	statsHTML += "<CENTER><H3>Statistiques du "+date+" sur "+cptParties+" soirée(s) de Whist</H3>\n";
	statsHTML += "<BR><B>Il y a eu "+nbrJeux+" annonce(s) classée(s) comme ci-dessous:</B>\n"
	var swAVAIL = false;
	if ( swAVAIL ) {
		statsHTML += "<BR>&nbsp;<p CLASS='petit'>\n";
		statsHTML += "<BR>Au départ, l'application ne conservait pas le code 'MISE/ANNONCE' ce qui ";
		statsHTML += "<BR>entravait un intéressant calcul de statistiques de jeux. Depuis le 22/6/26, le";
		statsHTML += "<BR>problème a été résolu en ajoutant une colonne supplémentaire aux données de";
		statsHTML += "<BR>jeux. C'est la raison de ce manque d'information mentionnée dans ces stats.";
		statsHTML += "</p>\n";
		}
	statsHTML += "<BR><P>\n";
	statsHTML += "<TABLE WIDTH=90% BORDER=2 BORDERCOLOR=BLUE CELLSPACING=0 CELLPADDING=3>\n";
	statsHTML += "<TR ALIGN=CENTER><TH class='cellinfo'>SEQUENCE</TH><TH class='cellinfo'>ANNONCES</TH>";
	statsHTML += "<TH class='cellinfo'>POINTS</TH><TH class='cellinfo'>OCCURENCES</TH></TR>\n";	
	
	arr2D.sort((a, b) => b[b.length - 1] - a[a.length - 1]);
	
	statsCSV = "ANNONCES,POINTS,OCCURENCES\n";
	for(i=0;i<arr2D.length;i++) {
		var sWarn = "";
		if ( arr2D[i][1] === undefined ) { sWarn = " CLASS='petit'" }
		statsHTML += "<TR ALIGN=CENTER><TD CLASS='cellinfo'>"+(i+1)+"</TD><TD"+sWarn+">"+arr2D[i][0]+"</TD>";
		statsHTML += "<TD"+sWarn+">"+arr2D[i][1]+"</TD><TD"+sWarn+">"+arr2D[i][2]+"</TD></TR>\n";
		statsCSV  += arr2D[i][0]+","+arr2D[i][1]+","+arr2D[i][2]+"\n";
		}
	statsHTML += "</TABLE>\n</P>\n</CENTER><BR><PRE>";
	statsHTML += statsCSV+"\n\n";

	var swPopUp = checkFormFieldAvailability("RESU", "RES", "RESULTATS");

	if ( swPopUp ) {
		const frame = parent.frames["RESU"];
		frame.document.getElementById("RESULTATS").innerHTML = statsHTML;
		}
	else {
		var opts = reuseParameter("defOpts")
		var statsWin = window.open("","STATISTIQUES", opts);
		statsWin.document.write(statsHTML);
		}
	}
	
function checkFormFieldAvailability(wPage, wForm, wField)
	{
	var swAVAILABLE = false;
	const frame = parent.frames[wPage];
	try {
    	//const frame = parent.frames["RESU"];
		console.log("FRAME:"+wPage+" is '"+frame.document.readyState+"'");
		if (frame.document.readyState === "complete") {
    		const field = frame.document.forms[wForm].elements[wField];
			console.log("FIELD: "+wFIELD+" is '"+field+"'");
			if ( field === undefined ) {
				parent.frames[wPage].onload = function () {
    				field = frame.document.forms[wForm].elements[wField];
					if ( field ) {
        				console.log("Field ready:", field.value);
						swAVAILABLE = true;
    					}
					}
				}
			}
		}
	catch {
		var swAVAILABLE = true;
		}
	return swAVAILABLE;	
	}	

//*=== Provenant de "WHIST-ANNONCE.htm" ===
function noRepeatRandom()
	{
    nextList = sourceList.filter(function(x){return x!=lastNumber});
    randomIndex = Math.floor(Math.random() * nextList.length);
    lastNumber = nextList[randomIndex] 
    return lastNumber
	}

function specialSet(xSTR)
	{
	//console.clear();
	const min = 1;
	const max = 5;
	const listNumbers = new Array(6).fill(0);
	var randomNumber = 0;

	for(var k = 1; k < listNumbers.length; k++) 
		{ 
		do 	{
			var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
			//console.log(k+"\t"+randomNumber+"\t"+listNumbers.includes(randomNumber))
			}
		while ( listNumbers.includes(randomNumber) );
		listNumbers[k] = randomNumber;
		}		
	console.log(listNumbers);
	let min1 = 0;
	let max1 = 0;
	let min2 = 0;
	let max2 = 0;
	
	let joueursPfx  = reuseParameter("joueursPfx");
	const arrJ= Object.keys(localStorage).filter(k => k.startsWith(joueursPfx)).sort().map(k => ({ key: k, value: localStorage.getItem(k) }));
	console.log(arrJ);
	for (i = 0; i < arrJ.length; i++) {	
		var clef  = arrJ[i].key
		var data  = arrJ[i].value.toString().split("!");
		}
	
	//var nbrAnnonces = parent.frames['TITRE'].document.getElementById('ANNONCES').value;
	var nbrAnnonces = parent.frames['TITRE'].document.WHIST.ANNONCES.value;
	let arrayM = nbrAnnonces.split('\n');
	for(var k = 0; k < arrayM.length; k++) 
		{ 
		let lineAnn = arrayM[k].split("!");
		switch ( parseInt(lineAnn[4]) )
			{
			case 1:
				if ( min1 === 0 ) { min1 = parseInt(lineAnn[0]); } 
				if ( min1 !== 0 ) { max1 = parseInt(lineAnn[0]); } 
				break;
			case 2:
				if ( min2 === 0 ) { min2 = parseInt(lineAnn[0]); } 
				if ( min2 !== 0 ) { max2 = parseInt(lineAnn[0]); } 
				break;
			default:
				console.log("K="+k+"\t("+lineAnn[4]+")>("+lineAnn[0]+")\t["+min1+"]"+"["+max1+"]"+"\t\t["+min2+"]"+"["+max2+"]");
			}
		}
	var annSeul = Math.floor(Math.random() * (max1 - min1 + 1)) + min1;
	var annEmb  = Math.floor(Math.random() * (max2 - min2 + 1)) + min2;
	console.log("RANDOM JEU - SEUL:"+annSeul+"\tEMBALLAGE:"+annEmb);

	resetJeu("NO");

	var strD = getCookie2(reuseParameter("ckNameDef"));
	console.log("VALEUR COOKIE:'"+strD+"'");

	if ( strD === undefined ) 
		{
		msgTXT = "VEUILLEZ D'ABORD CREER UNE PARTIE. REQUETE IMPOSSIBLE";
		console.log(msgTXT);
		parent.frames['RESU'].document.RES.RESULTS.value = msgTXT;
		return;
		}

	const frameDoc = top.frames["TITRE"].document;
	console.log(frameDoc);
	console.log(frameDoc.querySelectorAll("[name='ENJEUPAR']"));
	console.log(listNumbers);
	console.log(document.forms['WHIST'].elements['RESULTATSJEU'].options);

	const options = document.forms['WHIST'].elements['RESULTATSJEU'].options;
	var listOpt = "";
	for (const option of options) {
		listOpt += "\n"+option.text+"\t"+option.value;
		}
  	//alert(options.length+"\n"+listOpt);

	var listCB = "";
	if ( xSTR === 1 )
		{
		k=listNumbers[0]; var elms = frameDoc.querySelectorAll("[name='HOTEPAR']");  elms[k].checked = true;
		k=listNumbers[1]; var elms = frameDoc.querySelectorAll("[name='DONNEPAR']"); elms[k].checked = true;
		k=listNumbers[2]; var elms = frameDoc.querySelectorAll("[name='ENJEUPAR']"); elms[k].checked = true;
		k=listNumbers[3]; var elms = frameDoc.querySelectorAll("[name='JOUERPAR']"); elms[k].checked = true;
		k=listNumbers[4]; var elms = frameDoc.querySelectorAll("[name='JOUERPAR']"); elms[k].checked = true;
		k=listNumbers[5]; var elms = frameDoc.querySelectorAll("[name='JOUERPAR']"); elms[k].checked = true;
		document.forms['WHIST'].elements['RESULTATSJEU'].options.selectedIndex = annSeul;
		console.log(elms[k].checked);

		listCB += "\n<HTML><BODY><BR>" + arrayM[annSeul];
		listCB += "\n<TABLE BORDER=1>"
		for(var t=0; t < listNumbers.length; t++)
			{
			listCB += "\n<TR><TD>"+xSTR+"</TD><TD>"+t+"</TD><TD>"+elms[t].checked+"</TD><TD>"+arrJ[t].value+"</TD></TR>";
			}
		listCB += "\n</TABLE></BODY></HTML>"

		}

	if ( xSTR === 2 )
		{
		k=listNumbers[0]; var elms = frameDoc.querySelectorAll("[name='HOTEPAR']");  elms[k].checked = true;
		k=listNumbers[1]; var elms = frameDoc.querySelectorAll("[name='DONNEPAR']"); elms[k].checked = true;
		k=listNumbers[2]; var elms = frameDoc.querySelectorAll("[name='ENJEUPAR']"); elms[k].checked = true;
		k=listNumbers[3]; var elms = frameDoc.querySelectorAll("[name='ENJEUPAR']"); elms[k].checked = true;
		k=listNumbers[4]; var elms = frameDoc.querySelectorAll("[name='JOUERPAR']"); elms[k].checked = true;
		k=listNumbers[5]; var elms = frameDoc.querySelectorAll("[name='JOUERPAR']"); elms[k].checked = true;
		document.forms['WHIST'].elements['RESULTATSJEU'].options.selectedIndex = annEmb;
		console.log(elms[k].checked);

		listCB += "\n<HTML><BODY><BR>" + arrayM[annEmb];
		listCB += "\n<TABLE BORDER=1>"
		for(var t=0; t < listNumbers.length; t++)
			{
			listCB += "\n<TR><TD>"+xSTR+"</TD><TD>"+t+"</TD><TD>"+elms[t].checked+"</TD><TD>"+arrJ[t].value+"</TD></TR>";
			}
		listCB += "\n</TABLE></BODY></HTML>"

		}
	//parent.frames["HDR"].document.getElementById("hasard").innerHTML = listCB;
	//var opts = reuseParameter("defOpts");
	//var newWin = window.open("","",opts);
	//newWin.document.write(listCB);
	//newWin.close();
	}

function resetJeu(xCODE)
    {           
    const frameDoc = parent.frames["TITRE"].document;
	var elms = frameDoc.querySelectorAll("[name='DONNEPAR']");
 	for(var i = 0; i < elms.length; i++) { elms[i].checked = false; }
	var elms = frameDoc.querySelectorAll("[name='ENJEUPAR']");
 	for(var i = 0; i < elms.length; i++) { elms[i].checked = false; }
	var elms = frameDoc.querySelectorAll("[name='JOUERPAR']");
	for(var i = 0; i < elms.length; i++) { elms[i].checked = false; }
    }

function displayParameters(strINFO)
	{
	console.log('\u25A0'.repeat(25)+"displayParameters("+strINFO+')\u25A0'.repeat(25));

	var HtmlParams = "";	
	HtmlParams += "<"+"!DOCTYPE html"+">\n";
	HtmlParams += "<HTML><HEAD>";
	HtmlParams += "<link rel='stylesheet' href='Whist.css'>\n";
	HtmlParams += "</HEAD><"+"BODY"+">\n"
	HtmlParams += "<CENTER>\n";
	HtmlParams += "<BR><TABLE CLASS='mytr' BORDER=1 CELLSPACING=0 CELLPADDING=5 WIDTH=50% HEIGHT=50%>\n";

	switch(strINFO) 
		{
		case "IMPORTE": 
			//var nbrPARAM = document.WHIST.AIDEAPP.value;
			var nbrPARAM = parent.frames['TITRE'].document.WHIST.AIDEAPP.value;
			//var nbrPARAM = parent.frames['TITRE'].document.getElementById('AIDEAPP').value;
			var lblTEXT1 = "CLIQUEZ SUR LE BOUTON ET CHOISISSEZ LE FICHIER";
			var lblTEXT2 = "";
			var lblTEXT3 = "";
			var lblDISPO = " ALIGN=RIGHT";
			var swMETHOD = "HTML1";
			var swMETHOD = "WIN1";
			break;		
		case "A":
			//var nbrPARAM = document.WHIST.ANNONCES.value;
			var nbrPARAM = parent.frames['TITRE'].document.WHIST.ANNONCES.value;
			//var nbrPARAM = parent.frames['TITRE'].document.getElementById('ANNONCES').value;
			var lblTEXT1 = "ANNONCé";
			var lblTEXT2 = "REALISé";
			var lblTEXT3 = "POINTS";
			var lblDISPO = " ALIGN=RIGHT";
			var swMETHOD = "FRAME";
			break;
		case "J":
			//var nbrPARAM = document.WHIST.JOUEURS.value;
			var nbrPARAM = parent.frames['TITRE'].document.WHIST.JOUEURS.value;
			//var nbrPARAM = parent.frames['TITRE'].document.getElementById('JOUEURS').value;
			var lblTEXT1 = "INDEX";
			var lblTEXT2 = "CODE";
			var lblTEXT3 = "JOUEUR"
			var lblDISPO = " ALIGN=CENTER";
			var swMETHOD = "FRAME";
			break;
		case "H":
			var nbrPARAM = parent.frames['TITRE'].document.WHIST.AIDEAPP.value;
			//var nbrPARAM = parent.frames['TITRE'].document.getElementById('AIDEAPP').value;	
			var nbrPARAM = parent.frames['TITRE'].document.WHIST.AIDEAPP.value;
			var lblTEXT1 = "Aide définie dans l'application";
			var lblTEXT2 = "Contact";
			var lblTEXT3 = "-";
			var lblDISPO = " ALIGN=LEFT";
			var swMETHOD = "WIN3";
			break;
		default:
			var nbrPARAM = "A\nB\n";
			var lblTEXT1 = "";
			var lblTEXT2 = "";
			var lblTEXT3 = "";
			var lblDISPO = " ALIGN=RIGHT";
			var swMETHOD = "HTML2";
			var swMETHOD = "WIN2";
		}
	
	HtmlParams += '<thead>\n<TR CLASS="ROW" ALIGN="CENTER">\n';
	HtmlParams += '<TD CLASS="cellinfo">Nbr</TD>\n';
	HtmlParams += '<TD CLASS="cellinfo">'+lblTEXT1+'</TD>\n';
	HtmlParams += '<TD CLASS="cellinfo">'+lblTEXT2+'</TD>\n';
	HtmlParams += '<TD CLASS="cellinfo">'+lblTEXT3+'</TD>\n';
	HtmlParams += '</TR>\n</thead>\n<tbody>';

	const arrayP = nbrPARAM.split('\n');
	console.log(arrayP);

	for (i = 0; i < arrayP.length-1; i++) 
		{
		count = i + 1;
		if ( strINFO === "A" )
			{
			var key   = arrayP[i].split('!')[1].trim();
			var data1 = arrayP[i].split('!')[2].trim();
			var data2 = arrayP[i].split('!')[3].trim();
			var opt	  = arrayP[i].split('!')[4].trim();
			}	
		if ( strINFO === "J" )
			{
			var key   = arrayP[i].split('!')[0].trim();
			var data1 = arrayP[i].split('!')[1].trim();
			var data2 = arrayP[i].split('!')[2].trim();
			var opt	  = "3";
			}
		if ( strINFO === "IMPORTE" )
			{
			var key   = "<input id='fileInput' type='file' accept='.csv'>"; 
			console.log(key);
			var data1 = "&nbsp;";
			var data2 = "&nbsp;";
			var opt	  = "4";
			count = "&nbsp;";
			i = arrayP.length;
			}

		switch (opt)
			{
			case "1":
				var bgcol1 = "BGCOLOR=LIGHTGREY";
				break;
			case "2":
				var bgcol1 = "BGCOLOR=LIGHTGREEN";
				break;
			case "3":
				var bgcol1 = "BGCOLOR=LIGHTBLUE";
				break;
			case "4":
				var bgcol1 = "";
				break;
			default:
				var bgcol1 = "";
			}

		HtmlParams += "<TR><TD CLASS='cellinfo' ALIGN=CENTER>"+count+"</TD>\n"
		HtmlParams += "<TD "+lblDISPO+" "+bgcol1+">\n"+key+"\n";
		HtmlParams += "</TD>";
		HtmlParams += "<TD ALIGN=CENTER "+bgcol1+">"+data1+"</TD>";
		HtmlParams += "<TD ALIGN=CENTER "+bgcol1+">"+data2+"</TD>";
		HtmlParams += "</TR>";
		}
	HtmlParams += "</tbody></TABLE>\n";
	HtmlParams += "</CENTER>";
	HtmlParams += "<"+"/BODY"+">";
	HtmlParams += "<"+"/HTML"+">";

	console.log(HtmlParams);
	
	if ( strINFO === "H" || strINFO ==="X" || strINFO ==="A" || strINFO === "J" || strINFO === "IMPORTE" )
		{
		let opts = "height=500,width=1100,top=100,left=100,resizable=yes";
		switch (swMETHOD) 
			{
			case "HTML1": 
				parent.frames['RESU'].location.href = "importFile.html";
				break;
			case "HTML2": 
				parent.frames['RESU'].location.href = "Avertissement.htm";
				break;
			case "WIN1": 
				var myWindow = window.open("importFile.html", "WHIST-IMPORT", opts);
				break;			
			case "WIN3": 
				var myWindow = window.open("Aide.htm", "WHIST-INFORMATION", opts);
				break;
			case "WIN2": 
				var myWindow = window.open("Avertissement.htm", "WHIST-AVERTISSEMENT", opts);
				break;							
			default:
				parent.frames['RESU'].document.getElementById('RESULTATS').innerHTML = HtmlParams;
			}
		}
	else {
		var strAIDE = "";
		strAIDE += '<TABLE BORDER=0 WIDTH=100% HEIGHT=70%>'
		strAIDE += '<TR ALIGN=LEFT VALIGN=MIDDLE><TD><SPAN CLASS="WHISTEURS3">';
		//strAIDE += '<PRE><STRONG>';
		//strAIDE += document.WHIST.AIDEAPP.value;
		strAIDE += parent.frames['TITRE'].document.getElementById('AIDEAPP').value
		//strAIDE += '<STRONG></PRE>';
		strAIDE += '</SPAN></TD></TR></TABLE>';
		//parent.frames['RESU'].document.getElementById('RESULTATS').innerHTML = strAIDE;
		let opts = "height=500,width=1100,top=100,left=100,resizable=yes";
		var myWindow = window.open("", "WHIST-AIDE", opts);
		myWindow.document.write(strAIDE);
		}

	}

function startImport()
	{	
	const inf = "<";
	const sup = ">";
	var pdfURL = window.location.protocol + "//" + window.location.host + "/pdfs";
	var aHref  = inf+'A HREF="'+pdfURL+'"'+sup+'LISTE DE TOUS LES PDF'+inf+'/A'+sup;
	console.log("URL: "+aHref);
	var htmlText = "";
	htmlText += inf+'TABLE BORDER="0" WIDTH="100%"" HEIGHT="100vh"'+sup;
	htmlText += inf+'TR ALIGN=CENTER VALIGN=MIDDLE'+sup+inf+'TD'+sup;
	htmlText += inf+'H2'+sup+aHref+inf+'/H2'+sup;
	htmlText += inf+"/TD"+sup+inf+'/TR'+sup+inf+'/TABLE'+sup;
	htmlText += inf+"CENTER"+sup;
	htmlText += inf+"INPUT TYPE='BUTTON' VALUE='FERMER' onclick='window.close()'"+sup;
	htmlText += inf+"/INPUT"+sup;
	htmlText += inf+"/CENTER"+sup;
	let opts = "height=500,width=1100,top=100,left=100,resizable=yes";
	var myWindow = window.open("importFile.html", "WHIST-IMPORT", opts);
	myWindow.document.write(htmlText);
	//parent.frames[2].document.getElementById("RESULTATS").innerHTML = htmlText;
	//document.write;
	}

function multiGeneration()
	{
	msgTXT  = "";
	msgTXT += "Il se peut que l'application vous demande d'autres informations\n";
	msgTXT += "par exemple: Lors de 2 misères dont une perdue. Le systeme veut\n";
	msgTXT += "qui des 2 joueurs impliqués a perdu/gagné";

	parent.frames["TITRE"].document.WHIST.PARAM.value = msgTXT;

	do 	{
		var rep = parseInt(prompt("Combien de partie(s) voulez-vous générer?\nPS: Entre 0 et 30?",5));
		}
	while ( !(rep >= "0" && rep <= 30 ) );

	if ( rep > 0 )
		{
		for (let j=1; j<=rep; j++)
			{
			const nombre = Math.floor(Math.random() * 1000) + 1;
			if (nombre % 2 === 0) 
				{ 
				console.log(nombre+" est PAIR. Generation d'un 'EMBALLAGE'...");
				specialSet(2); 
				}
			else {
				console.log(nombre+" est IMPAIR. Generation d'un 'SEUL'...");
				specialSet(1);
				}
			calculator("X");
			}
		}
	}

function prepareActivity(strOption) 
	{
	//console.clear();
	console.log("OPTION MENU: '"+strOption+"'");
	parent.frames["RESU"].document.getElementById("RESULTS").value = strOption
	switch (strOption)
		{
		case "A":
			//reloadPointsArray();
			effaceUnePartie();
			break;
		case "B":
			initialiseData();
			break;
		case "C":
			displayParameters('IMPORTE');
			break;
		case "D":
			manageWhistRes('EJ');
			break;
		case "E":
			effaceUnJeuSelection();
			break;
		case "F":
			displayCompile();
			break;
		case "G":
			displayParameters('J');
			break;
		case "H":
			displayParameters('A');
			break;
		case "I":
			displayParameters('H');
			break;
		case "J":
			specialSet(1);
			break;
		case "K":
			specialSet(2);
			break;
		case "L":
			resetJeu();
			break;
		case "M":
			viewLocalStorage(1);
			break;
		case "N":
			startImport();
			break;
		case "O":
			displayParameters('X');	
			//let opts = "height=500,width=1100,top=100,left=100,resizable=yes";		
			//var myWindow = window.open("Avertissement.htm", "WHIST-CONSEILS", opts);
			break;
		case "Q":
			computeStats();
			break;
		case "P":
			multiGeneration();	
			break;
		case "R": 
			generateQRCode(window.location.href);	
			break;
		case "S":
			restoreLS();
			break;
		case "T":
			lectureDonneesCachees()	
			break;	
		case "U":
			gestionnaireData("J")	
			break;
		case "V":
			gestionnaireData("A")	
			break;
		case "W":
			changeFontSize('-+');	
			break;
		case "CNN":
			choosePartie("CNN");
			break;
		default:
			// RAF
		}
	}


function insertHelp()
	{
	let opts = "height=500,width=1100,top=100,left=100,resizable=yes";
	var oNewWin = window.open("AIDE.htm", "Auteur/Aide", opts);
	}

function generationSelectAnnoncesOptions(sOPT)
	{
	var sCar = reuseParameter("bSquare");
	console.log(sCar.repeat(25)+"FUNCTION generationSelectAnnoncesOptions"+sCar.repeat(25));

	var tabPts = "" 
	tabPts += "<"+"HTML"+">";
	tabPts += "<"+"HEAD"+">";
	tabPts += "<"+"link rel='stylesheet' href='Whist.css'"+">";
	tabPts += "<"+"/HEAD"+">";
	tabPts += "<"+"BODY"+">";
	tabPts += "<TABLE BORDER=1 CELLSPACING = 0 CELLPADDING=0 >";
	tabPts += "<TR><TD>ANNONCES</TD><TD>JEUX</TD><TD>POINTS</TD></TR>";
	
	//var nbrAnnonces = document.WHIST.ANNONCES.value;
	//const arrayA = memorisationDonnees("A");
	//console.log("START size: "+arrayA.length);
	//var nbrAnnonces = parent.frames["TITRE"].document.getElementById("ANNONCES").value;
	//var nbrAnnonces = parent.frames["TITRE"].document.WHIST.ANNONCES.value;
	//arrayA = nbrAnnonces.split('\n');

	const annoncesPfx = reuseParameter("annoncesPfx");
	const arrParam = Object.keys(localStorage).filter(k => k.startsWith(annoncesPfx)).sort().map(k => ({ key: k, value: localStorage.getItem(k) }));
	const arrayA = [];
	for (ii=0; ii<arrParam.length; ii++) { arrayA[ii] = arrParam[ii].value; }
	console.log(arrayA);

	var dictA = {};
	var sep1 = "!";
	var sep2 = String.fromCharCode(95)
	var sep2 = '\u00A0';
	var esp  = "_".repeat(25);
	var esp  = sep2.repeat(25);
	var spa1 = sep2.repeat(1);
	var spa2 = sep2.repeat(1);

	var CTL1 = "?";
	var opt2 = "";

	const select = document.getElementById("RESULTATSJEU");
	//select.options.length = 1;

	for (i = 0; i < arrayA.length - 1; i++) {
		var key  = arrayA[i].split('!')[0].trim();
		var key2 = arrayA[i].split('!')[0].trim().concat(esp).substring(0, 2);
		var jeu  = arrayA[i].split('!')[1].trim().concat(esp).substring(0, 15);
		var res  = arrayA[i].split('!')[2].trim().concat(esp).substring(0, 7);
		var pts  = arrayA[i].split('!')[3].trim().concat(esp).substring(0, 4);
		var CTL2 = arrayA[i].split('!')[4].trim().concat(esp).substring(0, 1);
		var msg1 = sep1+key+sep1+jeu+sep1+res+sep1+pts+sep1+CTL2;
		var msg2 = jeu+spa2+sep2+res+spa2+sep2+"Pts:"+pts;

		dictA[key] = jeu;

		tabPts += "<TR><TD>"+jeu+"<TD>"+res+"</TD><TD>"+pts+"</TD></TR>"

		switch (CTL2) 
			{
			case "1":
				var colr = " CLASS='couleur1'";
				var disa = "";
				break;
			case "2":	  
				var colr = " CLASS='couleur2'";
				var disa = "";
				break;
			default:
				var colr = " CLASS='couleur3'";
				//var disa = " disabled";
				var disa = "";
			}
		tabPts += "<TR "+colr+"><TD>"+jeu+"<TD>"+res+"</TD><TD>"+pts+"</TD></TR>"
		var xOpt = "<option "+disa+" value='" + msg1 + "' "+colr+">&nbsp;" + msg2 + spa1 +"</option>\n";
		opt2 += xOpt;
		console.log("CREATE OPTION "+i+":\t"+xOpt);

		if ( sOPT !== "HTML" ) {
			const option = document.createElement("option");
			option.value = msg1;
			option.textContent = " " + msg2 + spa1;
			select.appendChild(option);
			}

		msgTXT = "Les 'ANNONCES' ont été inscrites dans le listing des points.";
		const swOK = checkFormFieldAvailability("RESU", "RES", "RESULTS")
		if (swOK) { parent.frames["RESU"].document.getElementById("RESULTS").value = msgTXT; }

		}
	tabPts += "</TABLE>";
	tabPts += "<"+"/BODY"+">";
	tabPts += "<"+"/HTML"+">";
	console.log("Les "+arrayA.length+" options/select générées");

	return tabPts;

	}

function imprimePoints()
	{
	var opts = reuseParameter("defOpts");
	var tabPts = generationSelectAnnoncesOptions("HTML");
	var myWindow = window.open("", "WHIST", opts);
	myWindow.document.write(tabPts);
	//myWindow.close();
	}

function lectureSyncJSON(sType)
	{
	//console.clear();
	console.log('\u25A0'.repeat(25)+"FUNCTION lectureSyncJSON"+'\u25A0'.repeat(25));
	console.log("Parametre: ("+sType+")");
	var frameDoc = parent.frames["HDR"].document;
	var typeWeb  = frameDoc.getElementById("DUREE").value 

	var fic = "?"; var text = ""; var res = ""; var x = ""; var msgTXT = "";
	if ( sType === "J" ) { 
		var fic = "JOUEURS.csv.json";
		if ( typeWeb.toUpperCase === "EXPRESS" ) { var fic = "/JOUEURS" }; 
		}
	if ( sType === "A" ) { 
		var fic = "POINTS.csv.json";
		if ( typeWeb.toUpperCase === "EXPRESS" ) { var fic = "/ANNONCES" }; 
		}

	if ( fic   === "?" ) { return false; }


	msgTXT = "============== LECTURE FICHIER ["+sType+"] JSON FILE URL: "+fic;
	console.log(msgTXT);

	try	{
		fetch(fic)
			.then (response => {
				if (!response.ok) 
					{
					msgTXT = "HTTP error! Status: ${response.status}";
					console.log(msgTXT);
					loadDatafromLS(sType);
					throw new Error(msgTXT);
					}
				return response.json();
				})
			.then (data => traiterDonnees(data, sType))
		}	
	catch (error) {
    	console.error("Fetch failed:", error);
  		}
	return true;
	}

function loadDatafromLS(sType)
	{

	switch (sType)
		{
		case "A":
			var param = reuseParameter("annoncesPfx");
			console.log("Boucle lecture des 'ANNONCES' depuis le 'localStorage'");
			break;
		case "J":
			var param = reuseParameter("joueursPfx");
			console.log("Boucle lecture des 'JOUEURS' depuis le 'localStorage'");
			break;
		default:
			//RAF
			return;
		}

	const arrParam = Object.keys(localStorage).filter(k => k.startsWith(param)).sort().map(k => ({ key: k, value: localStorage.getItem(k) }));
	console.log(arrParam);

	const arrayData = []; var records = ""; var cpt = -1;
	for (ii=0; ii<arrParam.length; ii++) {
		var key = arrParam[ii].key;
		var val = arrParam[ii].value;
		records += val + "\n";
		switch (sType.toUpperCase())
			{
			case "J":
				cpt++;
				arrayData[cpt] = [];
				arrayData[cpt][0] = val.split("!")[0];
				arrayData[cpt][1] = val.split("!")[1];
				arrayData[cpt][2] = val.split("!")[2];
				break;
			case "A":
				cpt++;
				arrayData[cpt] = [];
				arrayData[cpt][0] = val.split("!")[0];
				arrayData[cpt][1] = val.split("!")[1];
				arrayData[cpt][2] = val.split("!")[2];
				arrayData[cpt][3] = val.split("!")[3];
				arrayData[cpt][4] = val.split("!")[4];
				break;
			default:
				//RAF
			}
		}
	console.log(arrayData);
	const frame = parent.frames["TITRE"].document;
	console.log("FRAME:"+frame);

	switch (sType.toUpperCase())
		{
		case "J":	
			frame.getElementById("NBRJOUEURS").value = cpt + 1;
			frame.getElementById("JOUEURS").value  = records;
			console.log(records);
			break;
		case "A":
			frame.getElementById("NBRANNONCES").value = cpt + 1;
			frame.getElementById("ANNONCES").value = records;
			console.log(records);
			break;
		default:
			//RAF
		}
	}


function traiterDonnees(data, sType) 
	{
  	console.log('Données reçues :', data);
	const arrayData = []; var records = ""; var cpt = -1;
	for (const item of data) {
		switch (sType) {
			case "A":
				cpt++;
				arrayData[cpt] = [];
				arrayData[cpt][0] = item.index;
				arrayData[cpt][1] = item.ANNONCE;
				arrayData[cpt][2] = item.REALISE;
				arrayData[cpt][3] = item.POINTS;
				arrayData[cpt][4] = item.TYPE;
				break;
			case "J":
				cpt++;
				arrayData[cpt] = [];
				arrayData[cpt][0] = item.index;
				arrayData[cpt][1] = item.nickname;
				arrayData[cpt][2] = item.fullname;
				break;
			default:
				alert("Problème de logique au niveau des fichiers JSON - TYPE "+sType+" INCONNU");
			}
		}	
	console.log("°".repeat(100));
	console.log("LOOP creation array ("+sType+") contient "+cpt+" rows");
	console.log("et sauvetage dans les zones LOCALSTORAGE");
	let joueursPfx  = reuseParameter("joueursPfx");
	let annoncesPfx = reuseParameter("annoncesPfx");
	if ( cpt > -1 ) {
		for (let i=0; i<= cpt; i++) {
			var ligneData = "";
			for (let k=0; k<arrayData[i].length; k++) {
				ligneData += arrayData[i][k] + "!"
				}
			if ( sType === "J" ){
				var clefLS = joueursPfx + i.toString().padStart(2, "0");
				ligneData = ligneData.slice(0, -1); 
				localStorage.setItem(clefLS, ligneData); 
				}
			if ( sType === "A" ){
				var clefLS = annoncesPfx + i.toString().padStart(2, "0");
				ligneData = ligneData.slice(0, -1); 
				localStorage.setItem(clefLS, ligneData); 
				}		
			records  += ligneData + "\n";;
			}
		}
	if ( records != "" ) 
		{ 
		console.log("°".repeat(100));
		console.log("Stockage "+(cpt+1)+" données ("+sType+") dans zone INPUT/TEXTAREA");
		if ( sType === "J" ) { 
			parent.frames["TITRE"].document.WHIST.NBRJOUEURS.value  = cpt + 1;
			parent.frames["TITRE"].document.WHIST.JOUEURS.value  = records; 
			}
		if ( sType === "A" ) { 
			parent.frames["TITRE"].document.WHIST.NBRANNONCES.value  = cpt + 1;
			parent.frames["TITRE"].document.WHIST.ANNONCES.value = records; 
			}
		}
	console.log("DATA: OK");
	return true;
	}
 
async function lectureAsyncJSON(sType)
	{
	console.log('\u25A0'.repeat(25)+"FUNCTION lectureAsyncJSON"+'\u25A0'.repeat(25));
	console.log("Parametre: ("+sType+")");

	var baseUrl = window.location.href.toString();
	baseUrl = baseUrl.substring(0, baseUrl.lastIndexOf("/"));

	var fic = "?"; var data = ""; var result = "";
	if ( sType === "J" ) { var fic = baseUrl+"/JOUEURS.csv.json"; }
	if ( sType === "A" ) { var fic = baseUrl+"/POINTS.csv.json" }
	if ( fic   === "?" ) { return false; }

	console.log("["+sType+"] JSON FILE URL: "+fic);

	try {
		msgTXT = "DEBUT LECTURE des données JSON..."; console.log(msgTXT);
		const response = await fetch(fic);
		loopSeconds(5);
		msgTXT = "HTTP STATUS LECTURE des données JSON: "+response.status; console.log(msgTXT); 
		if ( res.ok ) {
			const clone = response.clone();
			const text  = await clone.text();
			const data  = JSON.parse(text);
			var   line  = "";
			const array = text.map(obj => {
				line += ((Object.values(obj).map(String)).toString()+"\n").replaceAll(",","!");
				});

			if ( sType === "J" ) { parent.frames["TITRE"].document.WHIST.JOUEURS.value  = line; }
			if ( sType === "A" ) { parent.frames["TITRE"].document.WHIST.ANNONCES.value = line; }		
			msgTXT = "FIN LECTURE des données JSON..."; console.log(msgTXT);
			console.log(data);
			return data;
			}
		else {
			console.log( `HTTP ${response.status}` );
			return false;
			}
		}
	catch (error) {
		console.error("NETWORK ERROR:", error);
		return false;
		}
	}

function memorisationDonnees(sType)
	{
	lectureSyncJSON(sType);
	}

function startOptionsSelect(sOPT)
	{
	var nbrOpts = document.getElementById("RESULTATSJEU").length
	console.log("("+sOPT+")-SELECT SIZE: "+nbrOpts);
	if ( sOPT === "?" ) { 
		var strOptions = generationSelectAnnoncesOptions(sOPT);
		return strOptions;
		}
	return
	}

function reuseParameter(paramName) {
	//console.log('\u25A0'.repeat(25)+"FUNCTION REUSEPARAMETER"+'\u25A0'.repeat(25));
	console.log("Recherche du parametre '"+paramName+"'...");

	var paramValue = "?";
	var paramAppli = "0-WHISTAPP.";

	const input = parent.frames?.["TITRE"]?.document?.getElementById(paramName);
	console.log("Depuis FRAMESET? '"+input+"'")
	if ( input?.value?.trim() ) {
  		paramValue = input.value;
		console.log("OK:", input.value);
		}
	else {
		const arrParam = Object.keys(localStorage).filter(k => k.startsWith(paramAppli)).sort().map(k => ({ key: k, value: localStorage.getItem(k) }));
		console.log(arrParam);
		for (ii=0; ii<arrParam.length; ii++) {
			console.log(arrParam[ii])
			var key = arrParam[ii].key;
			var val = arrParam[ii].value.toString().split("=");
            if ( val[0] === paramName ) { paramValue = val[1]; break; }
			}
		}
	console.log("Renvoie en retour '"+paramValue+"'...");
	return paramValue;
	}

function generateQRCode(sURL) 
	{
	fetch("/myIP")
    	.then(response => response.text())
    	.then(result => { continueQRCode(result, sURL); });
	}

function continueQRCode(dataIP, sURL)
	{
	var newURL = sURL.toString();
	var xpos = newURL.lastIndexOf("/");
	newURL = newURL.substring(0,xpos) + "/index.html";
	newURL = newURL.toLowerCase().replace("localhost",dataIP);
	console.log("Generate QRcode for '"+newURL+"'");
    parent.frames["RESU"].document.getElementById("RESULTATS").innerHTML = "";
    new QRCode(parent.frames["RESU"].document.getElementById("RESULTATS"), {
        text: newURL,
        width: 300,
        height: 300,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    	});
	}

function changeItemColors(strCol) 
	{
	//alert("Changement de couleurs en "+strCol);
	console.log("Changement de couleurs en "+strCol);
    const frames = ["TITRE", "HDR", "RESU", "NAV"];
    const forms  = ["WHIST", "HEADER", "RES", "LISTE"];
    for(let i=0; i<frames.length; i++) {
        if (document.getElementById("BGCOL").checked) {  
            var frame = top.frames[i].document;
            console.log("Frame #"+i+" ['"+frames[i]+"'] ("+frame.title+")");
            frame.body.style.backgroundColor = strCol;
            var form  = frame.getElementById(forms[i]);
            form.style.backgroundColor = strCol;
            //var table = frame.getElementById("WHISTB");
            //table.style.backgroundColor = strCol;
            var cells = frame.querySelectorAll("td");
            cells.forEach(cell => { cell.style.backgroundColor = strCol; });
			var cells = frame.querySelectorAll("th");
            cells.forEach(cell => { cell.style.backgroundColor = strCol; });
            console.log("BG - Terminé");
            if ( i === 0 )
                {
                const fs = ["fs1", "fs2"];
                for (let j=0; j<fs.length; j++) {
                    var fieldset = top.frames[i].document.getElementById(fs[j]);
                    fieldset.style.backgroundColor = strCol;
                    }
                console.log("FS - Terminé");
                } 
            if ( i === 2 )
                {
                var res = top.frames[i].document.getElementById("RESULTATS");
                res.style.backgroundColor = strCol;  
                console.log("RES - Terminé");
                }         
            }
        if (document.getElementById("BGBUT").checked) {
            const doc  = top.frames[i].document;
            const buts = doc.querySelectorAll('button, input[type="button"]');
            buts.forEach((but, index) => {
                console.log(`but ${index}:`, but);
                but.style.backgroundColor = strCol;
                but.style.color = "black";                  
                });
            console.log("BT - Terminé");
            }
        if (document.getElementById("BGTXT").checked) {
            const doc = top.frames[i].document;
            doc.querySelectorAll("*").forEach(el => {
                el.style.color = strCol;
                });
            console.log("TX - Terminé");
            }
        }
	}

function manageColors()
	{
	var swAVAIL  = checkFormFieldAvailability("RESU","RES","RESULTATS");
	if ( swAVAIL ) {
		fetch("./configColors.html")	
	  		.then(response => response.text())
	  		.then(html => { parent.frames["RESU"].document.getElementById("RESULTATS").innerHTML = html; }); 
		}
	else {
		const sOpts = "width=850px, height=450px, top=500, left=300, resizable"
		window.open("./configColors.html", "COULEURS", sOpts);
		}
	}

function restoreLS()
	{
	parent.frames['RESU'].location.href = "./restoreLS.htm"
	}

function generateFileName(sExt)
	{
	const now = new Date();
	const pad = n => String(n).padStart(2, "0");

	const fName =
		`${now.getFullYear()}` +
		`${pad(now.getMonth() + 1)}` +
		`${pad(now.getDate())}_` +
		`${pad(now.getHours())}` +
		`${pad(now.getMinutes())}` +
		`${pad(now.getSeconds())}.${sExt}`;
		
	return fName;
	}
	
function effaceUnePartie(xPartie)
	{
	console.log('\u25A0'.repeat(25)+"FUNCTION EFFACEUNEPARTIE("+xPartie+")"+'\u25A0'.repeat(25));

	if (typeof xPartie === "string" && xPartie.trim() !== "")
		{
		console.log("Effacement de la partie ["+xPartie+"]...");
		const arrP = Object.keys(localStorage).filter(k => k.startsWith(xPartie)).sort().map(k => ({ key: k, value: localStorage.getItem(k) }));
		console.log(arrP);
		const arrK = []; 
		var listJeux = "<PRE>";
		for (i = 0; i < arrP.length; i++) {	
			var clef  = arrP[i].key
			listJeux += i.toString().padStart(2, "0") + "\t" + clef + "\t EFFACéS!\n";
			localStorage.removeItem(clef);
			}
		listJeux += "</PRE>"
		i--;
		var msgTXT = "Les "+i.toString()+" jeux de la partie '"+xPartie+"' ont été effacés!";
		parent.frames["RESU"].document.getElementById("RESULTS").value = msgTXT;
		parent.frames["RESU"].document.getElementById("RESULTATS").innerHTML = listJeux;
		}
	else {
		var html = "";
		html += "<HTML>\n<HEAD>";
		html += "<link id='mainCss' rel='stylesheet' href='Whist.css'>";
		html += "\n</HEAD>\n<BODY><BR><BR>";
		html += "\n<TABLE CLASS='mytr' BORDER=1 WIDTH=50%>\n";
		html += "\n<TR><THEAD>";
		html += "\n<TH>Nbr</TH>";
		html += "\n<TH>Partie</TH>";
		html += "\n<TH>#jeux</TH>";
		html += "\n<TH>Kb</TH>";
		html += "\n<TH>Action</TH>";
		html += "\n</THEAD></TR>"
		
		var ckNamePfx = reuseParameter("ckNamePfx");
		console.log("PREFIX:"+ckNamePfx);
		const arrP = Object.keys(localStorage).filter(k => k.startsWith(ckNamePfx) && k.endsWith(".00")).sort().map(k => ({ key: k, value: localStorage.getItem(k) }));
		console.log(arrP);
		var totSize = 0;
		for (i = 0; i < arrP.length; i++) {	
			var clef  = arrP[i].key.slice(0, -3);
			const result = getLocalStorageStats(clef);
			const itemNo = (i+1).toString().padStart(2, "0")
			var btnID = "btnEfface"+itemNo;
			html += "\n<TR ALIGN=CENTER>";
			html += "\n<TD>"+itemNo+"</TD>";
			html += "\n<TD>"+clef+"</TD>";
			html += "\n<TD>"+(result.count - 1)+"</TD>";
			html += "\n<TD>"+result.totalKB+"</TD>";
			html += "\n<TD><input type='button' id='"+btnID+"' value='EFFACE' onclick='JavaScript:effaceUnePartie("+'"'+clef+'"'+")'></LI></TD>"
			html += "\n</TR>";
			totSize += parseInt(result.totalKB);
			}
		html += "\n</TABLE>";
		html += "\n<CENTER><H3>EFFACEMENT DE PARTIES ("+totSize+"Kb. Limite: 5Mb)</H3></CENTER>";
		html += "</BODY></HTML>"

		var swKEEP = parent.frames["HDR"].document.getElementById("copie").checked;
		if ( swKEEP ) {
			const ficName = generateFileName("html");
			const blob = new Blob([html], { type: "text/html;charset=utf-8" });
			const link = document.createElement("a");
			link.href = URL.createObjectURL(blob);
			link.download = (ficName).replaceAll("_","");
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
			URL.revokeObjectURL(link.href);
			}
		var msgTXT = "Sélectionnez une partie à effacer!";
		parent.frames["RESU"].document.getElementById("RESULTS").value = msgTXT;
		parent.frames["RESU"].document.getElementById("RESULTATS").innerHTML = html;
		}
	}

function getLocalStorageStats(prefix) 
	{
	console.log("STATS ON "+prefix);
	const encoder = new TextEncoder();
	const items = [];
	let totalBytes = 0;
	for (let i = 0; i < localStorage.length; i++) 
		{
		const key = localStorage.key(i);
		if (key.startsWith(prefix)) 
			{
			const value = localStorage.getItem(key) ?? "";
			items.push({ key,value,});
			totalBytes += encoder.encode(key).length;
			totalBytes += encoder.encode(value).length;
			}
		}
	console.log(prefix+"\t"+items.length+"\t"+(totalBytes / 1024).toFixed(2));

	return {
		count: items.length,
		totalKB: (totalBytes / 1024).toFixed(2),
		};
	}

async function getLastModified(scriptUrl) 
	{
	console.log("'NAVIG.htm' demande la date de la dernière modification du fichier '"+scriptUrl+"'");
  	const response = await fetch(scriptUrl, { method: "HEAD" });
  	const lastModified = response.headers.get("Last-Modified");

  	if (lastModified) {
		var vs = new Date(lastModified).toLocaleString();
		vs = toYYSSS(vs);
  		} 
	else {
    	var vs = "inconnu";
  		}
	parent.frames["NAV"].document.LISTE.version.value = "Version: "+vs;
	return vs;
	}

	
function toYYSSS(dateString) 
	{
	dateString = dateString.toUpperCase().replace(" AM", ",AM");
	dateString = dateString.toUpperCase().replace(" PM", ",PM");
	const laDate = dateString.split(",")[0];
	const lheure = dateString.split(",")[1];

  	const [month, day, year] = laDate.split("/").map(Number);
	const [hours, minutes, seconds] = lheure.split(":").map(Number);

  	const totSss = hours * 3600 + minutes * 60 + seconds;
	const date = new Date(year, month - 1, day);
  	const start = new Date(year, 0, 1);
  	const dayOfYear = Math.floor((date - start) / 86400000) + 1;

	const yy = String(year).slice(-2);
  	const sss = String(dayOfYear).padStart(3, "0");
	const YYSSS = yy + sss;
	const versNO = YYSSS + "W" + String(totSss);

	return versNO;
	}

function checkIfNodeJS()
	{
	var hdr1 = "?";
	var hdr2 = "!";
	var frameDoc = parent.frames["HDR"].document;

	fetch("/")
		.then(res => {
			for (const [name, value] of res.headers.entries()) {
      			console.log("=========================> "+name + ": " + value);
				if ( name.toLowerCase() === "server" ) {
					// Sample: SimpleHTTP/0.6 Python/3.9.6
					frameDoc.getElementById("DUREE").value = value
					}
  				}
			//frameDoc.getElementById("DUREE").value = res.headers.get("x-powered-by");
			//frameDoc.getElementById("DUREE").value += res.headers.get("server");
			});
  	}

function lectureDonneesCachees()
	{
	var docFrame1 = parent.frames["TITRE"].document;
	const nbrJoueurs  = docFrame1.getElementById("NBRJOUEURS").value;
	const nbrAnnonces = docFrame1.getElementById("NBRANNONCES").value;
	const tableJoueurs  = docFrame1.getElementById("JOUEURS").value;
	const tableAnnonces = docFrame1.getElementById("ANNONCES").value;

	var docFrame2 = parent.frames["RESU"].document;
	var headerIN  = docFrame2.getElementById("headerIN").value;
	headerIN = headerIN
    	.replace(/&/g, "&amp;")
    	.replace(/</g, "&lt;")
    	.replace(/>/g, "&gt;")
    	.replace(/"/g, "&quot;")
    	.replace(/'/g, "&#39;");

	var headerOUT = docFrame2.getElementById("headerOUT").value;
	headerOUT = headerOUT
    	.replace(/&/g, "&amp;")
    	.replace(/</g, "&lt;")
    	.replace(/>/g, "&gt;")
    	.replace(/"/g, "&quot;")
    	.replace(/'/g, "&#39;");

	var headerDELIN = docFrame2.getElementById("headerDELIN").value;
	headerDELIN = headerDELIN
    	.replace(/&/g, "&amp;")
    	.replace(/</g, "&lt;")
    	.replace(/>/g, "&gt;")
    	.replace(/"/g, "&quot;")
    	.replace(/'/g, "&#39;");

	var headerDELOUT = docFrame2.getElementById("headerDELOUT").value;
	headerDELOUT = headerDELOUT
    	.replace(/&/g, "&amp;")
    	.replace(/</g, "&lt;")
    	.replace(/>/g, "&gt;")
    	.replace(/"/g, "&quot;")
    	.replace(/'/g, "&#39;");

	html = ""
	html += "<HTML><BODY>\n";
	html += "<PRE>\n";
	html += "<HR>Nbre joueurs: "+nbrJoueurs+"\n";
	html += "<HR>Nbre annonces: "+nbrAnnonces+"\n";
	html += "<HR>Joueurs:<BR><HR>"+tableJoueurs+"\n";
	html += "<HR>Annonces:<BR><HR>"+tableAnnonces+"\n";
	html += "<HR>HEADER-IN:<BR><HR>"+headerIN+"\n";
	html += "<HR>HEADER-OUT:<BR><HR>"+headerOUT+"\n";
	html += "<HR>HEADER-DEL-IN:<BR><HR>"+headerDELIN+"\n";
	html += "<HR>HEADER-DEL-OUT:<BR><HR>"+headerDELOUT+"\n";
	html += "\n</OL>\n</BODY></HTML>";

	var opts = reuseParameter("defOpts");
	const winCache = window.open("","",opts);
	winCache.document.write(html);

	}

function stringToArray(data, sType)
	{
	switch (sType)
		{
		case "1D":
			const array1D = data
  				.trim()
  				.split(/\r?\n/);      	
			return array1D;
			break;
		case "2D":
			const array2D = data
  				.trim()
  				.split(/\r?\n/)      	
  				.map(line => line.split("!"));
			return array2D;
			break;
		default:
			return data;
		}
	}

function arrayToHTML(data, sType) 
	{
	console.log("TYPE:"+sType);
	console.log(data);

	switch (sType)
		{
		case "2D":
			const html2D = `
    			<table border="1">
      				${data.map(row => `
        			<tr>
          				${row.map(cell => `<td>${cell}</td>`).join("")}
        			</tr>
      				`).join("")}
    			</table>
  				`;     	
			return html2D;
			break;
		case "1D":
			const html1D = `
    			<table border="1">
      				${data.map(row => `
        			<tr><td>${row}</td></tr>
      				`).join("")}
    			</table>
  				`;  
			//(html1D);   	
			return html1D;
			break;
		default:
			return data;
		}
	}

async function gestionnaireData(sType) 
	{
	var frameDoc = parent.frames["HDR"].document;
	var typeWeb  = frameDoc.getElementById("DUREE").value 

	switch (sType)
		{
		case "J":	
			var fic = "JOUEURS.csv.json";
			if ( typeWeb.toUpperCase === "EXPRESS" ) { var fic = "/JOUEURS" }; 
			break;
		case "A":
			var fic = "POINTS.csv.json";
			if ( typeWeb.toUpperCase === "EXPRESS" ) { var fic = "/ANNONCES" }; 
			break;
		default:
			var msgTXT = "Choix invalide. A voir avec le concepteur";
			parent.frames["RESU"].document.getElementById("RES").value = msgTXT;
			return false;
		}

  	const response = await fetch(fic);
  	const data = await response.json();
  	const headers = Object.keys(data[0]);

	var textAREA = [
    	headers.join("!"),
    	...data.map(row =>
      		headers.map(h => `"${String(row[h]).replace(/"/g, '""')}"`).join("!")
    		)
  		].join("\n");

	textAREA = textAREA.replaceAll('"','');
	var arrayTXT  = textAREA.split("\n");	
	var textAREA1 = "<p align=left>"+arrayTXT.join("<BR>")+"</P>";
	arrayTXT.shift();
	var textAREA2 = arrayTXT.join("\n");

	console.log(arrayTXT);
	console.log("===================== textAREA1")
	console.log(textAREA1);
	console.log("===================== textAREA2")
	console.log(textAREA2);

	parent.frames["RESU"].document.getElementById("RESULTATS").innerHTML = textAREA1;
	if ( sType === "J" ) {
		parent.frames["TITRE"].document.WHIST.JOUEURS.value = textAREA2;
		}
	if ( sType === "A" ) {
		parent.frames["TITRE"].document.WHIST.ANNONCES.value = textAREA2;
		}


  	return

	}

function manageRowDeletion(cellIx, cellData, rowIx, rowData)
	{
	console.log('\u25A0'.repeat(25)+"manageRowDeletion"+'\u25A0'.repeat(25));

	const xPartie = parent.frames["HDR"].document.getElementById("COOKIE").value;
	var targetRow = "Partie: "+xPartie+"\t"+rowIx+") ";
	for (const cell of rowData.cells) {
		targetRow += "["+cell.textContent.trim()+"]";
        }
	msgTEXT = "";
	msgTEXT += "Voulez-vous effacer ce jeu?  <O>ui/<n>on?\n";
	msgTEXT += "Ligne cible: "+targetRow;
	do 	{
		var rep = prompt(msgTXT,"n");
		}
	while ( !(rep ==="O" || rep === "n" ) );

	if ( rep === "O" )
		{
		}
	}