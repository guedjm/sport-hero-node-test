/**
 * Check if a gps track enter in a box
 * @param gpsTrack The gps track
 * @param pointNorthWest Top-left corner of the box
 * @param pointSouthEast Bottom-right corner of the box
 * @returns {boolean} Check result
 */
function trackEnterTheBox (gpsTrack, pointNorthWest, pointSouthEast) {
  var result = false;

  gpsTrack.some(function (gpsPoint) {
    result = gpsPoint.lat <= pointNorthWest.lat && gpsPoint.lat >= pointSouthEast.lat &&
      gpsPoint.lon >= pointNorthWest.lon && gpsPoint.lon <= pointSouthEast.lon;
    return result;
  });
  return result;
}

/**
 * Check if a gps track is in a box
 * @param gpsTrack The gps track
 * @param pointNorthWest Top-left corner of the box
 * @param pointSouthEast Bottom-right corner of the box
 * @returns {boolean} Check result
 */
function trackInTheBox (gpsTrack, pointNorthWest, pointSouthEast) {
  var result = true;

  gpsTrack.some(function (gpsPoint) {
    result = gpsPoint.lat > pointNorthWest.lat || gpsPoint.lat < pointSouthEast.lat ||
      gpsPoint.lon < pointNorthWest.lon || gpsPoint.lon > pointSouthEast.lon;
    return result;
  });
  return !result;
}

/**
 * Get the smallest distance between a gps track and a gps point
 * @param gpsTrack The gps track
 * @param gpsPoint The gps point
 * @returns {int} The distance
 */
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

/**
 * Get time at the nearest distance between two gps track
 * @param gpsTrack A gps track
 * @param anotherGpsTrack Another gps track
 * @returns {int} Time
 */
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

/**
 * Get the smallest distance between two gps track
 * Time match can be specified with the ignoreTime parameter
 * @param gpsTrack A gps track
 * @param anotherGpsTrack Another gps track
 * @param ignoreTime {boolean} Match time
 * @returns {number} smallest distance
 */
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

/**
 * Get distance between two points
 * @param p1 Point one
 * @param p2 Point two
 * @returns {number} Distance
 */
function getDistance (p1, p2) {
  return Math.sqrt(Math.pow(p2.lat - p1.lat, 2) + Math.pow(p2.lon - p1.lon, 2));
}

module.exports.trackEnterTheBox = trackEnterTheBox;
module.exports.trackInTheBox = trackInTheBox;
module.exports.getDistanceBetweenPointAndNearestGpsPoint = getDistanceBetweenPointAndNearestGpsPoint;
module.exports.getTimeAtTheNearest = getTimeAtTheNearest;
module.exports.getDistanceAtTheNearest = getDistanceAtTheNearest;
