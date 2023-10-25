import { expandToNode, joinToNode } from "langium";
import { MarkdownDef } from "../../../language/generated/ast.js";
import generateParagraph from "./generate-paragraph.js";

export default function generateMarkdown(markdown: MarkdownDef) {

  const { markdownElements } = markdown



  return expandToNode`
    <>
      ${joinToNode(markdownElements, generateParagraph, { appendNewLineIfNotEmpty: true })}
      
    </>
  `

}
