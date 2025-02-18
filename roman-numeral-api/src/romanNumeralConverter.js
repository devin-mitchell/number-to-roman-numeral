/**
  This function will take a number between 1 and 3999 and convert it to a roman numeral.

  Loop through 'lookup' keys
    while the 'number to convert' is >= the current iterations value
      - add the roman numeral to the result string
      - subtract the current iterations value from the 'number to convert'

  @param {number} num - number to convert
  @returns {string} Roman numeral conversion of the inputted number
*/
function romanNumeralConverter(num) {
  // Edgecase for invalid numbers
  if (num < 1 || num > 3999) return 'Invalid number';

  // Map of Roman Numerals and their Hindu-Arabic counterparts
  const lookup = {
    M: 1000, 
    CM: 900, 
    D: 500, 
    CD: 400,
    C: 100, 
    XC: 90, 
    L: 50, 
    XL: 40,
    X: 10, 
    IX: 9, 
    V: 5, 
    IV: 4, 
    I: 1
  };

  let roman = '';
  for (let key in lookup) {
    while (num >= lookup[key]) {
      roman += key;
      num -= lookup[key];
    }
  }

  return roman;
}

module.exports = { romanNumeralConverter };

{/*
  example: romanNumeralConverter(18)

  1. 18 >= 10
      - roman = 'X'
      - num = 18 - 10
  2. 8 >= 5
      - roman = 'XV'
      - num = 8 - 5
  3. 3 >= 1
      - roman = 'XVI'
      - num = 3 - 1
  4. 2 >= 1
      - roman = 'XVII'
      - num = 2 - 1
  5. 1 >= 1
      - roman = 'XVIII'
      - num = 1 - 1


  return 'XVIII'
*/}
