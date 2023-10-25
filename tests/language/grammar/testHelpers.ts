import { parseHelper, validationHelper } from "langium/test"
import { EmptyFileSystem } from "langium"
import { createAutomataServices } from "../../../src/language/automata-module.js"
import { Model } from "../../../src/language/generated/ast.js"

export const services = createAutomataServices(EmptyFileSystem)
export const parse = parseHelper(services.Automata)
export const locator = services.Automata.workspace.AstNodeLocator
export const validate = validationHelper<Model>(services.Automata)

export const validateMarkdown = (input: string) => {
  const markdownEntry = `
    define Markdown {
      ${input}
    }
  `

  return validate(markdownEntry)
}
