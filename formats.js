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
const formats = Object.freeze({
  from: {
    constants: {
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
    human: {
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
  },
  to: {
    constants: {
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
    human: {
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
    'application/x-bibtex'                      : 'bib',
    'application/x-endnote-library'             : 'endx',
    'application/x-endnote-refer'               : 'end',
    'text/x-pubmed'                             : 'med',
    'application/nbib'                          : 'nbib',
    'application/x-inst-for-scientific-info'    : 'isi',
    'application/x-research-info-systems'       : 'ris',
    'application/mods+xml'                      : 'xml',
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
  humanReadable: {
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
