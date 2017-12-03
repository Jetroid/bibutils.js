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
module.exports = Object.freeze({
  from: {
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
    RIS                                 : 'ris'
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
  format2mime: {
    //unknown
    'ads'     : 'text/plain',
    'bib'     : 'application/x-bibtex',
    //unknown
    'copac'   : 'text/plain',
    'end'     : 'application/x-endnote-refer',
    'endx'    : 'application/x-endnote-library',
    'isi'     : 'application/x-inst-for-scientific-info',
    'med'     : 'text/x-pubmed',
    'ris'     : 'application/x-research-info-systems',
    //unknown if there is a specific one
    'wordbib' : 'application/xml',
    'xml'     : 'application/mods+xml',
  },
  mime2format: {
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
  },
  extension2format: {
    '.bib'      : 'bib',
    '.end'      : 'end',
    '.ris'      : 'ris',
    '.xml'      : ['endx','med','wordbib','xml'],
    '.isi'      : 'isi',
    //ads and copac unknown - default to .txt
    '.txt'      : ['ads','copac']
  },
  format2extension: {
    //ads unknown - default to .txt
    'ads'     : '.txt',
    'bib'     : '.bib',
    //copac unknown - default to .txt
    'copac'   : '.txt',
    'end'     : '.end',
    'endx'    : '.xml',
    'isi'     : '.isi',
    'med'     : '.xml',
    'ris'     : '.ris',
    'wordbib' : '.xml',
    'xml'     : '.xml',
  }
});
