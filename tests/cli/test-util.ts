import { exec, ExecException } from "child_process";
import * as path from 'node:path'
import { createAutomataServices } from "../../src/language/automata-module.js";
import { parseHelper } from "langium/test";
import { Model } from "../../src/language/generated/ast.js";
import { EmptyFileSystem } from "langium";

interface CliResult {
  code: number,
  error: ExecException | null,
  stdout: string,
  stderr: string
}

export async function cli(args: string[]): Promise<CliResult> {
  return new Promise(resolve => {
    exec(`node "${path.join(__dirname, '../../bin/cli')}" "${args.join('" "')}"`, (error, stdout, stderr) => {
      resolve({
        code: error && error.code ? error.code : 0,
        error,
        stdout,
        stderr
      });
    });
  });
}

export const services = createAutomataServices(EmptyFileSystem).Automata
export const parse = parseHelper<Model>(services)
