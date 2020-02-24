const path = require('path');
const fetchMock = require('../__mocks__/node-fetch.js');

// allFunctions obj: esta validateEachLink y mdLinks
const allFunctions = require('../function.js');
const stats = require('../stats.js');
const functionForCli = require('../functionForCli.js');

fetchMock
  .mock('https://medium.com/adalab/programando-7-buenas-pr%C3%A1cticas-de-accesibilidad-web-ad141ea7597d', 200)
  .mock('https://coderrocketfuel.com/article/get-the-path-of-the-current-working-directory-in-node-jsss/as', 404)
  .mock('https://carlosazaustre.com/manejando-la-asincronia-en-javascript/', { throws: new Error('No existe') });

const arrayLinkUndefined = [{
  href: 'https://carlosazaustre.com/manejando-la-asincronia-en-javascript/',
  text: '',
  file: path.join(process.cwd(), 'src', 'ejemplo', 'ejemplito', 'ejemplo.md'),
}];

const arrayValidateLinkUndefined = [{
  href: 'https://carlosazaustre.com/manejando-la-asincronia-en-javascript/',
  text: '',
  file: path.join(process.cwd(), 'src', 'ejemplo', 'ejemplito', 'ejemplo.md'),
  status: 'No existe link',
  message: 'fail',
}];

const array3Information = [
  {
    href: 'https://medium.com/adalab/programando-7-buenas-pr%C3%A1cticas-de-accesibilidad-web-ad141ea7597d',
    text: 'Accesibilidad Web',
    file: path.join(process.cwd(), 'src', 'ejemplo', 'ejemplito', 'ejemplo.md'),
  },
  {
    href: 'https://coderrocketfuel.com/article/get-the-path-of-the-current-working-directory-in-node-jsss/as',
    text: 'Hola',
    file: path.join(process.cwd(), 'src', 'ejemplo', 'ejemplito', 'ejemplo.md'),
  },
];

const array5Information = [
  {
    href: 'https://medium.com/adalab/programando-7-buenas-pr%C3%A1cticas-de-accesibilidad-web-ad141ea7597d',
    text: 'Accesibilidad Web',
    file: path.join(process.cwd(), 'src', 'ejemplo', 'ejemplito', 'ejemplo.md'),
    status: 200,
    message: 'ok',
  },
  {
    href: 'https://coderrocketfuel.com/article/get-the-path-of-the-current-working-directory-in-node-jsss/as',
    text: 'Hola',
    file: path.join(process.cwd(), 'src', 'ejemplo', 'ejemplito', 'ejemplo.md'),
    status: 404,
    message: 'fail',
  },
];

const arrayStats = {
  total: 2,
  unique: 2,
  broken: 1,
};

describe('validateEachLink, valida cada link', () => {
  it('debería retornar un array de objetos con las propiedades(5): href, text, file, status, message ', (done) => {
    expect.assertions(1);
    return allFunctions.validateEachLink(array3Information).then((objectOfArray) => {
      expect(objectOfArray).toEqual(array5Information);
      done();
    });
  });

  it('debería retornar un array con un objeto con propiedades(5): href, text, file, status, message ', (done) => {
    expect.assertions(1);
    return allFunctions.validateEachLink(arrayLinkUndefined).then((e) => {
      expect(e).toEqual(arrayValidateLinkUndefined);
      done();
    });
  });
});

describe('mdLinks', () => {
  it('debería retornar un array de objetos con las propiedades(3): href, text, file', (done) => {
    expect.assertions(1);
    return allFunctions.mdLinks('src', { validate: false }).then((data) => {
      expect(data).toEqual(array3Information);
      done();
    });
  });

  it('debería retornar un array de objetos con las propiedades(5): href, text, file, status, message', (done) => {
    expect.assertions(1);
    return allFunctions.mdLinks('src', { validate: true }).then((data) => {
      expect(data).toEqual(array5Information);
      done();
    });
  });
});

describe('stats, muestra las estadísticas de la ruta pasada, los links totales, unicos y rotos', () => {
  it('debería retornar un objeto con las propiedades(3): total, unique,broken ', (done) => {
    expect.assertions(1);
    return stats('src').then((data) => {
      expect(data).toEqual(arrayStats);
      done();
    });
  });
});

const string5Properties = `${path.join(process.cwd(), 'src', 'ejemplo', 'ejemplito', 'ejemplo.md')} https://medium.com/adalab/programando-7-buenas-pr%C3%A1cticas-de-accesibilidad-web-ad141ea7597d ok 200 Accesibilidad Web\n${path.join(process.cwd(), 'src', 'ejemplo', 'ejemplito', 'ejemplo.md')} https://coderrocketfuel.com/article/get-the-path-of-the-current-working-directory-in-node-jsss/as fail 404 Hola\n`;

const string3Properties = `${path.join(process.cwd(), 'src', 'ejemplo', 'ejemplito', 'ejemplo.md')} https://medium.com/adalab/programando-7-buenas-pr%C3%A1cticas-de-accesibilidad-web-ad141ea7597d Accesibilidad Web\n${path.join(process.cwd(), 'src', 'ejemplo', 'ejemplito', 'ejemplo.md')} https://coderrocketfuel.com/article/get-the-path-of-the-current-working-directory-in-node-jsss/as Hola\n`;

const stringOnlyStats = 'Total: 2\nUnique: 2';

const stringStatsAndValidate = 'Total: 2\nUnique: 2\nBroken: 1';

describe('functionForCLi retorna strings de acuerdo a las opciones que se piden', () => {
  it('debería retornar x c/link un string (5 propiedades) cuando opcion es --validate', (done) => {
    expect.assertions(1);
    return functionForCli('src', '--validate').then((data) => {
      expect(data).toEqual(string5Properties);
      done();
    });
  });

  it('debería retornar x c/link un string(3 propiedades) cuando no coloca opcion', (done) => {
    expect.assertions(1);
    return functionForCli('src').then((data) => {
      expect(data).toEqual(string3Properties);
    });
  });

  it('debería retornar un string con (2 propiedades) cuando opcion es --stats', (done) => {
    expect.assertions(1);
    return functionForCli('src', '--stats').then((data) => {
      expect(data).toEqual(stringOnlyStats);
      done();
    });
  });

  it('debería retornar un string con (3 propiedades) cuando opcion es --stats --validate', (done) => {
    expect.assertions(1);
    return functionForCli('src', '--stats --validate').then((data) => {
      expect(data).toEqual(stringStatsAndValidate);
      done();
    });
  });
});
