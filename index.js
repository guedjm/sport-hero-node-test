var gpsHelper = require('./src/gps-helper');

var lib = {
  trackEnterTheBox: gpsHelper.trackEnterTheBox,
  trackInTheBox: gpsHelper.trackInTheBox,
  getDistanceBetweenPointAndNearestGpsPoint: gpsHelper.getDistanceBetweenPointAndNearestGpsPoint,
  getTimeAtTheNearest: gpsHelper.getTimeAtTheNearest,
  getDistanceAtTheNearest: gpsHelper.getDistanceAtTheNearest
};

module.exports = lib;
