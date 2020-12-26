const fs = require("fs");

function showTree(obj, deepLevel) {
  if (obj.items) {
    if (deepLevel) {
        console.log("├" + "-".repeat(deepLevel) + " " + obj.name);
    } else {
        console.log(obj.name)
    }
    obj.items.forEach((element) => {
      showTree(element, deepLevel + 1);
    });
  } else {
      return console.log("├" + "──".repeat(deepLevel) + " " + obj.name);
  }
}

fs.readFile("data.json", (err, res) => {
  if (err) throw err;
  const data = JSON.parse(res);
  showTree(data, 0);
});
