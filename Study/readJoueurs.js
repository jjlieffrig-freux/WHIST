// -----------------------------------------------------------------------------
// JS pour convertir le fichier JSON des Joueurs en une table à 2 dimensions
// -----------------------------------------------------------------------------

import path from "path";
import fs from "fs/promises";
import parseFrontMatter from "front-matter";

const postsPath = path.join(__dirname, "./", "Joueurs.json");

fs.readFile(postsPath, 'utf-8', function (err, data) {
    if (err) throw err;

    var userArray = [];
    var arr = JSON.parse(data);
    for (var i = 0; i < arr.length; i++) {
        userArray[i] = [];
        userArray[i][0]=arr[i].ID
        userArray[i][1]=arr[i].CODE
        userArray[i][2]=arr[i].NOM
        userArray[i][3]=arr[i].PRENOM
        }
    console.log(userArray);
});

 