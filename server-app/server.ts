import net from 'net';
import { Canvas } from './canvas';
import { draw } from './draw';

const PORT = 8124;
net.createServer()
    .listen(PORT)
    .on('listening', () => {
        console.log('The TCP server is listening.');
    })
    .on('connection', socket => {
        socket.setEncoding('utf-8');
        socket.write('hello\r\n');
        const canvas = new Canvas();
        socket.on('data', (data: string) => {
            // The client passes us a string of all commands that are separated by \r\n or 0-2 whitespaces.
            // We are filtering out the falsy values.
            const commands = data.split(/\r\n\s{0}|\s{2}/g).filter(command => Boolean(command));
            for (const command of commands) {
                if ('quit' === command) {
                    socket.end();
                    return;
                }
                const output = draw(command, canvas);
                if (typeof output == "string") {
                    console.log(output);
                    socket.write(output);
                }
            }
        });
        socket.on('timeout', () => {
            console.log('The socket timed out.');
            socket.end('timeout');
        });    
        socket.on('close', err => {
            if (err) {
                console.log('The socket closed with error: ' + err);
                return;
            }
            console.log('The socket closed');
        });
    })
    .on('error', (error) => {
        console.log('The server encountered the following error: ' + error);
    })
    .on('close', () => {
        console.log('The server has closed');
    });
    