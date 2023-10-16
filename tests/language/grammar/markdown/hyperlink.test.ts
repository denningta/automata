import { describe, test } from "vitest";
import { validateMarkdown } from "./testHelpers.js";
import { expectNoIssues } from "langium/test";

describe('Hyperlink', () => {

  test('inline hyperlink', async () => {

    const validation = await validateMarkdown(`
        this is an inline hyperlink to $href('https://www.google.com') { Google }
    `)

    expectNoIssues(validation)

  })

})
