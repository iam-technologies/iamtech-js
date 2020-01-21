import React from 'react';

import constructDiacriticRegext from '../../helpers/strings/diacriticRegex'
import capitalize from '../../helpers/strings/capitalize';
import visualNumber from '../../helpers/strings/visualNumber';

const StringUtils = () => {
  return (
    <div>
      <h1>String utils</h1>
      <hr/>
      <h2>Construct diacritic regext</h2>
      <p>For a text search like: "Camión" replaces every vowel with a regex that searches for all possibilities of accents</p>
      <p>{constructDiacriticRegext('camión')}</p>
      <p>usage: <span class="code">constructDiacriticRegext('camión')</span></p>
      <hr />
      <h2>Capitalize word</h2>
      <p>Puts the first character of a string as uppercase letting the rest as lowercase</p>
      <p>Capitalize "hoja de papel": {capitalize('hoja de papel')}</p>
      <p>usage: <span class="code">capitalize('hoja de papel')</span></p>
      <hr />
      <h2>Visual number</h2>
      <p>Returns a number nicely represented as string. By default the thousand separator is a dot and the decimal separator a comma</p>
      <p>Example 1 "123456": {visualNumber(123456)} -> usage: <span class="code">visualNumber(123456)</span></p>
      <p>Example 2 "1234.56": {visualNumber(1234.56)} -> usage: <span class="code">visualNumber(1234.56)</span></p>
      <p>Example 3 (separators changed) "1234,56": {visualNumber('1234,56', '.', ',')} -> usage: <span class="code">visualNumber('1234,56', '.', ',')</span></p>      
    </div>
  );
}
 
export default StringUtils;