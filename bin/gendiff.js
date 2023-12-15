#!/usr/bin/env node
import { Command } from "commander";

const program = new Command();

program
  .name('helper')
  .description('Compares two configuration files and shows a difference.')
  .version('0.8.0')
  .option('-f, --format <type>', 'output format')

program.parse(process.argv);