var pkg = require('../');
var expect = require('chai').expect;
var fixture = require('./fixture/gps-helper.json');

describe('Testing gps-helper module', function () {
  describe('Testing trackEnterTheBox()', function () {
    it('Should return true if all the gpsTrack points are in the box', function () {
      var result = pkg.trackEnterTheBox(fixture.track1, fixture.square1.p1, fixture.square1.p2);
      expect(result).to.be.true;
    });

    it('Should return true if a point of the gpsTrack points is in the box', function () {
      var result = pkg.trackEnterTheBox(fixture.track1, fixture.square2.p1, fixture.square2.p2);
      expect(result).to.be.true;
    });

    it('Should return false if the gpsTrack does not enter in the box', function () {
      var result = pkg.trackEnterTheBox(fixture.track1, fixture.square3.p1, fixture.square3.p2);
      expect(result).to.be.false;
    });
  });

  describe('Testing trackInTheBox()', function () {
    it('Should return true if all the gpsTrack points are in the box', function () {
      var result = pkg.trackInTheBox(fixture.track1, fixture.square1.p1, fixture.square1.p2);
      expect(result).to.be.true;
    });

    it('Should return false if all the gpsTrack point are not in the box', function () {
      var result = pkg.trackInTheBox(fixture.track1, fixture.square2.p1, fixture.square2.p2);
      expect(result).to.be.false;
    });

  });

  describe('Testing getDistanceBetweenPointAndNearestGpsPoint()', function () {
    it('Should return the nearest distance', function () {
      var result = pkg.getDistanceBetweenPointAndNearestGpsPoint(fixture.track1, fixture.point1);
      expect(result).to.equal(Math.sqrt(5));
    });
  });

  describe('Testing getTimeAtTheNearest()', function () {
    it('Should return the time at the nearest distance', function () {
      var result = pkg.getTimeAtTheNearest(fixture.track1, fixture.track2);
      expect(result).to.equal(fixture.track1[0].time);
    });
  });

  describe('Testing getDistanceAtTheNearest()', function () {
    it('Should return the nearest distance between 2 track without checking time', function () {
      var result = pkg.getDistanceAtTheNearest(fixture.track1, fixture.track2, true);
      expect(result).to.equal(Math.sqrt(40));
    });

    it('Should return the nearest distance between 2 track', function () {
      var result = pkg.getDistanceAtTheNearest(fixture.track1, fixture.track2, false);
      expect(result).to.equal(Math.sqrt(197));
    });
  });

});