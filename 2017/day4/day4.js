const fs = require('fs');
const path = require('path');

const input = fs.readFileSync(path.join(__dirname, 'day4.txt'), 'utf-8');

const isNonUnique = (word, w) => w === word;

const isValid = (words, word, index, validator) =>
    words.find((w, i) => i !== index && validator(word, w)) === undefined;

const validPassphrases = (input, validator) => input.split('\n')
    .filter(line => line)
    .map(line => line.split(' '))
    .map(words => words.every((word, i) => isValid(words, word, i, validator)))
    .reduce((acc, result) => result ? acc + 1 : acc, 0);

const test1 =
`aa bb cc dd ee
aa bb cc dd aa
aa bb cc dd aaa`;

console.log(validPassphrases(test1, isNonUnique));
console.log(validPassphrases(input, isNonUnique));

const countOccurrences = (word, char) => {
    const occurrences = word.match(new RegExp(char, 'g'));
    return occurrences ? occurrences.length : 0;
}

const isAnagram = (word, w) => word.length === w.length &&
    word.split('').every(c => countOccurrences(word, c) === countOccurrences(w, c));

const test2 =
`abcde fghij
abcde xyz ecdab
a ab abc abd abf abj
iiii oiii ooii oooi oooo
oiii ioii iioi iiio
`;

console.log(validPassphrases(test2, isAnagram));
console.log(validPassphrases(input, isAnagram));
