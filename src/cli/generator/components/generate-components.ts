import { Generated, expandToNode, joinToNode } from "langium";
import { Component, ComponentDef, MarkdownDef, isComponentDef, isMarkdownDef } from "../../../language/generated/ast.js";
import generateComponent from "./generate-component.js";
import generateMarkdown from "../markdown/generate-markdown.js";

export function generateComponents(components: Component[]): Generated {

  const componentDefs = components.filter(component => isComponentDef(component)) as ComponentDef[]

  const markdownDefs = components.filter(component => isMarkdownDef(component)) as MarkdownDef[]


  return expandToNode`
    ${joinToNode(componentDefs, generateComponent, { appendNewLineIfNotEmpty: true })}
    ${joinToNode(markdownDefs, generateMarkdown, { appendNewLineIfNotEmpty: true })}

  `
}
