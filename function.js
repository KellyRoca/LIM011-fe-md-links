/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable max-len */
const path = require('path');
const fs = require('fs');
const marked = require('marked');
const fetch = require('node-fetch');

const verifyAbsolutePath = (route) => path.isAbsolute(route);

const transformToAbsolute = (route) => path.resolve(route);

const verifyIsFile = (route) => fs.statSync(route).isFile();

const verifyIsDirectory = (route) => fs.statSync(route).isDirectory();

const verifyIsMd = (route) => {
  const typeExtension = path.parse(route).ext;
  if (typeExtension === '.md') {
    return true;
  } return false;
};

const getPathInDirectory = (route) => fs.readdirSync(route, 'utf-8');
const readAllFile = (route) => fs.readFileSync(route, 'utf8');

// Función transformar rutas si fuera necesario
const verifyRoute = (route) => {
  if (verifyAbsolutePath(route) === true) {
    return route;
  }
  const newRouteAbsolute = transformToAbsolute(route);
  return newRouteAbsolute;
};

// Función todas las rutas extensión md.
const nameOfAllMdRoutes = (route) => {
  // const routeAbsolute = verifyRoute(route);
  let arrayFile = [];
  if (verifyIsDirectory(route) === true) {
    const arrayNameOfRoutes = getPathInDirectory(route).map((element) => path.join(route, element));
    arrayNameOfRoutes.forEach((el) => {
      if (verifyIsFile(el) === true) {
        arrayFile = arrayFile.concat(el);
      } else {
        arrayFile = arrayFile.concat(nameOfAllMdRoutes(el));
      }
    });
  }
  arrayFile = arrayFile.concat(route);
  // Array de documentos con extensión md
  const arrayMdFile = [];
  arrayFile.forEach((el) => {
    if (verifyIsMd(el) === true) {
      arrayMdFile.push(el);
    }
  });
  return arrayMdFile;
};

const arrayOfAllMdLinks = (dataOfAllMdRoutes) => {
  const renderer = new marked.Renderer();
  const arrayAllLinks = [];
  dataOfAllMdRoutes.forEach((routeOfFile) => {
    renderer.link = (HREF, TITLE, TEXT) => {
      arrayAllLinks.push({ href: HREF, text: TEXT, file: routeOfFile });
    };
    marked(readAllFile(routeOfFile), { renderer });
  });
  return arrayAllLinks;
};

// Funcion devolver datos del validate
const validateEachLink = (linkDataArray) => {
  const arrayWithOptionValidate = [];
  linkDataArray.forEach((objectOfArray) => {
    const obj = { ...objectOfArray };
    const link = objectOfArray.href;
    arrayWithOptionValidate.push(fetch(link)
      .then((response) => {
        if (response.status >= 200 && response.status <= 399) {
          obj.status = response.status;
          obj.message = 'ok';
          return obj;
        }
        obj.status = response.status;
        obj.message = 'fail';
        return obj;
      })
      .catch((reject) => {
        obj.status = 'No existe status';
        obj.message = 'fail';
        return obj;
      }));
  });
  return Promise.all(arrayWithOptionValidate);
};

const mdLinks = (route, validate) => {
  const promise = new Promise((resolve, reject) => {
    if (route === '') reject(new Error('Ruta no existe, ingrese una ruta válida'));
    else {
      const routeAbsolute = verifyRoute(route);
      const arrayAllMdRoutes = nameOfAllMdRoutes(routeAbsolute);
      if (validate.validate === true) resolve(validateEachLink(arrayOfAllMdLinks(arrayAllMdRoutes)));
      if (validate.validate === false) resolve(arrayOfAllMdLinks(arrayAllMdRoutes));
    }
  });
  return promise;
};

mdLinks('src/ejemplo/example.md', { validate: true })
  .then((response) => console.log(response));

// module.exports = mdLinks;
module.exports = {
  verifyAbsolutePath,
  transformToAbsolute,
  verifyIsFile,
  verifyIsDirectory,
  verifyIsMd,
  getPathInDirectory,
  verifyRoute,
  nameOfAllMdRoutes,
  arrayOfAllMdLinks,
  readAllFile,
  mdLinks,
};
// exports.mdLinks = mdLinks;
// exports.verifyAbsolutePath = verifyAbsolutePath;
// exports.transformToAbsolute = transformToAbsolute;
// exports.verifyIsFile = verifyIsFile;
// exports.verifyIsDirectory = verifyIsDirectory;
// exports.verifyIsMd = verifyIsMd;
// exports.getPathInDirectory = getPathInDirectory;
// exports.verifyRoute = verifyRoute;
// exports.nameOfAllMdRoutes = nameOfAllMdRoutes;
// exports.arrayOfAllMdLinks = arrayOfAllMdLinks;
// exports.readAllFile = readAllFile;
