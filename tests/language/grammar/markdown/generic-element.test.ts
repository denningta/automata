import { describe, test } from "vitest";
import { validateMarkdown } from "../testHelpers.js";
import { expectNoIssues } from "langium/test";

describe('Generic Element', () => {

  test('generic element with properties', async () => {

    const validation = await validateMarkdown(`
        $Test testElement(name: 'Something') {
          some content
        }
    `)

    expectNoIssues(validation)
  })
})
