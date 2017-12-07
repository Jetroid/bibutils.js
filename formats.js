/*
Copyright (C) 2017 Jet Holt

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
const formats = Object.freeze({
  constants: {
    from: {
      BIBTEX                              : 'bib',
      BIBLATEX                            : 'biblatex',
      COPAC                               : 'copac',
      EBI                                 : 'ebi',
      ENDNOTE_REFER                       : 'end',
      ENDNOTE_TAGGED                      : 'end',
      ENDNOTE                             : 'end',
      ENDNOTE_XML                         : 'endx',
      ISI_WEB_OF_SCIENCE                  : 'isi',
      ISI                                 : 'isi',
      PUBMED_XML                          : 'med',
      PUBMED                              : 'med',
      NBIB                                : 'nbib',
      PUBMED_NBIB                         : 'nbib',
      RIS_RESEARCH_INFORMATION_SYSTEMS    : 'ris',
      RIS                                 : 'ris',
      WORD_2007_BIBLIOGRAPHY              : 'wordbib',
      WORDBIB                             : 'wordbib',
      METADATA_OBJECT_DESCRIPTION_SCHEMA  : 'xml',
      MODS                                : 'xml',
    },
    to: {
      NASA_ASTROPHYSICS_DATA_SYSTEM       : 'ads',
      ADS                                 : 'ads',
      BIBTEX                              : 'bib',
      ENDNOTE                             : 'end',
      ENDNOTE_REFER                       : 'end',
      ENDNOTE_TAGGED                      : 'end',
      ISI_WEB_OF_SCIENCE                  : 'isi',
      ISI                                 : 'isi',
      RIS_RESEARCH_INFORMATION_SYSTEMS    : 'ris',
      RIS                                 : 'ris',
      WORD_2007_BIBLIOGRAPHY              : 'wordbib',
      WORDBIB                             : 'wordbib',
      METADATA_OBJECT_DESCRIPTION_SCHEMA  : 'xml',
      MODS                                : 'xml',
    },
  },
  human: {
    from: {
      'BibTeX'                  : 'bib',
      'BibLaTeX'                : 'biblatex',
      'Copac'                   : 'copac',
      'EBI XML'                 : 'ebi',
      'EndNote'                 : 'end',
      'EndNote XML'             : 'endx',
      'ISI'                     : 'isi',
      'PubMed'                  : 'med',
      'NBIB MEDLINE'            : 'nbib',
      'RIS'                     : 'ris',
      'Word 2007 Bibliography'  : 'wordbib',
      'MODS'                    : 'xml',
    },
    to: {
      'ADS Tagged Format'       : 'ads',
      'BibTeX'                  : 'bib',
      'EndNote'                 : 'end',
      'ISI'                     : 'isi',
      'RIS'                     : 'ris',
      'Word 2007 Bibliography'  : 'wordbib',
      'MODS'                    : 'xml',
    },
  },
  mime: {
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
  },
  extension: {
    '.ads'      : 'ads',
    '.bib'      : ['bib','biblatex'],
    '.end'      : 'end',
    '.isi'      : 'isi',
    '.nbib'     : 'nbib',
    '.ris'      : 'ris',
    '.xml'      : ['endx','ebi','med','wordbib','xml'],
    //copac unknown - default to .txt
    '.txt'      : 'copac',
  },
});
const metadata = Object.freeze({
  mime: {
    //unknown
    'ads'       : 'text/plain',
    'bib'       : 'application/x-bibtex',
    'biblatex'  : 'application/x-bibtex',
    //unknown
    'copac'     : 'text/plain',
    //unknown
    'ebi'       : 'application/xml',
    'end'       : 'application/x-endnote-refer',
    'endx'      : 'application/x-endnote-library',
    'isi'       : 'application/x-inst-for-scientific-info',
    'med'       : 'text/x-pubmed',
    'nbib'      : 'application/nbib',
    'ris'       : 'application/x-research-info-systems',
    //unknown if there is a specific one
    'wordbib'   : 'application/xml',
    'xml'       : 'application/mods+xml',
  },
  extension: {
    'ads'     : '.ads',
    'bib'     : '.bib',
    'biblatex': '.bib',
    //copac unknown - default to .txt
    'copac'   : '.txt',
    //ebi unknown - default to .xml
    'ebi'     : '.xml',
    'end'     : '.end',
    'endx'    : '.xml',
    'isi'     : '.isi',
    'med'     : '.xml',
    'nbib'    : '.nbib',
    'ris'     : '.ris',
    'wordbib' : '.xml',
    'xml'     : '.xml',
  },
  human: {
    'ads'     : 'ADS Tagged Format',
    'bib'     : 'BibTeX',
    'biblatex': 'BibLaTeX',
    'copac'   : 'Copac',
    'ebi'     : 'EBI XML',
    'end'     : 'EndNote',
    'endx'    : 'EndNote XML',
    'isi'     : 'ISI',
    'med'     : 'PubMed',
    'nbib'    : 'NBIB MEDLINE',
    'ris'     : 'RIS',
    'wordbib' : 'Word 2007 Bibliography',
    'xml'     : 'MODS',
  },
});
const sampleBibtexString = '@Article{article,\nauthor="Adams, Peter",\ntitle="The title of the work",\njournal="The name of the journal",\nyear="1993",\nmonth="Jul",\nvolume="4",\nnumber="2",\npages="201--213",\nnote="An optional note"\n}'

module.exports = {
  formats,
  metadata,
  sampleBibtexString,
}
