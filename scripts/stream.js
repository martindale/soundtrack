'use strict';

const Soundtrack = require('../types/soundtrack');

const Stream = require('../types/stream');
const settings = require('../settings/local');

async function main () {
  const stream = new Stream(settings);
  await stream.start();
}

main().catch((exception) => {
  console.error('[SOUNDTRACK:STREAM]', 'Main Process Exception:', exception);
});
