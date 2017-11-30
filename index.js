//    bibutils.js - node.js wrapper from Chris Putnam's bibutils tools.
//    Copyright (C) 2017  Jet Holt
//
//    This program is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, either version 3 of the License, or
//    (at your option) any later version.
//
//    This program is distributed in the hope that it will be useful,
//    but WITHOUT ANY WARRANTY; without even the implied warranty of
//    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//    GNU General Public License for more details.
//
//    You should have received a copy of the GNU General Public License
//    along with this program.  If not, see <http://www.gnu.org/licenses/>.
//
var spawn = require('child_process').spawn;
var os = require('os');
var platform = os.platform();
var path = require('path');

// Path component for the binary files
var BIN_FOLDER = 'bibutils';

// Get the platform extension - we use this to determine the binary to execute
var EXT = '';
if (platform === 'win32'){
  EXT = '.exe';
} else if (platform === 'darwin') {
  EXT = '-osx';
} else if (platform === 'linux') {
  EXT = '-linux';
} else {
  throw new Error('bibutils does not support your operating system');
}

// Get the path to the appropriate binary
function binaryPath(inFormat, outFormat) {
  var file = "";
  if (inFormat === outFormat){
    file = 'modsclean' + EXT;
  }
  file = inFormat + '2' + outFormat + EXT;
  return path.join(__dirname, BIN_FOLDER, file);
}

function executeApplication(commandPath, content, callback) {
  var child = spawn(commandPath);
  child.stdin.write(content);
  child.stdin.end();
  child.stdout.on('data', function (data) { callback(data.toString()) });
}

var formats = module.exports.formats = Object.freeze({
  from: {
    BIBTEX                              : 'bib',
    COPAC                               : 'copac',
    ENDNOTE_REFER                       : 'end',
    ENDNOTE                             : 'end',
    ENDNOTE_XML                         : 'endx',
    ISI_WEB_OF_SCIENCE                  : 'isi',
    ISI                                 : 'isi',
    PUBMED_XML                          : 'med',
    PUBMED                              : 'med',
    METADATA_OBJECT_DESCRIPTION_SCHEMA  : 'xml',
    MODS                                : 'xml',
    RIS_RESEARCH_INFORMATION_SYSTEMS    : 'ris',
    RIS                                 : 'ris'
  },
  to: {
    NASA_ASTROPHYSICS_DATA_SYSTEM       : 'ads',
    ADS                                 : 'ads',
    BIBTEX                              : 'bib',
    ENDNOTE                             : 'end',
    ENDNOTE_REFER                       : 'end',
    ISI_WEB_OF_SCIENCE                  : 'isi',
    ISI                                 : 'isi',
    RIS_RESEARCH_INFORMATION_SYSTEMS    : 'ris',
    RIS                                 : 'ris',
    WORD_2007_BIBLIOGRAPHY              : 'wordbib',
    WORDBIB                             : 'wordbib',
    METADATA_OBJECT_DESCRIPTION_SCHEMA  : 'xml',
    MODS                                : 'xml',
  }
});

var convert = module.exports.convert = function (inFormat, outFormat, content, cb) {
  //Error out if they use something wrong
  if(!Object.values(formats.from).includes(inFormat)) {
    throw new Error('Unknown or unsupported bibliography import format: `' + inFormat +
                    '`\nUse bibutils.formats.from to find an appropriate import format.\n' );
  }
  if(!Object.values(formats.to).includes(outFormat)) {
    throw new Error('Unknown or unsupported bibliography export format: `' + outFormat +
                    '`\nUse bibutils.formats.to to find an appropriate export format.\n' );
  }

  // If they only want to do a MODS-based conversion, we can just execute that directly
  if(inFormat === formats.from.METADATA_OBJECT_DESCRIPTION_SCHEMA ||
     outFormat === formats.to.METADATA_OBJECT_DESCRIPTION_SCHEMA) {
    return executeApplication(binaryPath(inFormat, outFormat), content, cb);
  }

  // If they want to convert something else we need to do it using MODS
  // as an intermediate

  // Create the callback for the second half first, for the first half to call
  var internalCallback = function (data) {
    // The result of this calls their callback
    executeApplication(binaryPath(formats.from.METADATA_OBJECT_DESCRIPTION_SCHEMA, outFormat), data, cb);
  }
  // Convert their thing to MODS.
  executeApplication(binaryPath(inFormat, formats.to.METADATA_OBJECT_DESCRIPTION_SCHEMA), content, internalCallback);
}
