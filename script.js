const SCORE_FAIR = 'fair';
const SCORE_HARD = 'hard';
const SCORE_NOT = 'not';
const SCORE_POOR = 'poor';

const VOWELS = ['A','E','I','O','U','Y'];
const INGNORE_VOWEL = 'Y';
const ALLOWED = new Set(["AI", "AY", "EA", "EE", "EO", "IO", "OA", "OO", "OY", "YA", "YO", "YU", "BL", "BR", "CH", "CK", "CL", "CR", "DR", "FL", "FR", "GH", "GL", "GR", "KL", "KR", "KW", "PF", "PL", "PR", "SC", "SCH", "SCR", "SH", "SHR", "SK", "SL", "SM", "SN", "SP", "SQ", "ST", "SW", "TH", "THR", "TR", "TW", "WH", "WR"]);
const POOR_CONSECUTIVE_LETTERS_COUNT = 2;

function getScrambleScore(input, word) {
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
  console.log(isReal, 'is real')
  if (isReal && isHard(input, word)) {
    return SCORE_HARD;
  }
  console.log(isPoor(input, word), 'isPoor(input, word)<<<<')
  if (!isReal && isPoor(input, word)) {
    return SCORE_POOR;
  }
  return SCORE_FAIR;
}

function isContainVowels(input) {
  for (let i = 0; i < VOWELS.length; i++) {
    if (input.includes(VOWELS[i])) {
      return true;
    }
  }
  return false;
}

function isLooksReal(input) {
  if (isVowelsAndConsonantsInOrder(input)) {
    return true;
  }
  console.log('should be here <<<')
  for (let i = 1; i < input.length; i++ ) {
    const prev = input[i - 1];
    const cur = input[i];
    if (!VOWELS.includes(cur) && VOWELS.includes(prev)) {
      continue;
    }
    if (!ALLOWED.has(prev + cur)) {
      console.log('Not allowed', prev + cur)
      return false;
    }
  }
  return true;
}

function isVowelsAndConsonantsInOrder(input) {
  // if letters alternate between vowels and consonants
  let isStartWithVowel = VOWELS.includes(input[0]);
  for (let i = 1; i < input.length; i++ ) {
    const prev = input[i - 1];
    const cur = input[i];
    if (isStartWithVowel && (VOWELS.includes(cur) || !VOWELS.includes(prev))) {
      return false;
    }
    if(!isStartWithVowel && (!VOWELS.includes(cur) || VOWELS.includes(prev))) {
      return false;
    }
    isStartWithVowel = !isStartWithVowel;
  }
  return true;
}

function isPoor(input, word) {
  console.log('IS oiir', getConsecutiveLettersCount(input, word))
  return input[0] === word[0]
    || getConsecutiveLettersCount(input, word) === POOR_CONSECUTIVE_LETTERS_COUNT;
}

function isHard(input, word) {
  return getConsecutiveLettersCount(input, word) === 0;
}

function getConsecutiveLettersCount(input, word) {
  return input.split('').filter((char, position) => word[position] === char).length;
}
console.log('It should return fair for INOYR', getScrambleScore('INOYR', 'IRONY'), getScrambleScore('INOYR', 'IRONY') === SCORE_FAIR);

console.log('It should return not for SWR-WSR', getScrambleScore('SWR', 'WSR') === SCORE_NOT);
console.log('It should return not for SW-WS', getScrambleScore('SW', 'WS') === SCORE_NOT);
console.log('It should return not same word', getScrambleScore('IRONY', 'IRONY') === SCORE_NOT);
console.log('It should return not empty', getScrambleScore('', '') === SCORE_NOT);
console.log('It should return not for ""', getScrambleScore('', 'IRONY') === SCORE_NOT);
console.log('It should return not for IRONYY', getScrambleScore('IRONYY', 'IRONY') === SCORE_NOT);
console.log('It should return poor for IOYRN', getScrambleScore('IOYRN', 'IRONY') === SCORE_POOR);
console.log('It should return hard for ONYRI', getScrambleScore('ONYRI', 'IRONY') === SCORE_HARD);
console.log('It should return fair for MAPS', getScrambleScore('MAPS', 'SPAM') === SCORE_FAIR);
console.log('It should return fair for RIONY', getScrambleScore('RIONY', 'IRONY') === SCORE_FAIR);
console.log('It should return fair for INOYR', getScrambleScore('INOYR', 'IRONY') === SCORE_FAIR);
