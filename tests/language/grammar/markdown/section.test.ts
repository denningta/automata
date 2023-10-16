import { describe, test } from 'vitest'
import { expectNoIssues } from 'langium/test'
import { validateMarkdown } from './testHelpers.js'

describe('Section', () => {
  test('single section', async () => {
    const validation = await validateMarkdown(`
        $section { This is a section }
          some content
        !section
    `)


    expectNoIssues(validation)
  })

  test('multiple sections', async () => {
    const validation = await validateMarkdown(`
        $section { This is a section }
          some conetent
        !section

        $section { this is the second }
          some content
        !section
    `)


    expectNoIssues(validation)
  })

  test('section with id', async () => {
    const validation = await validateMarkdown(`
        $section firstSection { This is a section }
           some conetent
        !section
    `)

    expectNoIssues(validation)
  })

})

describe('Subsection', () => {

  test('single subsection', async () => {
    const validation = await validateMarkdown(`
        $section {Section}
          $subsection {This is a section}
            some content
          !subsection
        !section
    `)

    expectNoIssues(validation)
  })

  test('subsection with id', async () => {
    const validation = await validateMarkdown(`
        $section { This is a section }
          $subsection testSection { This is a section }
            This is section content

          !subsection
        !section
    `)

    expectNoIssues(validation)
  })

  test('multiple subsections', async () => {
    const validation = await validateMarkdown(`
        $section { This is a section }
          $subsection { This is a subsection }
            Some content
          !subsection

          $subsection { this is the second }
            Some more content
          !subsection
        !section
      `)


    expectNoIssues(validation)
  })

})

