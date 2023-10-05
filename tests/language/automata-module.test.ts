import { describe, test } from 'vitest'
import { createAutomataServices } from '../../src/language/automata-module.js';
import { expectNoIssues, validationHelper } from 'langium/test'
import { Model } from '../../src/language/generated/ast.js';
import { EmptyFileSystem } from 'langium';


const services = createAutomataServices(EmptyFileSystem)
// const parse = parseHelper(services.Automata)
// const locator = services.Automata.workspace.AstNodeLocator
const validate = validationHelper<Model>(services.Automata)


describe('Parser Tests', () => {

  describe('Plain text', () => {

    test('single line plain text', async () => {
      const validation = await validate(`
        this is a single line of plain text
      `)

      expectNoIssues(validation)
    })


    test('multiple lines plain text', async () => {
      const validation = await validate(`
        this is thie first line of plain text
        this is the second line of plain text
      `)

      expectNoIssues(validation)

      debugger
    })

  })

  describe('Header successful', () => {

    test('single header', async () => {

      const validation = await validate(`
        # This is a header
      `)


      expectNoIssues(validation)
    })

    test('multiple headers', async () => {

      const validation = await validate(`
        # this is a header
        # this is a second header
      `)

      expectNoIssues(validation)

    })

    test('header variation', async () => {
      const validation = await validate(`
        # this is a header1
        ## this is a header2
        ### this is a header3
        #### this is a header4
      `)


      expectNoIssues(validation)
    })


  })

  describe('Ordered list successful', () => {

    test('ordered list', async () => {
      const validation = await validate(`
        1. This is a list item
        2. with two items
      `)

      expectNoIssues(validation)

    })

  })


})

