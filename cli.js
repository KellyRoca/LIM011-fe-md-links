#!/usr/bin/env node

const functionForCli = require('./functionForCli.js');

const path = process.argv[2];
const [,,, ...option] = process.argv;

const options = option.join(' ');

if (path === '') {
  console.log('Ruta no existe, ingrese una ruta válida');
} else {
  functionForCli(path, options)
    .then((response) => {
      console.log(response);
    });
}
