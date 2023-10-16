import { describe, test } from "vitest";
import { validateMarkdown } from "./testHelpers.js";
import { expectNoIssues } from "langium/test";

describe('Reference', () => {

  test('inline reference', async () => {
    const validation = await validateMarkdown(`
        $section cats { Section About Cats }
          some content
        !section

        Make an inline reference $ref(cats) to another component
    `)


    expectNoIssues(validation)
  })


})
