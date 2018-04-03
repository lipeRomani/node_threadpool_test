const cluster = require('cluster');

if (cluster.isMaster) {
    cluster.fork();
    // cluster.fork();
    // cluster.fork();
    // cluster.fork();
} else {
    const express = require('express');
    const app = express();

    function doWork(duration) {
        const start = Date.now();
        while(Date.now() - start < duration){}
    }

    app.get('/', (req, res) => {
        doWork(10000);
        res.status(200).json({
            message: "Ola mundo"
        });
    });

    app.get('/fast', (req, res) => {
        res.status(200).json({
            message: "World fast"
        });
    });

    app.listen(3000, () => {
        console.log(`Child process PID ${process.pid}`);
    });
}
