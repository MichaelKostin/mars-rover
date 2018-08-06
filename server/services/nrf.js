var spiDev = "/dev/spidev0.0";
//pins for rasp pi 1B according to: https://gist.github.com/natevw/5789019
var cePin = 17, irqPin = 18;

const radio = require('nrf').connect(spiDev, cePin);
radio.channel(0x4c).dataRate('1Mbps').crcBytes(2).autoRetransmit({count:15, delay:4000});
radio.begin(function () {
  var rx = radio.openPipe('rx', 0xF0F0F0F0E1, {size:32}),
    tx = radio.openPipe('tx', 0xF0F0F0F0D2, {size:32});
  rx.pipe(tx);        // echo back everything

  radio.printDetails()
});

module.exports = {
  radio
};
