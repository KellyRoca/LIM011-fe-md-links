const mdLinks = require('./function.js');

const stats = (path) => mdLinks.mdLinks(path, { validate: true })
  .then((dataReturn) => {
    const arrayOfFailLinks = dataReturn.filter((linkObject) => linkObject.message === 'fail');
    const arrayHref = [];
    dataReturn.forEach((linkObject) => arrayHref.push(linkObject.href));
    const arrayHrefUniques = new Set(arrayHref);
    const answerObject = {
      total: arrayHref.length,
      unique: arrayHrefUniques.size,
      broken: arrayOfFailLinks.length,
    };
    return answerObject;
  });

module.exports = stats;
