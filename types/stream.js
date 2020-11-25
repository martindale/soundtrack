'use strict';

const net = require('net');
const Interface = require('@fabric/core/types/interface');

class Stream extends Interface {
  constructor (settings = {}) {
    super(settings);

    this.settings = Object.assign({
      listen: true,
      name: '@fabric/soundtrack',
      port: 43000
    }, this.settings, settings);

    this.server = null;

    return this;
  }

  _handleConnection (socket) {
    console.log('client connected');

    socket.on('end', () => {
      console.log('client disconnected');
    });

    // socket.write('Hello, world!');
  }

  start () {
    this.server = net.createServer(this._handleConnection.bind(this));

    this.server.on('error', (err) => {
      throw err;
    });

    this.server.listen(this.settings.port, () => {
      console.log('server bound');
    });
  }

  stop () {
    if (this.server) this.server.close();
  }
}

module.exports = Stream;
