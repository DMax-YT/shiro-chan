const fs = require("fs/promises");
const path = require("path");

const recursiveRead = async (dir) => {
  let results = [];
  const list = await fs.readdir(dir);
  let pending = list.length;
  if (!pending) return results;

  for (const fileName of list) {
    const file = path.resolve(dir, fileName);
    const stat = await fs.stat(file);
    if (stat && stat.isDirectory()) {
      await recursiveRead(file).then((res) => {
        results = results.concat(res);
      });
      if (!--pending) return results;
    } else {
      results.push(file);
      if (!--pending) return results;
    }
  }
};

module.exports = recursiveRead;
