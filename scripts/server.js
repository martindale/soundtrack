'use strict';

require('debug-trace')({ always: true });

const Soundtrack = require('../types/soundtrack');
const HTTPServer = require('@fabric/http/types/server');

const Stream = require('../types/stream');
const settings = require('../settings/local');

async function main () {
  const soundtrack = new Soundtrack(); // TODO: load settings
  const stream = new Stream(settings);
  const server = new HTTPServer({
    resources: {
      "User": {
        name: 'User'
      },
      "Service": {
        name: 'Service',
        fields: {
          name: 'id'
        },
        data: [
          {
            id: "audio",
            name: "@services/audio"
          }
        ]
      }
    },
    verbosity: 5
  }); // TODO: load settings

  soundtrack.on('ready', async function (identity) {
    console.log('[SOUNDTRACK:SERVER]', 'Core Engine Ready:', identity);
  });

  server.on('ready', async function (msg) {
    console.log('[SOUNDTRACK:SERVER]', 'HTTP Server Ready:', msg);
  });

  await stream.start();
  await soundtrack.start();
  await server.start();
}

main().catch((exception) => {
  console.error('[SOUNDTRACK:SERVER]', 'Main Process Exception:', exception);
});
