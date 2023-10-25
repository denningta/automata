import { Generated, expandToNode } from "langium";
import { MarkdownDef, Render, isMarkdownDef } from "../../../language/generated/ast.js";
import generateMarkdown from "../markdown/generate-markdown.js";

export default function generateRender(render: Render): Generated {

  let markdownDef: MarkdownDef | undefined = undefined
  if (isMarkdownDef(render.componentDef)) markdownDef = render.componentDef

  return expandToNode`
    <div>
      ${markdownDef && generateMarkdown(markdownDef)}
      

    </div>
  `
}
