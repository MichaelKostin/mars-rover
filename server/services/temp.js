const temp = require('pi-temperature');
let timeInterval = null;
let delay = 5000;
const defaultCallback = () => { console.log('Callback is not specified')};

module.exports = {
  onData,
  off
};

function onData(callback = defaultCallback) {
  timeInterval = setInterval(() => {
    temp.measure(callback);
  }, delay);
}

function off() {
  clearInterval(timeInterval);
}
