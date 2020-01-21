const diacritics_replacements = {
  a: '(à|á|a)+',
  e: '(è|é|e)+',
  i: '(ì|í|i)+',
  o: '(ò|ó|o)+',
  u: '(ù|ú|u)+',
  c: '(ç|c)+',
  n: '(ñ|n)+'
};

export default function constructDiacriticRegext(text) {
  for (var textResult = [], index = 0; index < text.length; index++) {
    var t = text.charAt(index);
    diacritics_replacements.hasOwnProperty(t) ? textResult.push(diacritics_replacements[t]) : textResult.push(t);
  }
  return textResult.join('');
}
