const path = require('path');
const fs = require('fs');

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

// Función todas las rutas extensión md.
const nameOfAllMdRoutes = (route) => {
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
  } else {
    arrayFile = arrayFile.concat(route);
  }
  // Array de documentos con extensión md
  const arrayMdFile = [];
  arrayFile.forEach((el) => {
    if (verifyIsMd(el) === true) {
      arrayMdFile.push(el);
    }
  });
  return arrayMdFile;
};

const extractLinks = (route) => {
  if (nameOfAllMdRoutes(route).length === 0) {
    return console.log('hola');
  }
  return console.log('si sale');
};

extractLinks('/home/kelly/Desktop/Markdown/LIM011-fe-md-links/src/prueba/prubita/pruebita.js');

console.log(nameOfAllMdRoutes('/home/kelly/Desktop/Markdown/LIM011-fe-md-links/src'));

exports.verifyAbsolutePath = verifyAbsolutePath;
exports.transformToAbsolute = transformToAbsolute;
exports.verifyIsFile = verifyIsFile;
exports.verifyIsDirectory = verifyIsDirectory;
exports.verifyIsMd = verifyIsMd;
