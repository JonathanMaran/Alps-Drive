// Etape 7.2
const fs = require('fs');

async function openDir(name) {
    const options = {withFileTypes: true};
    const files = await fs.promises.readdir('/tmp/appdrive/' + name, options);
    return files.map(file => ({name: file.name, isFolder: file.isDirectory(), size: file.size}));

}

module.exports = {openDir};