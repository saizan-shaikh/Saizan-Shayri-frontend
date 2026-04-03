/**
 * Simple Phonetic Transliteration Utility
 * Roman Urdu to Hindi (Devanagari) and Urdu Scripts
 * Note: This is an approximation based on common phonetic mappings.
 */

const romanToHindiMap = {
  'a': 'अ', 'aa': 'आ', 'i': 'इ', 'ee': 'ई', 'u': 'उ', 'oo': 'ऊ',
  'e': 'ए', 'ai': 'ऐ', 'o': 'ओ', 'au': 'औ',
  'k': 'क', 'kh': 'ख', 'g': 'ग', 'gh': 'घ',
  'ch': 'च', 'chh': 'छ', 'j': 'ज', 'jh': 'झ',
  't': 'त', 'th': 'थ', 'd': 'द', 'dh': 'ध',
  'n': 'न', 'p': 'प', 'ph': 'फ', 'f': 'फ़', 'b': 'ब', 'bh': 'भ', 'm': 'म',
  'y': 'य', 'r': 'र', 'l': 'ल', 'v': 'व', 'w': 'व',
  'sh': 'श', 's': 'स', 'h': 'ह', 'z': 'ज़', 'q': 'क़',
};

const romanToUrduMap = {
  'a': 'ا', 'aa': 'آ', 'b': 'ب', 'p': 'پ', 't': 'ت', 's': 'س', 'j': 'ج', 
  'ch': 'چ', 'h': 'ح', 'kh': 'خ', 'd': 'د', 'z': 'ز', 'r': 'ر', 'zh': 'ژ', 
  'sh': 'ش', 'f': 'ف', 'q': 'ق', 'k': 'ک', 'g': 'گ', 'l': 'ل', 'm': 'م', 
  'n': 'ن', 'w': 'و', 'y': 'ی', 'v': 'و', 'e': 'ے', 'o': 'و', 'i': 'ی'
};

export const transliterate = (text, targetLang) => {
  if (targetLang === 'roman') return text;
  
  let result = text.toLowerCase();
  const map = targetLang === 'hindi' ? romanToHindiMap : romanToUrduMap;
  
  // Sort keys by length descending to match longer strings first (e.g., 'kh' before 'k')
  const keys = Object.keys(map).sort((a, b) => b.length - a.length);
  
  // This is a very basic replacement; real transliteration is more complex
  // but this fulfills "Script Only" requirement without translation.
  keys.forEach(key => {
    const regex = new RegExp(key, 'g');
    result = result.replace(regex, map[key]);
  });
  
  return result;
};
