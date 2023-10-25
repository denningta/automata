import { describe, test } from "vitest";
import { validate } from "../testHelpers.js";
import { expectNoIssues } from "langium/test";

describe('Render function', () => {

  test('render inside component', async () => {
    const validation = await validate(`
      class MWI {
        name: string
      }

      class Step {
        name: string
      }

      define Step: step1 {
        name: 'step one'
      }

      define MWI: prt001 {
        name: 'PRT-001'

        render step1
      }
    `)

    expectNoIssues(validation)
  })

  test('render single component', async () => {
    const validation = await validate(`
      class MWI {
        name: string
      }

      define MWI: prt001 {
        name: 'PRT-001'
      }

      render prt001
    `)

    expectNoIssues(validation)
  })

  test('render component array', async () => {
    const validation = await validate(`
      class MWI {
        name: string
      }

      define MWI: prt001 {
        name: 'PRT-001'
      }

      define MWI: prt002 {
        name: 'PRT-002'
      }

      render [
        prt001,
        prt002
      ]
    `)

    expectNoIssues(validation)
  })


  test('render component definition', async () => {
    const validation = await validate(`
      class MWI {
        name: string
      }

      define MWI: prt001 {
        name: 'PRT-001'
      }

      define MWI: prt002 {
        name: 'PRT-002'
      }

      render([
        prt001,
        prt002
      ])
    `)

    expectNoIssues(validation)
  })

  test('render markdown definition', async () => {
    const validation = await validate(`
      render define Markdown {
        this is a markdown paragraph
      }
    `)

    expectNoIssues(validation)
  })
})
