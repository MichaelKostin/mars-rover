const temp = require('pi-temperature');
let timeInterval = null;
let delay = 5000;
let callbackFunc = null;

module.exports = {
  run,
  stop,
  setDelay
};

function run(callback) {
  if (typeof callback !== 'function') {
    console.error('Temp can not be provided');
    return;
  }

  if (process.platform !== 'linux') {
    console.info('Board is not detected');
    return;
  }

  callbackFunc = callback;
  timeInterval = setInterval(() => {
    temp.measure(callbackFunc);
  }, delay);
}

function stop() {
  clearInterval(timeInterval);
}

function setDelay(newDelay) {
  delay = newDelay;
  if (timeInterval) {
    stop();
    run(callbackFunc);
  }
}