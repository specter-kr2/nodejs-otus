const fs = require("fs");

const emptySpace = "  ";
const childLine = "└── ";
const firstChildLine = "─── ";
const startTreeSymbol = "│";

function showTree(obj, deepLevel = 0) {
  if (obj.items) {
    if (deepLevel === 1) {
      console.log(startTreeSymbol + firstChildLine + obj.name);
    } else if (deepLevel) {
      console.log(
        startTreeSymbol + emptySpace.repeat(deepLevel) + childLine + obj.name
      );
    } else {
      console.log(obj.name);
    }
    obj.items.forEach((element) => {
      showTree(element, deepLevel + 1);
    });
  } else {
    if (deepLevel === 1) {
      return console.log(startTreeSymbol + firstChildLine + obj.name);
    }
    return console.log(
      startTreeSymbol + emptySpace.repeat(deepLevel) + childLine + obj.name
    );
  }
}

fs.readFile("data.json", (err, res) => {
  if (err) throw err;
  const data = JSON.parse(res);
  showTree(data);
});
