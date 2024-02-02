const socket = require('socket.io');


const socketProcesses = (server) => {
    const io = socket(server, {
        cors: {
            origin: ['http://localhost:3000', 'https://stallersoftware.com'],
            methods: ['GET', 'POST'],
            credentials: true
        }
    });
    io.use((socket, next) => {
        const allowedDomains = ['https://stallersoftware.com', 'http://localhost:3000']; 
        const clientReferer = socket.handshake.headers.referer;

        if (allowedDomains.some(domain => clientReferer.startsWith(domain))) {
            return next();
        } else {
            return next(new Error('Unauthorized Domain'));
        }
    });
    io.on('connection', (socketxd) => {

        socketxd.on('message', (data) => {
            io.emit('incomingMessage', data);
        });
    });

    return io;
};

module.exports = socketProcesses;