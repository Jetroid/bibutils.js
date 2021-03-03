/*
Copyright (C) 2017 Jet Holt

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
var spawn = require('child_process').spawn;
var os = require('os');
const platform = os.platform();
var path = require('path');
const {
  formats
} = module.exports = require('./formats');

// Path component for the binary files
const DEFAULT_BIN_FOLDER = 'bibutils';
var CUSTOM_BIN_FOLDER = null;
var CUSTOM_EXT = '';

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
  if (CUSTOM_BIN_FOLDER) {
    if (CUSTOM_EXT) {
      EXT = CUSTOM_EXT;
    } else {
      EXT = '';
    }
  }

  var file = "";
  // Given that one of inFormat or outFormat has been replaced with MODS,
  // then if both are equal then it's MODS -> MODS
  // MODS -> MODS should run modsclean
  if (inFormat === outFormat){
    file = 'modsclean' + EXT;
  } else {
    file = inFormat + '2' + outFormat + EXT;
  }
  var binPath = CUSTOM_BIN_FOLDER ? CUSTOM_BIN_FOLDER : path.join(__dirname, DEFAULT_BIN_FOLDER);
  return path.join(binPath, file);
}

function executeApplication(commandPath, content, callback, arguments) {
  var child = spawn(commandPath, arguments);
  if (child.pid) {
    child.stdin.write(content);
    child.stdin.end();
    
    var output = '';
    child.stdout.on('data', function (data) { output += data.toString() });
    child.stdout.on('end', function () { callback(null, output) });
  } else {
    callback(new Error('Failed to spawn child process'), null);
  }
}

module.exports.convert = function (inFormat, outFormat, content, cb, argumentsFrom=[], argumentsTo=[]) {

  //Error out if they use something wrong
  if(!Object.values(formats.constants.from).includes(inFormat)) {
    throw new Error('Unknown or unsupported bibliography import format: `' + inFormat +
                    '`\nUse bibutils.formats.from to find an appropriate import format.\n' );
  }
  if(!Object.values(formats.constants.to).includes(outFormat)) {
    throw new Error('Unknown or unsupported bibliography export format: `' + outFormat +
                    '`\nUse bibutils.formats.to to find an appropriate export format.\n' );
  }

  // If they only want to do a MODS-based conversion, we can just execute that directly
  if(outFormat === formats.constants.to.METADATA_OBJECT_DESCRIPTION_SCHEMA) {
    return executeApplication(binaryPath(inFormat, outFormat), content, cb, argumentsFrom);
  }
  if(inFormat === formats.constants.from.METADATA_OBJECT_DESCRIPTION_SCHEMA) {
    return executeApplication(binaryPath(inFormat, outFormat), content, cb, argumentsTo);
  }

  // If they want to convert something else we need to do it using MODS
  // as an intermediate

  // Create the callback for the second half first, for the first half to call
  var internalCallback = function (err, data) {
    if (!err) {
      // The result of this calls their callback
      executeApplication(binaryPath(formats.constants.from.METADATA_OBJECT_DESCRIPTION_SCHEMA, outFormat), data, cb, argumentsTo);
    }
  }
  // Convert their thing to MODS.
  executeApplication(binaryPath(inFormat, formats.constants.to.METADATA_OBJECT_DESCRIPTION_SCHEMA), content, internalCallback, argumentsFrom);
};

module.exports.setBinaryPath = function (binPath, ext) {
  CUSTOM_BIN_FOLDER = binPath;
  if (ext) {
    CUSTOM_EXT = ext;
  }
};
