// Etape 7.1
const fs = require('fs');


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


module.exports = {readAlpsDir};