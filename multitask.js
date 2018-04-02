process.env.UV_THREADPOOL_SIZE = 1;

const https = require('https');
const fs = require('fs');
const crypto = require('crypto');

/** @type Number */
const start = Date.now()

// Https ou HTTP não é processado pelo Threadpool, ele vai direto para o SO processar.
function doRequest() {
    https
        .request("https://www.google.com", res => {
            res.on('data', () => {});
            res.on('end', () => {
                console.log('HTTP:', Date.now() - start);
            });
        })
        .end();
}

// pacote crypto algumas funcoes usam o Threadpool como é o caso do pbkdf2
function doHash() {
    crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
        console.log('hash:', Date.now() - start);
    });
}

// o modulo fs todas as funcoes usam o Threadpool do libUV
function doDisk() {
    fs.readFile('multitask.js', 'utf8', () => {
        console.log('fs:', Date.now() - start);
    });
}

doRequest();

doDisk();

doHash();
doHash();
doHash();
doHash();
