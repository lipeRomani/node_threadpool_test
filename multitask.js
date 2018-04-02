process.env.UV_THREADPOOL_SIZE = 1;

const https = require('https');
const fs = require('fs');
const crypto = require('crypto');

/** @type Number */
const start = Date.now()

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

function doHash() {
    crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
        console.log('hash:', Date.now() - start);
    });
}

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
