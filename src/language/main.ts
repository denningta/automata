import { DocumentState, startLanguageServer } from 'langium';
import { NodeFileSystem } from 'langium/node';
import { createConnection, ProposedFeatures } from 'vscode-languageserver/node.js';
import { createAutomataServices } from './automata-module.js';

// Create a connection to the client
const connection = createConnection(ProposedFeatures.all);

// Inject the shared services and language-specific services
const { shared, Automata } = createAutomataServices({ connection, ...NodeFileSystem });

// Start the language server with the shared services
startLanguageServer(shared);

const AutomataJsonSerializer = Automata.serializer.JsonSerializer


shared.workspace.DocumentBuilder.onBuildPhase(DocumentState.Validated, documents => {
  for (const document of documents) {
    const json = AutomataJsonSerializer.serialize(document.parseResult.value);
    console.log('automata', JSON.parse(json))
  }
});
