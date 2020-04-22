const fs = require('fs');

// Etape 7.1 : Retourne une liste contenant les dossiers et fichiers à la racine du “drive”
function readAlpsDir() {
    const options = {withFileTypes: true};
    const readdirPromise = fs.promises.readdir('/tmp/appdrive', options);
    const readAlpsDir = readdirPromise
        .then(files => {
            // files : ['file1', 'file2']
            const transformed = files.map(file => ({name: file.name, isFolder: file.isDirectory()}));
            // transformed: [{name: 'file1', isFolder: true}, {name: 'file2', isFolder: true}]
            return transformed;
        });
    return readAlpsDir;
}


// Etape 7.2 : Retourne le contenu de {name}

async function openDir(name) {
    const options = {withFileTypes: true};
    const files = await fs.promises.readdir('/tmp/appdrive/' + name, options);
    return files.map(file => (
            {
                name: file.name,
                isFolder: file.isDirectory(),
                size: file.size
            }
        )
    );
}


// Etape 7.3 : Créer un dossier avec le nom {name}

async function createDir(dir) {
    // if (!fs.exists(dir))
  fs.mkdir('/tmp/appdrive/' + dir, { recursive: true}, (err) => {
      if(err) throw err;
  });

}

// Etape 7.4 : Créer un dossier avec le nom {name} dans {folder}
// Etape 7.5 : Suppression d’un dossier ou d’un fichier avec le nom {name}

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

module.exports = {readAlpsDir, openDir, createDir, remove}; // exporter tous les modules à la fin

// Etape 7.6 : Suppression d’un dossier ou d’un fichier avec le nom {name} dans {folder}
// Etape 7.7 : Créer un fichier à la racine du “drive”
// Etape 7.8 : Créer un fichier dans {folder}