// Etape 7.5
const fs = require('fs');

function remove(name) {
    const rm = fs.promises.stat('/tmp/appdrive/' + name) //stat, récupérer les données d'un répertoire ou d'un fichier (poids ...)
        .then((result) => {
            if (result.isDirectory()) { // fs, isDirectory permet de savoir si le dossier/fichier récupérer est un répertoire
                return fs.promises.rmdir('/tmp/appdrive/' + name, {recursive: true}) // si c'est un répertoire, alors je supprime le répertoire en question
            } else {
                return fs.promises.unlink('/tmp/appdrive/' + name) // si c'est un fichier, je supprime le fichier en question
            }
        })
    return rm;
}

module.exports = {remove};