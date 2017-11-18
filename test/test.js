var assert = require('assert');

var bibutils = require('../index');
var fs = require('fs');

function testConvert(fromFormat, toFormat, fromContent, toContent){
  it('should correctly convert well formed data from ' + fromFormat + ' to ' + toFormat, function(done) {
    var cb = function (data) {
      assert.equal(data, toContent);
      done();
    }
    bibutils.convert(fromFormat, toFormat, fromContent, cb);
  });
}

describe('bibutils.js', function() {
  describe('.formats', function() {
    it('should have from and to objects', function() {
      assert(typeof bibutils.formats.from === 'object');
      assert(typeof bibutils.formats.to === 'object');
    });

    describe('.from, .to', function(){
      it('should contain some key/value pairs', function() {
        assert(Object.keys(bibutils.formats.from).length > 0);
        assert(Object.keys(bibutils.formats.to).length > 0);
      });
      it('should contain at least the MODS pair', function() {
        assert(bibutils.formats.to.METADATA_OBJECT_DESCRIPTION_SCHEMA === 'xml');
        assert(bibutils.formats.from.METADATA_OBJECT_DESCRIPTION_SCHEMA === 'xml');
      });
    });
  });

  describe('.convert', function() {
    it('should be externally accessible', function() {
      assert(typeof bibutils.convert === 'function');
    });

    //Test conversion between each of these formats
    var formatsToTest = ['bib','ris','end','xml','isi'];

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
  });
});
