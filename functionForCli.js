const mdLinks = require('./function.js');
const stats = require('./stats.js');

const functionForCli = (path, options) => {
  if (options === '--validate') {
    return mdLinks.mdLinks(path, { validate: true })
      .then((data) => {
        let string = '';
        data.forEach((element) => {
          string += `${element.file} ${element.href} ${element.message} ${element.status} ${element.text}\n`;
        });
        return string;
      });
  }
  if (options === '--stats') {
    return stats(path)
      .then((data) => `Total: ${data.total}\nUnique: ${data.unique}`);
  }
  if (options === '--stats --validate') {
    return stats(path)
      .then((data) => `Total: ${data.total}\nUnique: ${data.unique}\nBroken: ${data.broken}`);
  }
  return mdLinks.mdLinks(path, { validate: false })
    .then((data) => {
      let string = '';
      data.forEach((element) => {
        string += `${element.file} ${element.href} ${element.text}\n`;
      });
      return string;
    });
};


module.exports = functionForCli;
