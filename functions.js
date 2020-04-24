import * as fs from 'fs';
import {join} from 'path';
import {tmpdir} from 'os';

const root = join(tmpdir(), 'appdrive'); // voir node js doc pour bien comprendre

// Etape 7.1 : Retourne une liste contenant les dossiers et fichiers à la racine du “drive”
function readAlpsDir() {
    const options = {withFileTypes: true};
    const readdirPromise = fs.promises.readdir(root, options);
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
    const files = await fs.promises.readdir(join(root, name), options);
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
    fs.mkdir(join(root, dir), {recursive: true}, (err) => {
        if (err) throw err;
    });

}

// Etape 7.4 : Créer un dossier avec le nom {name} dans {folder}

async function createDirFolder(folder, paramsValue) {
    // if (!fs.exists(dir))
    fs.mkdir(join(root, folder, paramsValue), {recursive: true}, (err) => {
        if (err) throw err;
    });
}

// Etape 7.5 et 7.6 : Suppression d’un dossier ou d’un fichier avec le nom {name} et Suppression d’un dossier ou d’un fichier avec le nom {name} dans {folder}

function remove(folder, name) {
    const rm = fs.promises.stat(join(root, folder, name)) //stat, récupérer les données d'un répertoire ou d'un fichier (poids ...)
        .then((result) => {
            if (result.isDirectory()) { // fs, isDirectory permet de savoir si le dossier/fichier récupérer est un répertoire
                return fs.promises.rmdir(join(root, folder, name), {recursive: true}); // si c'est un répertoire, alors je supprime le répertoire en question
            } else {
                return fs.promises.unlink(join(root, folder, name)) // si c'est un fichier, je supprime le fichier en question
            }
        })
    return rm;
}


// Etape 7.7 : Créer un fichier à la racine du “drive”

async function uploadFile(folder, oldPath, newPath) {
    fs.rename(oldPath, join(root, folder, newPath), (err) => {
       if(err) throw err;
    })
}
// Etape 7.8 : Créer un fichier dans {folder}

export {readAlpsDir, openDir, createDir, createDirFolder, remove, uploadFile}; // exporter tous les modules à la fin
