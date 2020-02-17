import { mdLinks } from './function.js';

export const stats = (path) => {
  mdLinks(path, { validate: true })
    .then((dataReturn) => {
      const arrayOfFailLinks = dataReturn.filter((linkObject) => linkObject.message === 'fail');
      const arrayHref = [];
      dataReturn.forEach((linkObject) => arrayHref.push(linkObject.href));
      const arrayHrefUniques = new Set(arrayHref);
      const answerObject = {
        Total: arrayHref.length,
        Unique: arrayHrefUniques.size,
        Broken: arrayOfFailLinks.length,
      };
      return answerObject;
    });
};
