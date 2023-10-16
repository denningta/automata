import { expectNoIssues } from "langium/test"
import { describe, expect, test } from 'vitest'
import { validateMarkdown } from "./testHelpers.js"
import { MarkdownDef } from "../../../../src/language/generated/ast.js"

describe('Paragraph', () => {

  test('single line plain text', async () => {
    const validation = await validateMarkdown(`
        this is a single line of plain text
      `)

    expectNoIssues(validation)
  })

  test('punctuation', async () => {
    const validation = await validateMarkdown(`
      What is the best thing about Switzerland? $p
      I do not know, but the flag is a big plus. $p
      Helvetica and Times New Roman walk into a bar. $p
      Get out of here! shouts the bartender. We do not serve your type!
    `)

    expectNoIssues(validation)
  })

  // TODO: Escaped characters
  // test('escaped characters', async () => {
  //   const validation = await validateMarkdown(`
  //     \"cat\"
  //   `)
  //   expectNoIssues(validation)
  // })

  test('multiple lines plain text', async () => {
    const validation = await validateMarkdown(`
          this is the first 
          paragraph of plain text $p

          this is the second paragraph of plain text
      `)


    const markdown = validation.document.parseResult.value.components[0] as MarkdownDef

    expect(markdown.markdownElements.length).toBe(2)
    expectNoIssues(validation)

  })

  describe('Italics', () => {

    test('italic text', async () => {
      const validation = await validateMarkdown(`
        $italic { this is italic text }
      `)

      expectNoIssues(validation)
    })

    test('inline italics', async () => {
      const validation = await validateMarkdown(`
          this is inline $italic { italic text} inside a paragraph
      `)

      expectNoIssues(validation)
    })

  })

  describe('Underline', () => {

    test('underline text', async () => {
      const validation = await validateMarkdown(`
          $underline { this is underlined text }
      `)

      expectNoIssues(validation)
    })

    test('inline underline', async () => {
      const validation = await validateMarkdown(`
          this is inline $underline { underlined text} inside a paragraph
      `)

      expectNoIssues(validation)
    })

  })
  describe('Bold', () => {

    test('bold text', async () => {
      const validation = await validateMarkdown(`
          $bold { this is bold text }
      `)

      expectNoIssues(validation)
    })

    test('inline italics', async () => {
      const validation = await validateMarkdown(`
          this is inline $bold { bold text} inside a paragraph
      `)

      expectNoIssues(validation)
    })

  })

})
