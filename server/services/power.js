var ina219 = require('ina219');

ina219.init();

ina219.calibrate32V1A(function () {

  ina219.getBusVoltage_V(function (volts) {

    console.log("Voltage: " + volts);
    ina219.getCurrent_mA(function (current){

      console.log("Current (mA): " + current );
    });
    ina219.getShuntVoltage_mV((res) => console.log('getShuntVoltage_mV', res))

  });
});
