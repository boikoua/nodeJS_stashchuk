const fs = require('fs');
const dns = require('dns');
const info = require('./info');

console.log('Program start');

setTimeout(() => info('Timeout 1'), 0);
setTimeout(() => {
  process.nextTick(() => info('Next tick 2'));
  info('Timeout 2');
}, 100);

let intervalCount = 0;

const intervalId = setInterval(() => {
  if (intervalCount === 10) {
    clearInterval(intervalId);
    info('Interval end');
  } else {
    info(`Interval ${(intervalCount += 1)}`);
  }
}, 50);

fs.writeFile('./test.txt', 'Hello Node.JS', () => info('File written'));

Promise.resolve().then(() => info('Promise 1'));

process.nextTick(() => info('Next tick 1'));

setImmediate(() => info('Immediate 1'));

dns.lookup('google.com', (err, address, family) => {
  info('DNS 1 google.com');
  Promise.resolve().then(() => info('Promise 2'));
  process.nextTick(() => info('Next tick 3'));
});

console.log('Program end');
