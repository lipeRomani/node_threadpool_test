process.env.UV_THREADPOOL_SIZE = 4;

const crypto = require('crypto');

const startDate = Date.now();

crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
    console.log('1:', Date.now() - startDate);
});

crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
    console.log('2:', Date.now() - startDate);
});

crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
    console.log('3:', Date.now() - startDate);
});

crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
    console.log('4:', Date.now() - startDate);
});

crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', (hash) => {
    console.log('5:', Date.now() - startDate);
});