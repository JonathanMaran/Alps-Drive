import * as server from './server.js';
import * as fs from 'fs';
import * as os from 'os';


fs.mkdir(os.tmpdir() + '/appdrive', { recursive: true }, (err) => {
    if (err) throw err;
    server.start();
});


