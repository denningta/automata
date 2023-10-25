import { LangiumDocument } from "langium";
import { Model } from "../../language/generated/ast.js";

export interface GeneratorContext {
  model: LangiumDocument<Model>
  fileName: string
  destination: string
}
