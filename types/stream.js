'use strict';

const net = require('net');
const Hash256 = require('@fabric/core/types/hash256');
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
    this.sockets = {};

    return this;
  }

  async _handleConnection (socket) {
    console.log('[SCRIPTS:STREAM]', '[client connected]', socket.remoteAddress);

    let id = Hash256.digest(socket.remoteAddress);

    if (this.sockets[id]) {
      // TODO: notify client of disconnect
      await this.sockets[id].destroy();
    }

    this.sockets[id] = socket;
    // TODO: move to `_boundFunctions`
    this.sockets[id]._fabricHandler = this.on('data', this._handleSocketData.bind(this));

    socket.on('end', () => {
      console.log('[SCRIPTS:STREAM]', '[client disconnected]', id);
    });

    // socket.write('Hello, world!');
  }

  async _handleSocketData (data) {
    console.log('[SCRIPTS:STREAM]', 'Socket data:', data);
  }

  async start () {
    const self = this;

    self.server = net.createServer(self._handleConnection.bind(self));

    self.server.on('error', (err) => {
      throw err;
    });

    const promise = new Promise((resolve, reject) => {
      self.server.listen(self.settings.port, (error) => {
        if (error) return reject(error);
        console.log('[SCRIPTS:STREAM]', '[server bound]', self.server.address);
        resolve(self);
      });
    });

    return promise;
  }

  async stop () {
    if (this.server) this.server.close();
  }
}

module.exports = Stream;
