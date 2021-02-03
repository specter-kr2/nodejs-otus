const fs = require("fs");
const shuffleArray = require("../utils/shuffleArray");
const { pathToFile } = require("../utils/constants");
const numbers = [];

for (let i = 10000000; i < 23000000; i++) {
  numbers.push(i.toString());
}

const resultString = shuffleArray(numbers).join(" ") + " ";

if (fs.existsSync(pathToFile)) fs.rmdirSync(pathToFile);

fs.writeFileSync(pathToFile, resultString, { encoding: "utf8" });

const stats = fs.statSync(pathToFile);
console.log("Created file with Size in Bytes: " + stats.size);
console.log("Created file with Size in MB: " + stats.size / 1000000.0);
