
function trackEnterTheBox (gpsTrack, pointNorthWest, pointSouthEast) {
  var result = false;

  gpsTrack.some(function (gpsPoint) {
    result = gpsPoint.lat <= pointNorthWest.lat && gpsPoint.lat >= pointSouthEast.lat &&
      gpsPoint.lon >= pointNorthWest.lon && gpsPoint.lon <= pointSouthEast.lon;
    return result;
  });
  return result;
}

function trackInTheBox (gpsTrack, pointNorthWest, pointSouthEast) {
  var result = true;

  gpsTrack.some(function (gpsPoint) {
    result = gpsPoint.lat > pointNorthWest.lat || gpsPoint.lat < pointSouthEast.lat ||
      gpsPoint.lon < pointNorthWest.lon || gpsPoint.lon > pointSouthEast.lon;
    return result;
  });
  return !result;
}

function getDistanceBetweenPointAndNearestGpsPoint (gpsTrack, gpsPoint) {
  var distance = null;
  var nearestPointDistance = null;
  gpsTrack.forEach(function (gpsTrackPoint) {
    distance = getDistance(gpsPoint, gpsTrackPoint);
    if (nearestPointDistance === null || distance < nearestPointDistance) {
      nearestPointDistance = distance;
    }
  });
  return nearestPointDistance;
}

function getTimeAtTheNearest (gpsTrack, anotherGpsTrack) {
  var distance = null;
  var nearestTime = null;
  var nearestDistance = null;

  gpsTrack.forEach(function (gpsTrackPoint) {
    anotherGpsTrack.forEach(function (anotherGpsTrackPoint) {
      distance = getDistance(gpsTrackPoint, anotherGpsTrackPoint);
      if (nearestDistance === null || distance < nearestDistance) {
        nearestDistance = distance;
        nearestTime = gpsTrackPoint.time;
      }
    });
  });
  return nearestTime;
}

function getDistanceAtTheNearest (gpsTrack, anotherGpsTrack, ignoreTime) {
  var distance = null;
  var nearestDistance = null;

  gpsTrack.forEach(function (gpsTrackPoint) {
    anotherGpsTrack.forEach(function (anotherGpsTrackPoint) {
      distance = getDistance(gpsTrackPoint, anotherGpsTrackPoint);
      if ((nearestDistance === null || distance < nearestDistance) &&
        (ignoreTime === true || gpsTrackPoint.time === anotherGpsTrackPoint.time)) {
        nearestDistance = distance;
      }
    });
  });

  return nearestDistance;
}

function getDistance (p1, p2) {
  return Math.sqrt(Math.pow(p2.lat - p1.lat, 2) + Math.pow(p2.lon - p1.lon, 2));
}

module.exports.trackEnterTheBox = trackEnterTheBox;
module.exports.trackInTheBox = trackInTheBox;
module.exports.getDistanceBetweenPointAndNearestGpsPoint = getDistanceBetweenPointAndNearestGpsPoint;
module.exports.getTimeAtTheNearest = getTimeAtTheNearest;
module.exports.getDistanceAtTheNearest = getDistanceAtTheNearest;
