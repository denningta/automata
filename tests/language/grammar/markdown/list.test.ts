import { describe, test } from 'vitest'
import { validateMarkdown } from './testHelpers.js'
import { expectNoIssues } from 'langium/test'

describe('Ordered list successful', () => {

  test('ordered list', async () => {
    const validation = await validateMarkdown(`
        $numberedList
          $item First list item
          $item Second list item
          $item Thrid $bold{list} item
        $end
    `)

    expectNoIssues(validation)
  })

  test('unordered list', async () => {

    const validation = await validateMarkdown(`
      $list
        $item First item
        $item Second item
        $item Third item
      $end
    `)

    expectNoIssues(validation)

  })

})
