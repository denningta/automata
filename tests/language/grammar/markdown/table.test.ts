import { describe, test } from "vitest";
import { validateMarkdown } from "../testHelpers.js";
import { expectNoIssues } from "langium/test";

describe('Table', () => {

  test('simple table', async () => {
    const validation = await validateMarkdown(`
        $Table { one two three }
          cell one  & cell & cell \\
          cell      & cell & cell \\
          cell      & cell & cell
        !Table
    `)

    expectNoIssues(validation)
  })

})
