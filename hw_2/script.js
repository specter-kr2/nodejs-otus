const fs = require("fs");
const {
  pathToChunks,
  pathToResult,
  symbolsInNumber,
} = require("./utils/constants");
const divideToChunks = require("./lib/divideToChunks");

function makeSortedFile() {
  if (fs.existsSync(pathToResult)) {
    fs.unlinkSync(pathToResult);
  }

  return new Promise((resolve, reject) => {
    fs.readdir(pathToChunks, (err, files) => {
      if (err) {
        reject(err);
      }

      console.log("start reading chunks");
      const readStreams = [];
      files.forEach((file) => {
        readStreams.push(
          fs.createReadStream(pathToChunks + "/" + file, {
            highWaterMark: symbolsInNumber,
            encoding: "utf8",
          })
        );
      });

      let chunkValues = [];
      let partOfResult = [];

      readStreams.forEach((stream, ind) => {
        stream.on("data", (chunk) => {
          chunkValues[ind] = +chunk;
          stream.pause();
        });

        stream.on("pause", () => {
          if (readStreams.every((s) => s.isPaused())) {
            const lowIndex = chunkValues.indexOf(
              Math.min.apply(null, chunkValues)
            );
            if (partOfResult.length < 1000000) {
              partOfResult.push(chunkValues[lowIndex]);
            } else {
              fs.appendFileSync(
                pathToResult,
                partOfResult.join(" ").toString() + " "
              );
              partOfResult.length = 0;
            }
            readStreams[lowIndex].resume();
          }
        });

        stream.on("close", () => {
          if (partOfResult.length) {
            fs.appendFileSync(
              pathToResult,
              partOfResult.join(" ").toString() + " "
            );
          }

          console.log("finish successfully");
          resolve();
        });

        stream.on("error", (err) => {
          reject(err);
        });
      });
    });
  });
}

async function run() {
  try {
    await divideToChunks();
    await makeSortedFile();
  } catch (err) {
    console.warn(err);
  }
}

run();
