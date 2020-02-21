#!/usr/bin/env node

const functionForCli = require('./functionForCli.js');

const path = process.argv[2];
const [,,, ...option] = process.argv;
const options = option.join(' ');

functionForCli(path, options)
  .then((response) => {
    console.log(response);
  })
  .catch(() => console.log('Hubo un error, revisar la documentación'));
