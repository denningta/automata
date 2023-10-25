import { Generated, expandToNode, joinToNode } from "langium";
import { Component, isComponentDef } from "../../../language/generated/ast.js";
import generateRender from "../render/generate-render.js";
import generateProp from "./generate-props.js";

export default function generateComponent(component: Component): Generated {

  const render = isComponentDef(component) && component.render && generateRender(component.render)

  const c = isComponentDef(component) && component

  if (c) return expandToNode`
      export function ${component.name}({
        ${joinToNode(c.properties, generateProp, { separator: ', ', appendNewLineIfNotEmpty: true })}
      }) {
        return (
          <>
            ${render && render}
          </>
        )
      }
    `

  return expandToNode`
    export function ${component.name}() {
      return (
        <>
          
        </>
      )

    }
  `

}
