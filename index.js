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
const platform = os.platform();
var path = require('path');
const {
  formats
} = module.exports = require('./formats');

// Path component for the binary files
const BIN_FOLDER = 'bibutils';

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
  // Given that one of inFormat or outFormat has been replaced with MODS,
  // then if both are equal then it's MODS -> MODS
  // MODS -> MODS should run modsclean
  if (inFormat === outFormat){
    file = 'modsclean' + EXT;
  } else {
    file = inFormat + '2' + outFormat + EXT;
  }
  return path.join(__dirname, BIN_FOLDER, file);
}

function executeApplication(commandPath, content, callback) {
  var child = spawn(commandPath);
  child.stdin.write(content);
  child.stdin.end();
  child.stdout.on('data', function (data) { callback(data.toString()) });
}

module.exports.convert = function (inFormat, outFormat, content, cb) {
  //Error out if they use something wrong
  if(!Object.values(formats.from.constants).includes(inFormat)) {
    throw new Error('Unknown or unsupported bibliography import format: `' + inFormat +
                    '`\nUse bibutils.formats.from to find an appropriate import format.\n' );
  }
  if(!Object.values(formats.to.constants).includes(outFormat)) {
    throw new Error('Unknown or unsupported bibliography export format: `' + outFormat +
                    '`\nUse bibutils.formats.to to find an appropriate export format.\n' );
  }

  // If they only want to do a MODS-based conversion, we can just execute that directly
  if(inFormat === formats.to.constants.METADATA_OBJECT_DESCRIPTION_SCHEMA ||
     outFormat === formats.from.constants.METADATA_OBJECT_DESCRIPTION_SCHEMA) {
    return executeApplication(binaryPath(inFormat, outFormat), content, cb);
  }

  // If they want to convert something else we need to do it using MODS
  // as an intermediate

  // Create the callback for the second half first, for the first half to call
  var internalCallback = function (data) {
    // The result of this calls their callback
    executeApplication(binaryPath(formats.from.constants.METADATA_OBJECT_DESCRIPTION_SCHEMA, outFormat), data, cb);
  }
  // Convert their thing to MODS.
  executeApplication(binaryPath(inFormat, formats.to.constants.METADATA_OBJECT_DESCRIPTION_SCHEMA), content, internalCallback);
};
