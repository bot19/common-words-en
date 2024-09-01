import { wordsFrequncyList } from "./imports/wordsFrequncyList.mjs";
import { wordsAlanBeale } from "./imports/wordsAlanBeale.mjs";
import { wordsBanned } from "./lists/wordsBanned.mjs";
import { wordsWhitelist } from "./lists/wordsWhitelist.mjs";
import { readFile, writeFile, appendFile, unlink } from "fs/promises";

// combine word lists
const wordsString = wordsFrequncyList + "," + wordsAlanBeale;

// make into array to sort
const wordsArr = wordsString.split(",");

// const totalWords = wordsArr.length; // should be 9800

// array of objects with words separated by length
const wordsByLength = [];

// array of blacklisted words (gets populated)
const wordsBlacklist = [];

// populate word objects by length
wordsArr.forEach((word) => {
  const wordLength = word.length;

  // 1st time is undefined, need to create object
  if (!wordsByLength[wordLength])
    wordsByLength[wordLength] = { wordLength, count: 0, words: [] };

  wordsByLength[wordLength].words.push(word);
});

// filter word list of these bad/weird words (add to blacklist)
// returns TRUE if word is good/can be included
const filterConditions = (word) => {
  // don't want any of these words
  if (wordsBanned.includes(word)) {
    wordsBlacklist.push(word);
    return false;
  }

  // don't want any words with this as part of it, ie: bullshit
  if (
    word.indexOf(".") > -1 ||
    word.indexOf(" ") > -1 ||
    word.indexOf("fuck") > -1 ||
    word.indexOf("shit") > -1
  ) {
    wordsBlacklist.push(word);
    return false;
  }

  // want some words with "-" in it
  if (word.indexOf("-") > -1 && !wordsWhitelist.includes(word)) {
    wordsBlacklist.push(word);
    return false;
  }

  return true;
};

// provide count for each words object & organise/sort/clean words
wordsByLength.forEach((wordsObject) => {
  // make all words lowercase
  const wordsLowerCase = wordsObject.words.map((word) => word.toLowerCase());

  // sort alphabetical, use this for large arrays
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator
  const wordsSorted = wordsLowerCase.sort(new Intl.Collator().compare);

  // remove duplicates
  const wordsUnique = [...new Set(wordsSorted)];

  wordsObject.words = wordsUnique.filter((word) => filterConditions(word));

  // get count after all the word processing
  wordsObject.count = wordsObject.words.length;
});

// console.log("wordsByLength", wordsByLength);

// Convert to JSON with pretty print
const wordsList = JSON.stringify(wordsByLength, null, 2);
const blackList = JSON.stringify(wordsBlacklist, null, 2);

// writing to a file
async function writeFileOutputWords() {
  try {
    await writeFile("output-words.json", wordsList);
    console.log("File has been saved.");
  } catch (err) {
    console.error("Error writing to the file:", err);
  }
}
async function writeFileOutputBanned() {
  try {
    await writeFile("output-blacklist.json", blackList);
    console.log("File has been saved.");
  } catch (err) {
    console.error("Error writing to the file:", err);
  }
}

// RUN below in DIR, it will be in output.json (above)
// node process-words.mjs
writeFileOutputWords();
writeFileOutputBanned();

/**
 * then copy the output in the .json file & paste in chrome devTools
 *
 * var output = JSON.stringify(<paste>)
 * console.log(JSON.parse(output))
 *
 * copy the output in devTools into the file below:
 * make a new file /output/output-cleaned-vX.js
 *
 * on save, it'll re-format to a valid js data object
 */
