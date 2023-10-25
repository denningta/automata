import { describe, test } from "vitest";
import { validateMarkdown } from "../testHelpers.js";
import { expectNoIssues } from "langium/test";

describe('Table of contents', () => {

  test('table of contents', async () => {
    const validation = await validateMarkdown(`
        $tableofcontents
    `)

    expectNoIssues(validation)
  })

})
