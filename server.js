const express = require('express');

const promise = require('./getdrivefiles');

const app = express();
app.use('/', express.static('./frontend/JS_alps-drive-project-frontend')); // faire en sorte que notre arrivée sur localhost:3000/ renvoie sur les fichiers statics du dossier frontend

app.get('/', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.send('WELCOME ON BOARD !');
});

//Etape 7.1

app.get('/api/drive', (req, res) => {
    promise.readAlpsDir()
        .then(files => res.send(files))
        .catch(error => res.send('Pas bon'));
})

// Etape 7.2



// ... Tout le code de gestion des routes (app.get) se trouve au-dessus

app.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send('Page introuvable !');
});


// Bonne pratique, fonction start

function start () {
    app.listen(3000, function () {
        console.log('Example app listening on port 3000')
    })
}
// forme différente de openclassroom
module.exports = {start};