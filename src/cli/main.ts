import type { Model } from '../language/generated/ast.js';
import chalk from 'chalk';
import { Command } from 'commander';
import { AutomataLanguageMetaData } from '../language/generated/module.js';
import { createAutomataServices } from '../language/automata-module.js';
import { extractAstNode } from './cli-util.js';
import { generateJavaScript } from './generator/generator.js';
import { NodeFileSystem } from 'langium/node';

export const generateAction = async (fileName: string, opts: GenerateOptions): Promise<void> => {
  const services = createAutomataServices(NodeFileSystem).Automata;
  const model = await extractAstNode<Model>(fileName, services);
  const generatedFilePath = generateJavaScript(model, fileName, opts.destination);
  console.log(chalk.green(`JavaScript code generated successfully: ${generatedFilePath}`));
};

export type GenerateOptions = {
  destination?: string;
}

const program = new Command();

program
  .version('1');

const fileExtensions = AutomataLanguageMetaData.fileExtensions.join(', ');
program
  .command('generate')
  .argument('<file>', `source file (possible file extensions: ${fileExtensions})`)
  .option('-d, --destination <dir>', 'destination directory of generating')
  .description('generates JavaScript code that prints "Hello, {name}!" for each greeting in a source file')
  .action(generateAction);

program.parse(process.argv);
