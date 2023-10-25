import { describe, test } from "vitest";
import { validateMarkdown } from "../testHelpers.js";
import { expectNoIssues } from "langium/test";

describe('Image', () => {

  test('image reference', async () => {
    const validation = await validateMarkdown(`
        $image('./images/cat.jpg')
    `)

    expectNoIssues(validation)
  })

})
