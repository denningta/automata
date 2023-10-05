import { DocumentState, startLanguageServer } from 'langium';
import { NodeFileSystem } from 'langium/node';
import { createConnection, ProposedFeatures } from 'vscode-languageserver/node.js';
import { createAutomataServices } from './automata-module.js';


// Create a connection to the client
export const connection = createConnection(ProposedFeatures.all);

// Inject the shared services and language-specific services
export const AutomataServices = createAutomataServices({ connection, ...NodeFileSystem });
const { shared, Automata } = AutomataServices

// Start the language server with the shared services
startLanguageServer(shared);

const AutomataJsonSerializer = Automata.serializer.JsonSerializer

shared.workspace.DocumentBuilder.onBuildPhase(DocumentState.Validated, documents => {
  console.log(shared.workspace.TextDocuments.all())
  for (const document of documents) {
    const json = AutomataJsonSerializer.serialize(document.parseResult.value);
    console.log('automata', JSON.parse(json))
  }
});
