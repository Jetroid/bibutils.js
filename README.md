This module is a node wrapper of Chris Putnam's bitutils program set.

Convert between several bibliography formats.

```javascript
var bibutils = require('bibutils.js');

var convertFrom = bibutils.formats.from.BIBTEX;
var convertTo = bibutils.formats.to.ENDNOTE;
bibutils.convert(convertFrom, convertTo, myCitationString, function (data) {
  console.log(data);	
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

Allows conversion between various bibliography formats, using the 
[Library of Congress](https://www.loc.gov/)'s 
[Metadata Object Description Schema](http://www.loc.gov/standards/mods/)
(MODS) version 3.1 as an intermediate format.

Conversion is supported from the following formats:

* BibTeX
* [COPAC](http://copac.jisc.ac.uk/help/export-help.html#tagged)
* EndNote
* EndNote XML
* [ISI Web of Science](http://wiki.cns.iu.edu/pages/viewpage.action?pageId=1933374)
* Pubmed XML
* [MODS](http://www.loc.gov/standards/mods/)
* RIS

Conversion is supported to the following formats:

* ADS - [NASA Astrophysics Data System](https://en.wikipedia.org/wiki/Astrophysics_Data_System) [Tagged Format](http://doc.adsabs.harvard.edu/abs_doc/help_pages/taggedformat.html)
* BibTeX
* EndNote
* [ISI Web of Science](http://wiki.cns.iu.edu/pages/viewpage.action?pageId=1933374)
* [MODS](http://www.loc.gov/standards/mods/)
* RIS
* Word 2007 Bibliography

## Quick Start

Install the module to your project:

```javascript
$ npm install bibutils.js
```

Include the module in your project:

```javascript
var bibutils = require('bibutils.js');
```

Select the appropriate format for your required conversion from
[the formats section](#format-specification).

```javascript
var convertFrom = bibutils.formats.from.BIBTEX;
var convertTo = bibutils.formats.to.ENDNOTE;
```

Write a callback to be called when conversion is completed.
`data` is the converted bibliography as a string.

```javascript
var callback = function (data) {
  console.log(data);
};
```

Replacing `myCitationString` with your citation string object,
call the conversion:

```javascript
bibutils.convert(convertFrom, convertTo, myCitationString, callback);
```

## Format Specification

`bibutils.js` does not automatically determine which format you have given it.
You must specify to the program which format you are converting from,
and which format you are converting to.

`bibutils.js` exposes the formats it accepts with the `.formats` variable.

Formats can be specified [using constants](#format-via-constants),
or (in some cases) can be determined from MIME type or file extension.

### Format via Constants

`.formats.from` is an object of all pairings that `bibutils` can convert from:

```javascript
bibutils.formats.from = {
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
```

`.formats.to` is an object of all pairings that `bibutils` can convert to:

```javascript
bibutils.formats.to = {
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

It is recommended that you use the keys inside these objects when communicating
with bibutils.js.

For example, if you wanted to convert from RIS to the Nasa Astrophysics Data System,
it is recommended that you do

```javascript
var convertFrom = bibutils.formats.from.RIS_RESEARCH_INFORMATION_SYSTEMS;
var convertTo = bibutils.formats.to.NASA_ASTROPHYSICS_DATA_SYSTEM;
```

or 

```javascript
var convertFrom = bibutils.formats.from.RIS;
var convertTo = bibutils.formats.to.ADS;
```

but not

```javascript
var convertFrom = 'ris';
var convertTo = 'ads';
```

This allows your application to be resistant to changes in the implementation
of `bibutils`.

### Formats via Human Readable Name

It's quite likely that you may want a user to be able to select the format.
`bibutils` provides a set of human readable values that you can access for this
purpose.

`.formats.from_human` and `.formats.to_human` are the same as the
`.formats.from` and `.formats.to` objects, but with duplicates removed
and with the key set to a human readable string.

This makes it perfect for displaying to the user;
You can get the human readable list with `Object.keys()`,
allow the user to select them in a dropdown, 
and then acquire the correct format for use in the `.convert()` function.

```javascript
var humanReadable = Object.keys(bibutils.formats.to_human);
// => ['ADS Tagged Format', 'BibTex', 'EndNote', 'ISI', ...]
var selection = humanReadable[1];
var convertTo = bibutils.formats.to_human[selection]
```

### Formats via MIME types

In some scenarios, the only thing you know about the string you want
to convert is what it's MIME type is.

`bibutils` contains a mapping from MIME type to format that you
can try to use. This is `.formats.mime2format`

```javascript
// Convert from BibTex to ISI
var convertFrom = bibutils.formats.mime2format['application/x-bibtex'];
var convertTo = bibutils.formats.mime2format['application/x-inst-for-scientific-info'];
```

If the correct MIME type isn't given,
this could easily fail, so is not a recommended method.

```javascript
// Want to convert from MODS
var modsMime = 'application/xml';
// MODS is XML but the correct MIME type is 'application/mods+xml'
var convertFrom = bibutils.formats.mime2format[modsMime];
// 'application/xml' actually means Word 2007 Bibliography.
// The conversion will fail :(
```

`bibutils` does not currently have a specific mime type for
the ADS Tagged Format, COPAC formatted reference,
or the Word 2007 Bibliography format.

If you know of one, please submit a pull request with an appropriate reference!

`bibutils` holds the following mapping:

```javascript
bibutils.formats.mime2format = {
  'application/x-bibtex'                      : 'bib',
  'application/x-endnote-library'             : 'endx',
  'application/x-endnote-refer'               : 'end',
  'text/x-pubmed'                             : 'med',
  'application/mods+xml'                      : 'xml',
  'application/x-research-info-systems'       : 'ris',
  'application/x-inst-for-scientific-info'    : 'isi',
  //Nonstandard ones
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

### Formats via File Extensions

As with MIME types, in some scenarios, the only thing you know
about your strings' format is the extension of the file it was read from.

`bibutils` contains a mapping from file extension to format that you can use.
This is `.formats.extension2format`.

```javascript
// Convert from BibTex to ISI
var convertFrom = bibutils.formats.extension2format['.bib'];
var convertTo = bibutils.formats.extension2format['.isi'];
```

Unfortunately, a few formats share the `.xml` extension.

```javascript
var convertFrom = bibutils.formats.extension2format['.xml'];
// convertFrom now equals `['endx','med','wordbib','xml']`
```

`bibutils` does not currently have a specific extension for
the ADS Tagged Format, or the COPAC formatted reference.

If you know of one, please submit a pull request with an appropriate reference!

`.txt` is used for these values.

```javascript
var convertFrom = bibutils.formats.extension2format['.txt'];
// convertFrom now equals `['ads','copac']`
```

`bibutils` holds the following mapping:

```javascript
bibutils.formats.extension2format = {
  '.bib'      : 'bib',
  '.end'      : 'end',
  '.ris'      : 'ris',
  '.xml'      : ['endx','med','wordbib','xml'],
  '.isi'      : 'isi',
  //ads and copac unknown - default to .txt
  '.txt'      : ['ads','copac']
};
```

## Metadata Specification

Similar to the [Format Specification](#format-specification) above,
`bibutils` provides a way to apply MIME type and get the file extension for the
converted result.

This is provided by the `.formats.format2mime` and `.formats.format2extension`
objects.

```javascript
// Get MIME type and extension for ISI result
var convertTo = bibutils.formats.to.ISI;
var mimeType = bibutils.formats.format2mime[convertTo];
var extension = bibutils.formats.format2extension[convertTo];
```

As discussed above, `bibutils` does not currently have a specific mime type for
the ADS Tagged Format, COPAC formatted reference, or the Word 2007 Bibliography
format. It also does not currently have a specific extension for
the ADS Tagged Format, or the COPAC formatted reference.

If you know of these, please submit a pull request with an appropriate reference!

## Tests

  To run the test suite, first install the dependencies, then run `npm test`:

```bash
$ npm install
$ npm test
```

## Versions and Operating Systems

`bibutils.js` should work on Linux, OSX, and Windows. It has been tested on Linux.

The current binaries are taken from the [refbase entry](http://bibutils.refbase.org/),
and so this module currently supports version 3.4 of `bibutils`.

## People

The original writer of the [bibutils](https://sourceforge.net/p/bibutils/home/Bibutils/)
[program set](http://bibutils.refbase.org/)
is [Chris Putnam](https://sourceforge.net/u/cdputnam/profile/).

The writer of this nodejs module is [Jet Holt](https://github.com/Jetroid).

[List of all contributors](https://github.com/Jetroid/bibutils.js/graphs/contributors)

## License

  [GPL-3.0](LICENSE)
  
## FAQ

### Can you relicense under something not GPL?

Nope, I can't even if I wanted to. 

The set of programs that this module wraps are released under GPL and therefore
so is this module.

### Can you update to a newer version of bibutils? 

Yes, we're on version 3.4, and yes 
[newer versions are available](https://sourceforge.net/projects/bibutils/files/).

The binaries used here are taken from the [refbase entry](http://bibutils.refbase.org/)
which is at version 3.4; sourceforge does not provide compiled binaries.

I can only generate the binaries for Linux, and would not like any platform 
to use a different version to any other platform. 

If you're able to generate the latest binaries for OSX and Windows,
feel free to leave a pull request.
