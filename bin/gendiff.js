#!/usr/bin/env node
import { program } from "commander";
import gendiff from '../src/index.js';


program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.8.0')
  .option('-f, --format <type>', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>') 
  .action((filePath1, filePath2) => {
    console.log(gendiff(filePath1, filePath2));
  });

program.parse(process.argv);