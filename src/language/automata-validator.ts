import type { ValidationAcceptor, ValidationChecks } from 'langium';
import type { AutomataAstType, Person } from './generated/ast.js';
import type { AutomataServices } from './automata-module.js';

/**
 * Register custom validation checks.
 */
export function registerValidationChecks(services: AutomataServices) {
    const registry = services.validation.ValidationRegistry;
    const validator = services.validation.AutomataValidator;
    const checks: ValidationChecks<AutomataAstType> = {
        Person: validator.checkPersonStartsWithCapital
    };
    registry.register(checks, validator);
}

/**
 * Implementation of custom validations.
 */
export class AutomataValidator {

    checkPersonStartsWithCapital(person: Person, accept: ValidationAcceptor): void {
        if (person.name) {
            const firstChar = person.name.substring(0, 1);
            if (firstChar.toUpperCase() !== firstChar) {
                accept('warning', 'Person name should start with a capital.', { node: person, property: 'name' });
            }
        }
    }

}
