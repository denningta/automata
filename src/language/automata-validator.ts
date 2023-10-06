import type { ValidationChecks } from 'langium';
import type { AutomataAstType } from './generated/ast.js';
import type { AutomataServices } from './automata-module.js';

/**
 * Register custom validation checks.
 */
export function registerValidationChecks(services: AutomataServices) {
  const registry = services.validation.ValidationRegistry;
  const validator = services.validation.AutomataValidator;
  const checks: ValidationChecks<AutomataAstType> = {
  };
  registry.register(checks, validator);
}

/**
 * Implementation of custom validations.
 */
export class AutomataValidator {


}
