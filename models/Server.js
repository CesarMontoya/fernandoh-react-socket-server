// Servidor de Express
const express  = require('express');
const http     = require('http');
const socketio = require('socket.io');
const path     = require('path');
const cors     = require('cors');
const Sockets  = require('./Sockets');

class Server {

    constructor() {

        this.app  = express();
        this.port = process.env.PORT;
        
        // Http server
        this.server = http.createServer( this.app );

        // Configuraciones del Socket
        // Configuración del socket server
        this.io = socketio(this.server, {cors: {
            origin: "*",
            methods: ["GET", "POST"]
          }});
    }

    middlewares() {
        // Desplegar el directorio público
        this.app.use( express.static( path.resolve( __dirname, '../public' ) ) );

        this.app.use( cors() );
    }

    configurarSockets() {
        new Sockets( this.io );
    }

    exectute() {

        // Inicializar middlewares
        this.middlewares();

        // Inicializar Sockets
        this.configurarSockets();

        // Inicializar el server
        this.server.listen(this.port, () => console.log('Corriendo en el puerto', this.port));
    }
} 

module.exports = Server; 