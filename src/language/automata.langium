grammar Automata

entry Model:
  (persons+=Person | greetings+=Greeting | elements+=AbstractElement | entities+=Entity)*;

Person:
  'person' name=ID;

Greeting:
  'Hello' person=[Person:ID] '!';

AbstractElement:
  ModelDeclaration | Parameter;

ModelDeclaration:
  'model' name=ID '{'
    (elements+=AbstractElement)*
  '}';

Parameter:
  name=ID ':' type=TypeReference;

TypeReference:
  reference=[ModelDeclaration:ID] 
  | primitive=('string' | 'number' | 'boolean' | 'void');

Entity:
  'define' type=TypeReference ':' name=ID '{'
    properties+=Property*
  '}';

Property:
  name=ID ':' value=PropertyValue;

PropertyValue:
  entity=[Entity:ID] | string=STRING | integer=INT;


hidden terminal WS: /\s+/;
terminal ID: /[_a-zA-Z][\w_]*/;
terminal INT returns number: /[0-9]+/;
terminal STRING: /"(\\.|[^"\\])*"|'(\\.|[^'\\])*'/;

hidden terminal ML_COMMENT: /\/\*[\s\S]*?\*\//;
hidden terminal SL_COMMENT: /\/\/[^\n\r]*/;
