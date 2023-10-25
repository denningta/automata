import { expandToNode } from 'langium'
import { MarkdownElement, isParagraph } from "../../../language/generated/ast.js";

export default function generateParagraph(element: MarkdownElement) {
  if (!isParagraph(element)) return

  return expandToNode`
    <p>
      ${element.text.map(text => text).join(' ')}
    </p>
  `


}
