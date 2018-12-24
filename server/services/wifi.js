let timeInterval = null;
let delay = 5000;
const { promisify } = require('util');
const exec = require('child_process').exec;
const asyncExec = promisify(exec);
const defaultCallback = () => { console.log('Callback is not specified')};

module.exports = {
  onData,
  off
};

function onData(callback = defaultCallback) {
  timeInterval = setInterval(() => {
    getSignalLevel(callback);
  }, delay);
}

function off() {
  clearInterval(timeInterval);
}

async function getSignalLevel(callback) {
  try {
    const { stdout: signalString } = await asyncExec('sudo iwconfig wlan0 | egrep "Signal level"');
    const [, signalLevel] = signalString.match(/level=-(\d+)/);
    callback(levelToPercentage(parseInt(signalLevel, 10)));
  } catch (e) {
    console.error('Error during getting wifi signal level', e);
    off();
  }

}

function levelToPercentage(dBm) {
  return (dBm > 100) ? 0 : (dBm < 50 ? 100 : 2 * (100 - dBm))
}
