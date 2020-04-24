import express from 'express';// charger expressjs
import * as promise from './functions.js';
import busboy from 'express-busboy';

const reg = /^[\d\w\s]+$/;
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
        res.status(404).send('404 error');
    }
})

//Etape 7.3

app.post('/api/drive', async (req, res) => {
        if (reg.test(req.query.name)) {
            try {
                const paramsValue = req.query.name;
                const files = await promise.createDir(paramsValue);
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
            const files = await promise.createDirFolder(folder, paramsValue);
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
app.put('/api/drive/', async (req, res) => {
    console.log(req.files);
    console.log(req.files.file.filename)
    try {
        const files = await promise.uploadFile('', req.files.file.file, req.files.file.filename)
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