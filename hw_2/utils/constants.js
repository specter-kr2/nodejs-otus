const path = require("path");

const root = path.join(__dirname, '../');

const pathToFile = root + "/file.txt";
const pathToChunks = root + "/sorted_chunks";
const symbolsInNumber = 9;
const waterMark = 500000 * symbolsInNumber;
const pathToResult = root + "/result.txt";

module.exports = {
  pathToFile,
  pathToChunks,
  waterMark,
  pathToResult,
  symbolsInNumber,
};
