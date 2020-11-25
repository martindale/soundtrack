'use strict';

const Soundtrack = require('../types/soundtrack');
const HTTPServer = require('@fabric/http/types/server');

const Stream = require('../types/stream');
const settings = require('../settings/local');

async function main () {
  const soundtrack = new Soundtrack(); // TODO: load settings
  const stream = new Stream(settings);
  const server = new HTTPServer(); // TODO: load settings

  soundtrack.on('ready', async function (identity) {
    console.log('[SOUNDTRACK:HTTP]', 'Core Engine Ready:', identity);
  });

  server.on('ready', async function (msg) {
    console.log('[SOUNDTRACK:HTTP]', 'HTTP Server Ready:', msg);
  });

  await stream.start();
  await soundtrack.start();
  await server.start();
}

main().catch((exception) => {
  console.error('[SOUNDTRACK:HTTP]', 'Main Process Exception:', exception);
});
