import { afterAll, describe, expect, test } from "vitest";
import * as path from 'node:path'
import * as fs from 'node:fs'
import { cli } from "./test-util.js";


describe('Automata CLI', () => {

  let fullPath: string
  let fileName = path.join(__dirname, 'prt001.auto')
  const destination = './tests/cli/automata'

  test('generate command returns code 0 and creates expected files', async () => {
    const result = await cli(['generate', fileName, '-d', destination])

    expect(result.code).toBe(0)

    fileName = fileName.replace(/\..*$/, '').replace(/[.-]/g, '');
    fullPath = path.join(destination, `${path.basename(fileName)}.jsx`);

    expectDirectoryToExist(fullPath)
  })


  afterAll(() => {
    if (fs.existsSync(destination)) {
      fs.rmdirSync(destination, { recursive: true })
    }
  })

})

function expectDirectoryToExist(path: string) {
  const pathExists = fs.existsSync(path)
  expect(pathExists).toBeTruthy()
}
