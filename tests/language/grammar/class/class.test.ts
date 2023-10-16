import { describe, test } from "vitest";
import { validate } from "../markdown/testHelpers.js";
import { expectNoIssues } from "langium/test";

describe('Class', () => {

  test('basic class', async () => {
    const validation = await validate(`
      class MWI {
        name: string
        id: number
        valid: boolean
      }
    `)

    expectNoIssues(validation)
  })

  test('primitive type array', async () => {
    const validation = await validate(`
      class MWI {
        name: string[]
      }
    `)

    expectNoIssues(validation)
  })

  test('class reference', async () => {
    const validation = await validate(`
      class Product {
        name: string
      }

      class MWI {
        name: string
        product: Product
      }
    `)

    expectNoIssues(validation)
  })

  test('class reference array', async () => {
    const validation = await validate(`
      class Step {
        name: string
      }

      class MWI {
        name: string
        steps: Step[]
      }
    `)

    expectNoIssues(validation)
  })


})
