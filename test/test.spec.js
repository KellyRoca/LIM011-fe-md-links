const path = require('path');
const allFunctions = require('../function.js');

// Test ruta absoluta
describe('path es ruta absoluta', () => {
  it('debería ser una función', () => {
    expect(typeof allFunctions.verifyAbsolutePath).toBe('function');
  });

  it('debería ser false si la ruta es relativa', () => {
    // const path = 'src/ejemplo';
    const input = path.join('src', 'ejemplo');
    expect(allFunctions.verifyAbsolutePath(input)).toEqual(false);
  });

  it('debería ser true si la ruta es absoluta', () => {
    const route = path.join(process.cwd(), 'src', 'ejemplo', 'ejemplito', 'ejemplo.md');
    expect(allFunctions.verifyAbsolutePath(route)).toEqual(true);
  });
});

// Test transformar a ruta absoluta
describe('transformar a ruta absoluta', () => {
  it('debería ser una función', () => {
    expect(typeof allFunctions.transformToAbsolute).toBe('function');
  });
  it('debería transformar la ruta relativa (src/function.js) a la ruta absoluta (/home/kelly/Desktop/Markdown/LIM011-fe-md-links/src/ejemplo)', () => {
    const relativePath = path.join('src', 'ejemplo');
    const absolutePath = path.join(process.cwd(), 'src', 'ejemplo');
    expect(allFunctions.transformToAbsolute(relativePath)).toEqual(absolutePath);
  });
});

// Test verifica si es un archivo, si es directorio
describe('verificar si es archivo o directorio', () => {
  it('verifyIsFile debería ser una función', () => {
    expect(typeof allFunctions.verifyIsDirectory).toBe('function');
  });
  it('verifyIsDirectory debería ser una función', () => {
    expect(typeof allFunctions.verifyIsDirectory).toBe('function');
  });
  it('debería retornar true cuando el argumento sea un archivo', () => {
    const input = path.join(process.cwd(), 'src', 'ejemplo', 'ejemplito', 'ejemplo.md');
    expect(allFunctions.verifyIsFile(input)).toEqual(true);
  });
  it('debería retornar true cuando el argumento sea un directorio', () => {
    const input = path.join(process.cwd(), 'src');
    expect(allFunctions.verifyIsDirectory(input)).toEqual(true);
  });
});

// Test verifica si es extension md

describe('función verifica si es formato md', () => {
  it('debería ser una función', () => {
    expect(typeof allFunctions.verifyIsMd).toBe('function');
  });
  it('debería retornar true cuando la extensión del archivo es md', () => {
    const input = path.join(process.cwd(), 'src', 'ejemplo', 'ejemplito', 'ejemplo.md');
    expect(allFunctions.verifyIsMd(input)).toEqual(true);
  });
  it('debería retornar false cuando la extensión del archivo NO es md', () => {
    const input = path.join(process.cwd(), 'src', 'ejemplo', 'ejemplito');
    expect(allFunctions.verifyIsMd(input)).toEqual(false);
  });
});

// Test trae las rutas de un directorio

describe('función que devuelve las rutas relativas de los elementos de un directorio', () => {
  it('debería ser una función', () => {
    expect(typeof allFunctions.getPathInDirectory).toBe('function');
  });
  it('debería retornar las rutas relativas', () => {
    const input = path.join(process.cwd(), 'src');
    const output = ['ejemplo'];
    expect(allFunctions.getPathInDirectory(input)).toEqual(output);
  });
});

// Test lectura de documento según el link
describe('función que lee una ruta y devuelve en un string lo que esta escrito', () => {
  it('es una función', () => {
    expect(typeof allFunctions.readAllFile).toBe('function');
  });
  it('debería devolver un string con lo que esta escrito en la ruta', () => {
    const input = path.join(process.cwd(), 'src', 'ejemplo', 'ejemplito', 'ejemplo.md');
    const output = '[Accesibilidad Web](https://medium.com/adalab/programando-7-buenas-pr%C3%A1cticas-de-accesibilidad-web-ad141ea7597d)\n[Hola](https://coderrocketfuel.com/article/get-the-path-of-the-current-working-directory-in-node-jsss/as)';
    expect(allFunctions.readAllFile(input)).toEqual(output);
  });
});

// Test verificar ruta y transformar absoluta si fuera necesario
describe('función que retorna la ruta absoluta', () => {
  it('debería ser una función', () => {
    expect(typeof allFunctions.verifyRoute).toBe('function');
  });
  it('debería devolver /home/kelly/Desktop/Markdown/LIM011-fe-md-links/src/ejemplo/ejemplito/ejemplo.md cuando se pasa src/ejemplo/ejemplito/ejemplo.md ', () => {
    const input = path.join('src', 'ejemplo', 'ejemplito', 'ejemplo.md');
    const output = path.join(process.cwd(), 'src', 'ejemplo', 'ejemplito', 'ejemplo.md');
    expect(allFunctions.verifyRoute(input)).toEqual(output);
  });

  it('debería devolver la misma ruta cuando esta es absoluta ', () => {
    const input = path.join(process.cwd(), 'src', 'ejemplo', 'ejemplito', 'ejemplo.md');
    const output = path.join(process.cwd(), 'src', 'ejemplo', 'ejemplito', 'ejemplo.md');
    expect(allFunctions.verifyRoute(input)).toEqual(output);
  });
});

// Test devuelve array de todas las rutas que son archivos en formato md
describe('función que retorna un array con todas las rutas de archivos en formato md', () => {
  it('debería ser una función', () => {
    expect(typeof allFunctions.nameOfAllMdRoutes).toBe('function');
  });
  it('debería retornar array vacío cuando la ruta sea //home/kelly/Desktop/Markdown/LIM011-fe-md-links/src/ejemplo/ejemplito/ejemplo.js', () => {
    const input = path.join(process.cwd(), 'src', 'ejemplo', 'ejemplito', 'ejemplo.js');
    const output = [];
    expect(allFunctions.nameOfAllMdRoutes(input)).toEqual(output);
  });
  it('debería retornar array con rutas md cuando la ruta sea /home/kelly/Desktop/Markdown/LIM011-fe-md-links/src/ejemplo', () => {
    const input = path.join(process.cwd(), 'src', 'ejemplo');
    const output = ['/home/kelly/Desktop/Markdown/LIM011-fe-md-links/src/ejemplo/ejemplito/ejemplito.md', '/home/kelly/Desktop/Markdown/LIM011-fe-md-links/src/ejemplo/ejemplito/ejemplo.md', '/home/kelly/Desktop/Markdown/LIM011-fe-md-links/src/ejemplo/example.md'];
    expect(allFunctions.nameOfAllMdRoutes(input)).toEqual(output);
  });
});

// Test devuelve informacion de links principales
describe('función que retorna un array con info de links encontrados', () => {
  it('debería ser una función', () => {
    expect(typeof allFunctions.arrayOfAllMdLinks).toBe('function');
  });
  it('debería retornar un array vacío cuando el archivo no tenga links', () => {
    const input = ['/home/kelly/Desktop/Markdown/LIM011-fe-md-links/src/ejemplo/example.md'];
    const output = [];
    expect(allFunctions.arrayOfAllMdLinks(input)).toEqual(output);
  });
  it('debería retornar un array de objetos con info de links cuando el archivo md tenga links', () => {
    const input = ['/home/kelly/Desktop/Markdown/LIM011-fe-md-links/src/ejemplo/ejemplito/ejemplo.md'];
    const output = [{
      href: 'https://medium.com/adalab/programando-7-buenas-pr%C3%A1cticas-de-accesibilidad-web-ad141ea7597d',
      text: 'Accesibilidad Web',
      file: '/home/kelly/Desktop/Markdown/LIM011-fe-md-links/src/ejemplo/ejemplito/ejemplo.md',
    },
    {
      href: 'https://coderrocketfuel.com/article/get-the-path-of-the-current-working-directory-in-node-jsss/as',
      text: 'Hola',
      file: '/home/kelly/Desktop/Markdown/LIM011-fe-md-links/src/ejemplo/ejemplito/ejemplo.md',
    },
    ];
    expect(allFunctions.arrayOfAllMdLinks(input)).toEqual(output);
  });
});
