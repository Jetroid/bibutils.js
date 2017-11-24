This module is a node wrapper of Chris Putnam's bitutils program set.

Convert between several bibliography formats.

```javascript
var bibutils = require('bibutils');

var convertFrom = bibutils.from.BIBTEX;
var convertTo = bibutils.to.ENDNOTE;
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

* ADS - [NASA Astrophysics Data System](https://en.wikipedia.org/wiki/Astrophysics_Data_System)
* BibTeX
* EndNote
* [ISI Web of Science](http://wiki.cns.iu.edu/pages/viewpage.action?pageId=1933374)
* [MODS](http://www.loc.gov/standards/mods/)
* RIS
* Word 2007 Bibliography

## Quick Start

Install the module to your project:

```
$ npm install bibutils.js
```

Include the module in your project:

```
var bibutils = require('bibutils');
```

Select the appropriate constants for your required conversion from
[the constants section](#constants).

```
var convertFrom = bibutils.from.BIBTEX;
var convertTo = bibutils.to.ENDNOTE;
```

Write a callback to be called when conversion is completed.
`data` is the converted bibliography as a string.

```
var callback = function (data) {
  console.log(data);
};
```

Replacing `myCitationString` with your citation string object,
call the conversion:

```
bibutils.convert(convertFrom, convertTo, myCitationString, callback);
```

## Constants

`bibutils.js` does not determine the format of your string when converting.
You must specify to the program which format you are converting from,
and which format you are converting to.

`bibutils.js` exposes the formats it accepts with the `.formats` variable.

`.formats.from` is an object of all pairings that `bibutils` can convert from:

```
bibutils.formats.from = {
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
}
```

`.formats.to` is an object of all pairings that `bibutils` can convert to:

```
bibutils.formats.to: {
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
```

It is recommended that you use the keys inside these objects when communicating
with bibutils.js.

For example, if you wanted to convert from RIS to the Nasa Astrophysics Data System,
it is recommended that you do

```
var convertFrom = bibutils.formats.from.RIS_RESEARCH_INFORMATION_SYSTEMS;
var convertTo = bibutils.formats.to.NASA_ASTROPHYSICS_DATA_SYSTEM;
```

or 

```
var convertFrom = bibutils.formats.from.RIS;
var convertTo = bibutils.formats.to.ADS;
```

but not

```
var convertFrom = 'ris';
var convertTo = 'ads';
```

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
