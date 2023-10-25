import { toString } from "langium";
import { describe, expect, test } from "vitest";
import generateComponent from "../../../src/cli/generator/components/generate-component.js";
import { parse } from "../test-util.js";
import { generateModel } from "../../../src/cli/generator/generator.js";


describe('Generator', () => {

  test('generate model', async () => {

    const ast = await parse(`
      render define Markdown {
        This is a paragraph
      }
    `)

    const model = ast.parseResult.value

    const generated = generateModel(model)
    const string = toString(generated)

    debugger


  })

  test('generate component', async () => {
    const ast = await parse(`
      class MWI {
        name: string
      }

      define MWI: prt001 {
        name: 'PRT-001'

        render define Markdown {
          this is a paragraph
        }
      }
    `)

    const { components } = ast.parseResult.value
    const generated = generateComponent(components[0])
    const string = toString(generated)

    expect(string).toMatch(/export function prt001\([^)]*\)[\s]*{[\s]*return[\s]*\([^)]*\)[\s]*\}/)
  })

  test('generate component props', async () => {
    const ast = await parse(`
      class MWI {
        name: string
        description: string
      }

      define MWI: prt001 {
        name: 'PRT-001'
        description: 'Flanged Bracket'

        render define Markdown {
          this is a paragraph
        }
      }
    `)

    const { components } = ast.parseResult.value
    const generated = generateComponent(components[0])
    const string = toString(generated)

    debugger
    expect(string).toContain('name = \'PRT-001\'')

  })

})
