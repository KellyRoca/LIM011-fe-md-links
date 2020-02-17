#!/usr/bin/env node
import { mdLinks } from './function.js';
// import { stats } from './stats.js';

// Grab provided args.
const [,, ...args] = process.argv;

// Print Hello Word
console.log(`Hello World ${args.slice(0, 1)}`);
console.log(`Hello World ${args.slice(1, 2)}`);
console.log(`Hello World ${args.slice(2, 3)}`);

const route = args.slice(0, 1);

const cliFunction = (path, options) => {
  if (options === '--validate') return mdLinks(path, { validate: true });
  //   if (options === '--stats') return stats(path);
  //   if (options === '--stats --validate') return stats(path);
  return 'hola';
};
