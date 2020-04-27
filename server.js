import express from 'express';// charger expressjs
import * as promise from './functions.js'; // charger ma page function.js
import busboy from 'express-busboy'; // charger busboy depuis express-busboy

const reg = /^[\d\w\s]+$/; // permet de filtrer les caractères autorisés
const app = express();
app.use('/', express.static('./frontend/JS_alps-drive-project-frontend')); // faire en sorte que notre arrivée sur localhost:3000/ renvoie sur les fichiers statics du dossier frontend

//Etape 7.1

app.get('/api/drive', (req, res) => {
    promise.readAlpsDir() // on utilise la fonction readAlpsDir() de la page function
        .then(files => res.send(files)) // retour si résolu
        .catch(error => res.send('Pas bon')); // retour si rejeté
})

// Etape 7.2
app.get('/api/drive/:name', async (req, res) => { //fonction async, qui attend la résolution de la promesse
    try {
        const files = await promise.openDir(req.params.name); //req.params requête pour obtenir la route de name
        res.send(files)
    } catch {
        res.status(404).send('404 error'); // si erreur, retour status 404 et message "404 erro"
    }
})

//Etape 7.3

app.post('/api/drive', async (req, res) => {
        if (reg.test(req.query.name)) { // on utilise le filtre à caractères créé plus haut, et si c'est le cas, on rentre dans la fonction async
            try {
                const paramsValue = req.query.name; //req.query permet de récupérer le contenu d'un paramètre name
                const files = await promise.createDir(paramsValue); // on passe en argument de la fonction le req.query
                res.send(files)
            } catch {
                res.status(404).send('404 error')
            }
        } else {
            res.status(400).send('Caractères non-alphanumériques non autorisés');
        }
    }
);

//Etape 7.4

app.post('/api/drive/:folder', async (req, res) => {
    if (reg.test(req.query.name)) {
        try {
            const folder = req.params.folder;
            const paramsValue = req.query.name;
            const files = await promise.createDirFolder(folder, paramsValue); // 2 arguements à la fonction, le req.params puis le req.query
            res.send(files)
        } catch {
            res.status(404).send('404 error');
        }
    } else {
        res.status(400).send('Caractères non-alphanumériques non autorisés');
    }
});

// Etape 7.5
app.delete('/api/drive/:name', (req, res) => {
    promise.remove('', req.params.name) // on passe en paramètre de la fonction le paramètre que l'on souhaite récupèrer de l'url
        .then(() => res.send())
        .catch((err) => res.status(404).send(err));
})

//Etape 7.6

app.delete('/api/drive/:folder/:name', (req, res) => {
    promise.remove(req.params.folder, req.params.name) // on passe en paramètre de la fonction le paramètre que l'on souhaite récupèrer de l'url
        .then(() => res.send())
        .catch((err) => res.status(404).send(err));
})

//Etape 7.7

busboy.extend(app, {
    upload: true,
    path: '/tmp/'
})
app.put('/api/drive/', async (req, res) => { // on va uploader un fichier
    console.log(req.files); // on fait une requête de notre fichier et obtenir plus d'informations sur notre objet
    console.log(req.files.file.filename) // on cherche à obtenir le filename de notre upload
    try {
        const files = await promise.uploadFile('', req.files.file.file, req.files.file.filename) // on passe 3 arguments à notre fonction
        res.send(files)
    } catch {
        res.status(404).send('error');
    }
})

//Etape 7.8

app.put('/api/drive/:folder', async (req, res) => {
    console.log(req.files);
    console.log(req.files.file.filename)
    try {
        const files = await promise.uploadFile(req.params.folder, req.files.file.file, req.files.file.filename)
        res.send(files)
    } catch {
        res.status(404).send('error');
    }
})


// ... Tout le code de gestion des routes (app.get) se trouve au-dessus

app.use(function (req, res, next) {
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send('Page introuvable !');
});

// Bonne pratique, fonction start

function start() {
    app.listen(3000, function () {
        console.log('Example app listening on port 3000')
    })
}

// forme différente de openclassroom
// module.exports = {start};
export {start};