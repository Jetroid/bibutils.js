## Purpose

Provides dictionaries to get useful metadata about various bibliography formats.
Provides convenience nodejs wrapper for Chris Putnam's `bibutils` program set,
allowing conversion between subsets of bibliography formats.

```javascript
var bibutils = require('bibutils.js');

// Acquire the appropriate format identifiers
var fromFormat = bibutils.formats.constants.from.BIBTEX;
var toFormat = bibutils.formats.human.to['RIS'];

// Get the metadata we want
var toMime = bibutils.metadata.mime[toFormat]; // => 'application/x-research-info-systems'
var toExtension = bibutils.metadata.extension[toFormat]; // => '.ris'

// Get the sample BibTeX string to convert.
var myBibliographyString = bibutils.sampleBibtexString;

// Convert between the two formats
bibutils.convert(fromFormat, toFormat, myBibliographyString, function (err, data) {
  if (!err) {
    // Prints the BibTeX sample converted to RIS format
    console.log(data);
  }
});
```

## Installation

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/).

Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```bash
$ npm install bibutils.js
```

## Features

Provides human readable name,
MIME type and file extension information for several bibliography formats.

Allows conversion from and to subsets of those bibliography formats,
using the [Library of Congress](https://www.loc.gov/)'s
[Metadata Object Description Schema](http://www.loc.gov/standards/mods/)
(MODS) version 3.1 as an intermediate format.

Conversion is supported from the following formats:

* BibTeX
* BibLaTeX
* [COPAC](http://copac.jisc.ac.uk/help/export-help.html#tagged)
* EBI XML
* EndNote
* EndNote XML
* [ISI Web of Science](http://wiki.cns.iu.edu/pages/viewpage.action?pageId=1933374)
* Pubmed XML
* NBIB MEDLINE
* RIS
* Word 2007 Bibliography
* [MODS](http://www.loc.gov/standards/mods/)

Conversion is supported to the following formats:

* ADS - [NASA Astrophysics Data System](https://en.wikipedia.org/wiki/Astrophysics_Data_System) [Tagged Format](http://doc.adsabs.harvard.edu/abs_doc/help_pages/taggedformat.html)
* BibTeX
* EndNote
* [ISI Web of Science](http://wiki.cns.iu.edu/pages/viewpage.action?pageId=1933374)
* RIS
* Word 2007 Bibliography
* [MODS](http://www.loc.gov/standards/mods/)

## Quick Start

Install the module to your project:

```javascript
$ npm install bibutils.js
```

Include the module in your project:

```javascript
var bibutils = require('bibutils.js');
```

Acquire the appropriate format identifiers for your required usage,
see the [Format Identifier Acquisition](#format-identifier-acquisition) section.

The example below selects the fromFormat with a constant identifier, and the toFormat using the human readable string, `'RIS'`.

```javascript
var fromFormat = bibutils.formats.constants.from.BIBTEX;
var toFormat = bibutils.formats.human.to['RIS'];
```

### Get Metadata

Get any metadata you need from the `.metadata` object:

```javascript
var fromMime = bibutils.metadata.mime[fromFormat];
var fromExtension = bibutils.metadata.extension[fromFormat];
var fromHumanReadableName = bibutils.metadata.human[fromFormat];

var toMime = bibutils.metadata.mime[toFormat];
var toExtension = bibutils.metadata.extension[toFormat];
var toHumanReadableName = bibutils.metadata.human[toFormat];
```

### Convert Between Formats

Write a callback to be called when conversion is completed. `err` is set if 
any error occurs, `data` is the converted bibliography as a string.

```javascript
var callback = function (err, data) {
  if (!err) {
    console.log(data);
  }
};
```

Providing the convert function with a bibliography string in the same format as
specified by fromFormat, (in this example, BibTeX) call the conversion:

```javascript
// Get some bibliography string
var myBibliographyString = bibutils.sampleBibtexString;

// Convert
bibutils.convert(fromFormat, toFormat, myBibliographyString, callback);
```

## Get Format Metadata

`bibutils.js` provides mappings from format identifier
(see [format identifier acquisition](#format-identifier-acquisition))
to MIME type, human readable name, and file extension.

These are provided by the `.metadata.mime`, `.metadata.human`,
and `.metadata.extension` objects, respectively.

```javascript
// Get MIME type, human name, and extension for ISI documents
var identifier = bibutils.formats.constants.to.ISI;
var mimeType = bibutils.metadata.mime[identifier];
var extension = bibutils.metadata.extension[identifier];
var human = bibutils.metadata.human[identifier];
```

`bibutils.js` does not currently have a specific MIME type for
the ADS Tagged Format, EBI XML format, COPAC formatted reference,
or the Word 2007 Bibliography format.
It also does not currently have a specific extension for
the COPAC formatted reference.
Sensible defaults have been assumed.

If you know that these exist, please submit a pull request with an appropriate reference!

## Convert Between Bibliography Formats

When converting between bibliography formats,
you must specify to `bibutils.js` which format you are converting from,
and which format you are converting to.
This requires acquisition of the [format identifier](#format-identifier-acquisition).

You must also write your application to use callbacks;
`bibutils.js`'s `convert` function is asynchronous.

```javascript
var callback = function (err, data) {
  if (!err) {
    console.log(data);
  }
};

// Get some bibliography string
var myBibliographyString = bibutils.sampleBibtexString;

// Convert
bibutils.convert(fromFormat, toFormat, myBibliographyString, callback);
```

### Options

`bibutils.js` allows for passthrough of arguments to the `bibutils` program set.
These are not checked for correctness by `bibutils.js` and no protections are provided.

Each conversion performed by `bibutils.js` uses two excutions of a `bibutils` program.
`inFormat -> MODS`, then `MODS -> outFormat`.

For instance, if asking to convert from RIS to BibTeX,
your bibliography string is first converted from RIS to MODS, and then from
MODS to BibTeX.

You can pass in two arrays as optional parameters to provide arguments.
The first array provides parameters for the conversion from a format to MODS,
and the second array provides parameters for the conversion from MODS to a format.

```javascript
var from = bibutils.formats.constants.from.RIS;
var to = bibutils.formats.constants.to.BIBTEX;
var options1 = ['-as','./test.txt'];
var options2 = ['-U'];
bibutils.convert(from, to, risString, callback, options1, options2);
```

The above specifies a file containing a list of names that should be left as is
for the RIS -> MODS conversion (`-as ./text.txt`), and specifies that all BibTeX
tags/types should be in uppercase (`-U`).

You can find the arguments accepted by the `bibutils` program that you are using
by [reading the official bibutils documentation](https://sourceforge.net/p/bibutils/home/Bibutils/)
or running it manually with the `-h` argument.

## Format Identifier Acquisition

To use `bibutils.js`, you need to indentify which format you are using.
`bibutils.js` exposes the formats it accepts with the `.formats` variable.

Formats can be specified [using constants](#identifier-via-constants),
[using human readable names](#identifier-via-human-readable-name),
by [looking up the MIME type](#identifier-via-mime-type),
or by [looking up the file extension](#identifier-via-file-extension).

The preferred methods are by constants or by human readable names.
Selecting by MIME type or file extension has unfortunate ambiguities.

Please note that although each of these methods returns some identifier,
these identifier values should never be hardcoded.
Select them via constants instead.
This isolates your application from the implementation details of `bibutils.js`.

```javascript
// Correct
var identifierCorrect = bibutils.formats.constants.from.BIBTEX;
// Incorrect
var identifierWrong = 'bib';
```

### Identifier via Constants

For convenience with using the `bibutils.js` `.convert` function,
constants have been specified in two objects.

`.formats.constants.from` is an object of all pairings that `bibutils.js` can convert from,
and `.formats.constants.to` is an object of all pairings that it can convert to.

```javascript
bibutils.formats.constants.from: {
  BIBTEX                              : 'bib',
  COPAC                               : 'copac',
  ENDNOTE_REFER                       : 'end',
  ENDNOTE_TAGGED                      : 'end',
  ENDNOTE                             : 'end',
  ENDNOTE_XML                         : 'endx',
  ISI_WEB_OF_SCIENCE                  : 'isi',
  ISI                                 : 'isi',
  PUBMED_XML                          : 'med',
  PUBMED                              : 'med',
  METADATA_OBJECT_DESCRIPTION_SCHEMA  : 'xml',
  MODS                                : 'xml',
  RIS_RESEARCH_INFORMATION_SYSTEMS    : 'ris',
  RIS                                 : 'ris',
};

bibutils.formats.constants.to = {
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
};
```

Example use of constants to convert from RIS to ADS.

```javascript
var convertFrom = bibutils.formats.constants.from.RIS_RESEARCH_INFORMATION_SYSTEMS;
var convertTo = bibutils.formats.constants.to.NASA_ASTROPHYSICS_DATA_SYSTEM;
```

### Identifier via Human Readable Name

It's quite likely that you may want a user to be able to select the format.
`bibutils.js` provides a set of human readable values that you can access for this
purpose.

`.formats.human.from` and `.formats.human.to` are the same as the
`.formats.constants.from` and `.formats.constants.to` objects,
but with duplicates removed and with the key set to a human readable string.

This makes it perfect for displaying to the user;
You can get the human readable list with `Object.keys()`,
allow the user to select them in a dropdown,
and then acquire the correct format for use in the `.convert()` function.

```javascript
var humanReadable = Object.keys(bibutils.formats.human.to);
// => ['ADS Tagged Format', 'BibTeX', 'EndNote', 'ISI', ...]
var selection = humanReadable[1];
var bibtexIdentifier = bibutils.formats.human.to[selection];
```

### Identifier via MIME types

In some scenarios, the only thing you know about the data you have is it's
MIME type.

`bibutils.js` contains a mapping from MIME type to format that you
can try to use. This is `.formats.mime`.

```javascript
var endnoteIdentifier = bibutils.formats.mime['application/x-endnote-library'];
var isiIdentifier = bibutils.formats.mime['application/x-inst-for-scientific-info'];
```

If the correct MIME type isn't given (returning incorrect identifier),
or if `bibutils.js` doesn't know about the MIME type (returns `undefined`),
this could easily fail. Thus, accessing via MIME type is not a recommended
method of indentifier acquisition.

Additionally, not all formats have a unique MIME type.
In the case of a MIME type that has multiple associated possible formats,
an array of these is returned:

```javascript
var xmlIdentifers = bibutils.formats.mime['application/xml'];
// => ['endx','ebi','med','wordbib','xml']
```

`bibutils.js` does not currently have a specific MIME type for
the ADS Tagged Format, EBI XML format, COPAC formatted reference,
or the Word 2007 Bibliography format.

If you know of one, please submit a pull request with an appropriate reference!

`bibutils.js` holds the following mapping:

```javascript
bibutils.formats.mime = {
  'application/x-bibtex'                      : ['bib', 'biblatex'],
  'application/x-endnote-library'             : 'endx',
  'application/x-endnote-refer'               : 'end',
  'text/x-pubmed'                             : 'med',
  'application/nbib'                          : 'nbib',
  'application/x-inst-for-scientific-info'    : 'isi',
  'application/x-research-info-systems'       : 'ris',
  'application/mods+xml'                      : 'xml',
  //Nonstandard ones
  'application/xml'                           : ['ebi','endx','med','wordbib','xml'],
  'text/plain'                                : ['ads','bib','biblatex','copac','end','isi','nbib','ris'],
  'text/x-bibtex'                             : 'bib',
  'text/x-endnote-library'                    : 'endx',
  'text/x-endnote-refer'                      : 'end',
  'text/mods+xml'                             : 'xml',
  'text/x-research-info-systems'              : 'ris',
  'text/x-inst-for-scientific-info'           : 'isi',
  //Nature uses this
  'text/application/x-research-info-systems'  : 'ris',
  //Cell uses this
  'text/ris'                                  : 'ris',
};
```

### Identifier via File Extensions

As with MIME types, in some scenarios, the only thing you know
about your strings' format is the extension of the file it was read from.

`bibutils.js` contains a mapping from file extension to format that you can use.
This is `.formats.extension`.

```javascript
// Convert from BibTex to ISI
var convertFrom = bibutils.formats.extension['.bib'];
var convertTo = bibutils.formats.extension['.isi'];
```

Additionally, not all formats have a unique MIME type.
In the case of a MIME type that has multiple associated possible formats,
an array of these is returned:

```javascript
var xmlIdentifers = bibutils.formats.extension['.xml'];
// => ['endx','ebi','med','wordbib','xml']
```

`bibutils.js` does not currently have a specific extension for
the COPAC formatted reference. `.txt` is assumed.

If you know of one, please submit a pull request with an appropriate reference!

`bibutils.js` holds the following mapping:

```javascript
bibutils.formats.extension = {
  '.ads'      : 'ads',
  '.bib'      : ['bib','biblatex'],
  '.end'      : 'end',
  '.isi'      : 'isi',
  '.nbib'     : 'nbib',
  '.ris'      : 'ris',
  '.xml'      : ['endx','ebi','med','wordbib','xml'],
  //copac unknown - default to .txt
  '.txt'      : 'copac',
};
```

## Change Binary Path

If you want to use a different set of BibUtils binaries, you can set the path to them
using the exported function 'setBinaryPath'.

```javascript
bibutils.setBinaryPath('/usr/bin');
```

By default, using a custom path will not use a binary extension. If you need to set it
you can by using the second parameter.

```javascript
bibutils.setBinaryPath('C:\\BibUtils', '.exe');
```

## Tests

To run the test suite, first install the dependencies, then run `npm test`:

```bash
$ npm install
$ npm test
```

## Versions and Operating Systems

`bibutils.js` should work on Linux, OSX, and Windows.
It packages the `bibutils` binaries in 64bit Linux, 64bit OSX, and 32bit Windows.

## People

The writer of the [bibutils](https://sourceforge.net/p/bibutils/home/Bibutils/)
[program set](http://bibutils.refbase.org/)
is [Chris Putnam](https://sourceforge.net/u/cdputnam/profile/).

The writer of this nodejs module is [Jet Holt](https://github.com/Jetroid).

[List of all contributors](https://github.com/Jetroid/bibutils.js/graphs/contributors)

## Licenses

This module contains both code licensed under [GPL-2.0](GPL_LICENSE) and
[MIT](MIT_LICENSE).

The code licensed under GPL-2.0 is contained in the `/bibutils/` folder.
That is, unmodified, compiled binaries of Chris Putnam's `bibutils` program set.
The source code to these binaries is included in `/bibutils/` as a gzipped source tarball,
complying with the GPL-2.0 License.

The code licensed under MIT is the node.js code, that is,
all code but that found in the `/bibutils/` folder.

The MIT-licensed code included in `bibutils.js`
 * has not modified Chris Putnam's `bibutils` source code
 * does not contain any of Chris Putnam's `bibutils` source code
 (that is to say `bibutils.js` is not statically nor dynamically linked to `bibutils`)
 * executes Chris Putnam's `bibutils` compiled binaries
 as seperate processes (ie fork-exec) with their own address spaces,
 and does not establish intimate communication (sharing internal data structures)
 * can exist and (barring the `.convert` functionality)
 continue to operate without the `bibutils` binary

...therefore we believe that `bibutils.js` is not considered a 'derivate work'
of `bibutils` as defined in the GPL-2.0 license.
(`bibutils.js` does not contain `bibutils` as a whole or in part as an executable,
and has made no modifications.)

The non-`bibutils` code and the `bibutils` code are considered
[different programs](https://www.gnu.org/licenses/old-licenses/gpl-2.0-faq.html#GPLPlugins).
`bibutils.js` could be said to execute `bibutils` programs as plugins to enhance
`bibutils.js`'s feature set.

`bibutils.js` and `bibutils` are
[merely aggregated](https://www.gnu.org/licenses/old-licenses/gpl-2.0-faq.html#MereAggregation).
They have been distributed together as seperate programs.
