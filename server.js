import express from 'express';// charger expressjs
import * as promise from './functions.js';

const app = express();
app.use('/', express.static('./frontend/JS_alps-drive-project-frontend')); // faire en sorte que notre arrivée sur localhost:3000/ renvoie sur les fichiers statics du dossier frontend

//Etape 7.1

app.get('/api/drive', (req, res) => {
    promise.readAlpsDir()
        .then(files => res.send(files))
        .catch(error => res.send('Pas bon'));
})

// Etape 7.2
app.get('/api/drive/:name', async (req, res) => {
    try {
        const files = await promise.openDir(req.params.name);
        res.send(files)
    } catch {
        res.status(404).send('error');
    }
})

//Etape 7.3

app.post('/api/drive', async (req, res) => {
    try {
        const paramsValue = req.query.name;
        const files = await promise.createDir(paramsValue);
        res.send(files)
    } catch {
        res.status(404).send('error');
    }
});

//Etape 7.4

app.post('/api/drive/:folder', async (req, res) => {
    try {
        const folder = req.params.folder;
        const paramsValue = req.query.name;
        const files = await promise.createDirFolder(folder, paramsValue);
        res.send(files)
    } catch {
        res.status(404).send('errttttor');
    }
});

// Etape 7.5
app.delete('/api/drive/:name', (req, res) => {
    promise.remove(req.params.name) // on passe en paramètre de la fonction le paramètre que l'on souhaite récupèrer de l'url
        .then(() => res.send())
        .catch((err) => res.status(404).send(err));
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