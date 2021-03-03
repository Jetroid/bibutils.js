var assert = require('assert');
var cp = require('child_process');
var sinon = require('sinon');
var spawnSpy = sinon.spy(cp, 'spawn');
cp.spawn = spawnSpy;
var bibutils = require('../index');
var fs = require('fs');

function testConvert(fromFormat, toFormat, fromContent, toContent){
  it('should correctly convert well formed data from ' + fromFormat + ' to ' + toFormat, function(done) {
    var cb = function (err, data) {
      assert(err === null);
      assert.equal(data, toContent);
      done();
    }
    bibutils.convert(fromFormat, toFormat, fromContent, cb);
  });
}

describe('bibutils.js', function() {
  describe('.formats', function() {
    it('should have constants, human, mime and extensions objects', function() {
      assert(typeof bibutils.formats.constants === 'object');
      assert(typeof bibutils.formats.human === 'object');
      assert(typeof bibutils.formats.mime === 'object');
      assert(typeof bibutils.formats.extension === 'object');
    });

    describe('constants', function(){
      describe('.from, .to', function(){
        it('should contain some key/value pairs', function() {
          assert(Object.keys(bibutils.formats.constants.from).length > 0);
          assert(Object.keys(bibutils.formats.constants.to).length > 0);
        });
        it('should contain at least the MODS pair', function() {
          assert(bibutils.formats.constants.to.METADATA_OBJECT_DESCRIPTION_SCHEMA === 'xml');
          assert(bibutils.formats.constants.from.METADATA_OBJECT_DESCRIPTION_SCHEMA === 'xml');
        });
      });
    });

    describe('human', function(){
      describe('.from, .to', function(){
        it('should contain some key/value pairs', function() {
          assert(Object.keys(bibutils.formats.human.from).length > 0);
          assert(Object.keys(bibutils.formats.human.to).length > 0);
        });
        it('should contain at least MODS', function() {
          assert(bibutils.formats.human.to['MODS'] === 'xml');
          assert(bibutils.formats.human.from['MODS'] === 'xml');
        });
      });
    });

    describe('mime', function(){
      it('should contain some key/value pairs', function() {
        assert(Object.keys(bibutils.formats.mime).length > 0);
      });
      it('should contain at least MODS', function() {
        assert(Object.values(bibutils.formats.mime).includes('xml'));
      });
    });

    describe('extension', function(){
      it('should contain some key/value pairs', function() {
        assert(Object.keys(bibutils.formats.extension).length > 0);
      });
      it('should contain at least MODS', function() {
        assert(Object.values(bibutils.formats.extension).flat().includes('xml'));
      });
    });
  });

  describe('.convert', function() {
    it('should be externally accessible', function() {
      assert(typeof bibutils.convert === 'function');
    });

    //Test conversion between each of these formats
    var formatsToTest = ['bib','ris','end','xml','wordbib'];

    //Test conversion from and to each of these formats
    for (var i = 0, len = formatsToTest.length; i < len; i++){
      var fromFormat = formatsToTest[i];
      var fromContent = fs.readFileSync('./test/files/well-formed-article.' + formatsToTest[i], "utf8");
      for (var j = 0; j < len; j++){
        var toFormat = formatsToTest[j];
        // Because some formats lose information, (eg: ISI just uses initial for first name)
        // we store the result of each conversion.
        // If we didn't, any file generated would have the lost information.
        // (Eg, a BibTex generated from a ISI wouldn't have the full name too,
        // which would read as incorrect.)
        var key = fromFormat + '2' + toFormat;
        var toContent = fs.readFileSync('./test/files/well-formed-' + key, "utf8");
        testConvert(fromFormat, toFormat, fromContent, toContent);
      }
    }
  });

  describe('.executeApplication', function() {
    it('should not be externally accessible', function() {
      assert(typeof bibutils.executeApplication === 'undefined');
    });
  });

  describe('.binaryPath', function() {
    it('should not be externally accessible', function() {
      assert(typeof bibutils.binaryPath === 'undefined');
    });
    it('should be customizable', function(done) {
      var cb = function (err, data) {
        assert(err);
        var latestCallArgs = spawnSpy.args[spawnSpy.args.length-1];
        assert(latestCallArgs[0].includes('/custom/path'));
        done();
      }
      bibutils.setBinaryPath('/custom/path');
      var fromContent = fs.readFileSync('./test/files/well-formed-article.ris', "utf8");
      bibutils.convert('ris', 'xml', fromContent, cb);
    });
    it('should be customizable with extension', function(done) {
      var cb = function (err, data) {
        assert(err);
        var latestCallArgs = spawnSpy.args[spawnSpy.args.length-1];
        assert(latestCallArgs[0].includes('/custom/path'));
        assert(latestCallArgs[0].includes('-custom'));
        done();
      }
      bibutils.setBinaryPath('/custom/path', '-custom');
      var fromContent = fs.readFileSync('./test/files/well-formed-article.ris', "utf8");
      bibutils.convert('ris', 'xml', fromContent, cb);
    });
  });
});
