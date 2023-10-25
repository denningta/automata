import { expectNoIssues } from "langium/test"
import { describe, test } from "vitest"
import { validate } from "../testHelpers.js"

describe('Component', () => {

  test('simple component', async () => {
    const validation = await validate(`
      class MWI {
        name: string
      }

      define MWI: prt001 {
        name: 'PRT-001'
      }
    `)

    expectNoIssues(validation)
  })


})
