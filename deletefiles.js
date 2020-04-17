// Etape 7.5
const fs = require('fs');

function remove() {
    fs.promises.stat('/tmp/appdrive/' + req.params.name)
        .then((result) => {
            if (result.isDirectory()) {
                return fs.promises.rmdir('/tmp/appdrive/' + req.params.name)
            } else {
                return fs.promises.unlink('/tmp/appdrive/' + req.params.name)
            }
        })
}

module.exports = {remove};