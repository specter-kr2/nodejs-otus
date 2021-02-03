const { pathToFile, pathToChunks, waterMark } = require("../utils/constants");
const mergeSort = require("../utils/mergeSort");
const fs = require("fs");

function checkChunksDir() {
  if (fs.existsSync(pathToChunks)) {
    fs.rmdirSync(pathToChunks, { recursive: true }, (err) => {
      if (err) {
        throw err;
      }
      console.log(`${pathToChunks} is deleted!`);
    });
  }
  fs.mkdirSync(pathToChunks);
}

function divideToChunks() {
  checkChunksDir();

  return new Promise((resolve, reject) => {
    const readStream = fs.createReadStream(pathToFile, {
      encoding: "utf8",
      highWaterMark: waterMark,
    });

    console.log("start making chunks")

    let counter = 0;
    readStream.on("data", (chunk) => {
      const numbersArr = chunk
        .trim()
        .split(" ")
        .map((v) => +v);
      const sortedChunk = mergeSort(numbersArr);
      const writeStream = fs.createWriteStream(
        pathToChunks + "/chunk" + counter + ".txt"
      );
      writeStream.write(sortedChunk.join(" ") + " ");
      counter += 1;
      writeStream.end();
    });

    readStream.on("end", () => {
      console.log("chunks are done");
      resolve();
    });

    readStream.on("error", (err) => {
      reject(err);
    });
  });
}

module.exports = divideToChunks;
