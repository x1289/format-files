const fs = require('fs');
const readline = require('readline');
const path = require('path');

function formatFile(filePath, formatFunc) {
  return new Promise((resolve, reject) => {
    if (typeof formatFunc !== 'function') reject(new Error('invalid format function.'));
    fs.copyFile(filePath, filePath + '.temp', () => {
      fs.writeFileSync(filePath, '');
      const rl = readline.createInterface({
        input: fs.createReadStream(filePath + '.temp'),
        crlfDelay: Infinity
      });
      
      rl.on('line', (line) => {
        fs.appendFileSync(filePath, formatFunc(line));
      });
      
      rl.on('close', () => {
        rl.close();
        fs.rmSync(filePath + '.temp', {force: true})
        resolve(filePath);
      });
    })
  })
}

function handleAllFiles(dirPath, formatFunc) {
  return new Promise((resolve, reject) => {
    fs.opendir(dirPath, async (err, dir) => {
      if (err) reject(err);
      for await (const dirent of dir) {
        const newPath = path.join(dirPath, dirent.name);
        if (dirent.isFile()) {
          formatFile(newPath, formatFunc);
        } else if (dirent.isDirectory()) {
          handleAllFiles(newPath, formatFunc);
        }
      }
    });
  });
}

module.exports = {
  handleAllFiles,
  formatFile
}