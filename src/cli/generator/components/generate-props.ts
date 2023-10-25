import { expandToNode } from "langium";
import { AbstractProperty } from "../../../language/generated/ast.js";

export default function generateProp(property: AbstractProperty) {
  return expandToNode`
    ${property.name} = '${property.value}'
  `
}
