const express = require('express'); // charger expressjs
const fs = require('fs');
const promise = require('./getdrivefiles');
const del = require('./deletefiles')

const app = express();
app.use('/', express.static('./frontend/JS_alps-drive-project-frontend')); // faire en sorte que notre arrivée sur localhost:3000/ renvoie sur les fichiers statics du dossier frontend

//Etape 7.1

app.get('/api/drive', (req, res) => {
    promise.readAlpsDir()
        .then(files => res.send(files))
        .catch(error => res.send('Pas bon'));
})

// Etape 7.5
app.delete('/api/drive/:name', (req, res) => {
    // let query = {_name: req.params.name};
    del.remove()
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
module.exports = {start};