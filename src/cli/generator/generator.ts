import type { Component, Model } from '../../language/generated/ast.js';
import * as fs from 'node:fs';
import { Generated, expandToNode, joinToNode, toString } from 'langium';
import * as path from 'node:path';
import { extractDestinationAndName } from '../cli-util.js';
import generateComponent from './components/generate-component.js';
import generateRender from './render/generate-render.js';


export function generateJavaScript(model: Model, filePath: string, destination: string | undefined): string {
  const data = extractDestinationAndName(filePath, destination);
  const generatedFilePath = `${path.join(data.destination, data.name)}.jsx`;

  const componentsFile = generateComponents(model.components)

  if (!fs.existsSync(data.destination)) {
    fs.mkdirSync(data.destination, { recursive: true });
  }
  fs.writeFileSync(generatedFilePath, toString(componentsFile));
  return generatedFilePath;
}

export function generateModel(model: Model): Generated {
  return expandToNode`
    export default function Model() {
      return (
        <>
          ${joinToNode(model.renders, generateRender, { appendNewLineIfNotEmpty: true })}
        </>
      )
    }
  `

}

export function generateComponents(components: Component[]): Generated {
  return expandToNode`
    ${joinToNode(components, generateComponent, { appendNewLineIfNotEmpty: true })}
  `
}
