const SCORE_FAIR = 'fair';
const SCORE_HARD = 'hard';
const SCORE_NOT = 'not';
const SCORE_POOR = 'poor';

const VOWELS = ['A','E','I','O','U','Y'];
const ALLOWED = new Set(["AI", "AY", "EA", "EE", "EO", "IO", "OA", "OO", "OY", "YA", "YO", "YU", "BL", "BR", "CH", "CK", "CL", "CR", "DR", "FL", "FR", "GH", "GL", "GR", "KL", "KR", "KW", "PF", "PL", "PR", "SC", "SCH", "SCR", "SH", "SHR", "SK", "SL", "SM", "SN", "SP", "SQ", "ST", "SW", "TH", "THR", "TR", "TW", "WH", "WR"]);
const POOR_CONSECUTIVE_LETTERS_COUNT = 2;

/*
 * @param {string} input
 * @param {string} word
 * @return {score string}
 */
function getScrambleScore(input, word) {
  input.toUpperCase();
  word.toUpperCase();

  if (input.length < 2
      ||input.length !== word.length
      || input === word
      || input.split('').sort().join('') !== word.split('').sort().join('')) {
        return SCORE_NOT;
  }
  if (!isContainVowels(input)) {
    return SCORE_NOT;
  }
  const isReal = isLooksReal(input);
  if (isReal && isHard(input, word)) {
    return SCORE_HARD;
  }
  if (!isReal && isPoor(input, word)) {
    return SCORE_POOR;
  }
  return SCORE_FAIR;
}

/*
 * @param {string} input
 * @return {boolean}
 */
function isContainVowels(input) {
  for (let i = 0; i < VOWELS.length; i++) {
    if (input.includes(VOWELS[i])) {
      return true;
    }
  }
  return false;
}

/*
 * @param {string} input
 * @return {boolean}
 */
function isLooksReal(input) {
  for (let i = 1; i < input.length; i++) {
    const prev = input[i - 1];
    const cur = input[i];
    const isPrevVowel = VOWELS.includes(prev);
    const isCurVowel = VOWELS.includes(cur);
    if (ALLOWED.has(prev + cur)
        || (isPrevVowel && !isCurVowel)
        || (!isPrevVowel && isCurVowel)
    ) {
      continue;
    }
    return false;
  }
  return true;
}

/*
 * @param {string} input
 * @param {string} word
 * @param {boolean} isReal
 * @return {boolean}
 */
function isPoor(input, word, isReal) {
  return input[0] === word[0]
    || getConsecutiveLettersCount(input, word) === POOR_CONSECUTIVE_LETTERS_COUNT;
}

/*
 * @param {string} input
 * @param {string} word
 * @return {boolean}
 */
function isHard(input, word) {
  return getConsecutiveLettersCount(input, word) === 0;
}

/*
 * @param {string} input
 * @param {string} word
 * @return {number}
 */
function getConsecutiveLettersCount(input, word) {
  return input.split('').filter((char, position) => word[position] === char).length;
}

/*
 * @param {array} arr
 * @return {array}
 */
function printScrambleScoreByArr(arr) {
  return arr.map(str => {
    const ar = str.split(' ');
    const input = ar[0];
    const output = ar[1];
    const score = getScrambleScore(input, output);
    if (score === SCORE_NOT) {
      return input + ' is ' + score + ' a scramble of ' + output;
    }
    return input + ' is a ' + score + ' scramble of ' + output;
  });
}

console.log('Scramble test cases: ');

const TEST_INPUT = [
  'MAPS SPAM',
  'RIONY IRONY',
  'ONYRI IRONY',
  'IRONY IRONY',
  'INOYR IRONY',
  'IOYRN IRONY',
];

const EXPECTED_OUTPUT = [
  'MAPS is a fair scramble of SPAM',
  'RIONY is a fair scramble of IRONY',
  'ONYRI is a hard scramble of IRONY',
  'IRONY is not a scramble of IRONY',
  'INOYR is a fair scramble of IRONY',
  'IOYRN is a poor scramble of IRONY',
];

console.log('It should return EXPECTED_OUTPUT:', JSON.stringify(printScrambleScoreByArr(TEST_INPUT)) === JSON.stringify(EXPECTED_OUTPUT) ? 'PASS' : 'FAIL');
console.log('It should return not for SWR-WSR:', getScrambleScore('SWR', 'WSR') === SCORE_NOT ? 'PASS' : 'FAIL');
console.log('It should return not for SW-WS:', getScrambleScore('SW', 'WS') === SCORE_NOT ? 'PASS' : 'FAIL');
console.log('It should return not same word:', getScrambleScore('IRONY', 'IRONY') === SCORE_NOT ? 'PASS' : 'FAIL');
console.log('It should return not empty:', getScrambleScore('', '') === SCORE_NOT ? 'PASS' : 'FAIL');
console.log('It should return not for "":', getScrambleScore('', 'IRONY') === SCORE_NOT ? 'PASS' : 'FAIL');
console.log('It should return not for IRONYY:', getScrambleScore('IRONYY', 'IRONY') === SCORE_NOT ? 'PASS' : 'FAIL');
console.log('It should return poor for IOYRN:', getScrambleScore('IOYRN', 'IRONY') === SCORE_POOR ? 'PASS' : 'FAIL');
console.log('It should return hard for ONYRI:', getScrambleScore('ONYRI', 'IRONY') === SCORE_HARD ? 'PASS' : 'FAIL');
console.log('It should return fair for MAPS:', getScrambleScore('MAPS', 'SPAM') === SCORE_FAIR ? 'PASS' : 'FAIL');
console.log('It should return fair for RIONY:', getScrambleScore('RIONY', 'IRONY') === SCORE_FAIR ? 'PASS' : 'FAIL');
console.log('It should return fair for INOYR:', getScrambleScore('INOYR', 'IRONY') === SCORE_FAIR ? 'PASS' : 'FAIL');
