import type { DefaultSharedModuleContext, LangiumServices, LangiumSharedServices, Module, PartialLangiumServices } from 'langium';
import { createDefaultModule, createDefaultSharedModule, inject } from 'langium';
import { AutomataGeneratedModule, AutomataGeneratedSharedModule } from './generated/module.js';
import { AutomataValidator, registerValidationChecks } from './automata-validator.js';

/**
 * Declaration of custom services - add your own service classes here.
 */
export type AutomataAddedServices = {
  validation: {
    AutomataValidator: AutomataValidator
  }
}

/**
 * Union of Langium default services and your custom services - use this as constructor parameter
 * of custom service classes.
 */
export type AutomataServices = LangiumServices & AutomataAddedServices

/**
 * Dependency injection module that overrides Langium default services and contributes the
 * declared custom services. The Langium defaults can be partially specified to override only
 * selected services, while the custom services must be fully specified.
 */
export const AutomataModule: Module<AutomataServices, PartialLangiumServices & AutomataAddedServices> = {
  validation: {
    AutomataValidator: () => new AutomataValidator()
  }
};

/**
 * Create the full set of services required by Langium.
 *
 * First inject the shared services by merging two modules:
 *  - Langium default shared services
 *  - Services generated by langium-cli
 *
 * Then inject the language-specific services by merging three modules:
 *  - Langium default language-specific services
 *  - Services generated by langium-cli
 *  - Services specified in this file
 *
 * @param context Optional module context with the LSP connection
 * @returns An object wrapping the shared services and the language-specific services
 */
export function createAutomataServices(context: DefaultSharedModuleContext): {
  shared: LangiumSharedServices,
  Automata: AutomataServices,
} {
  const shared = inject(
    createDefaultSharedModule(context),
    AutomataGeneratedSharedModule
  );
  const Automata = inject(
    createDefaultModule({ shared }),
    AutomataGeneratedModule,
    AutomataModule
  );

  shared.ServiceRegistry.register(Automata)
  registerValidationChecks(Automata)
  return { shared, Automata }
}
