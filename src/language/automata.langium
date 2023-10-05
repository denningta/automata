grammar Automata

entry Model:
  (persons+=Person | greetings+=Greeting | markdown+=MarkdownElement)*;

Person:
  'person' name=ID;

Greeting:
  'Hello' person=[Person:ID] '!';

MarkdownElement:
  Header | OrderedList | PlainText;

PlainText:
  text+=Text+;

Header:
  Header1 | Header2 | Header3 | Header4;

Header1:
  '#' text+=Text+;

Header2:
  '##' text+=Text+;

Header3:
  '###' text+=Text+;

Header4:
  '####' text+=Text+;

OrderedList:
  items+=OrderedListItem+;

OrderedListItem:
  number=INT '.' text+=Text+;

Text returns string:
  FeatureName
;

FeatureName returns string:
  ID;


hidden terminal WS: /\s+/;
terminal EOL: /[\r\n]/;
terminal ID: /[_a-zA-Z][\w_]*/;
terminal INT returns number: /[0-9]+/;
terminal STRING: /"(\\.|[^"\\])*"|'(\\.|[^'\\])*'/;

hidden terminal ML_COMMENT: /\/\*[\s\S]*?\*\//;
hidden terminal SL_COMMENT: /\/\/[^\n\r]*/;
