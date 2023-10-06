grammar Automata

entry Model:
  EOL*
  (markdown+=MarkdownElement)*
  EOL*;

MarkdownElement:
  Header | OrderedList | Paragraph;

Paragraph:
  text+=Text+ EOL*;

Header:
  Header1 | Header2 | Header3 | Header4;

Header1:
  '#' text+=Text+ EOL*;

Header2:
  '##' text+=Text+ EOL*;

Header3:
  '###' text+=Text+ EOL*;

Header4:
  '####' text+=Text+ EOL*;

OrderedList:
  items+=OrderedListItem+ EOL*;

OrderedListItem:
  number=INT '.' text+=Text+ EOL*;

Text returns string:
  FeatureName;

FeatureName returns string:
  ID;


terminal EOL: /[\r\n]/;
terminal ID: /[_a-zA-Z][\w_]*/;
terminal INT returns number: /[0-9]+/;
terminal STRING: /"(\\.|[^"\\])*"|'(\\.|[^'\\])*'/;

hidden terminal WS: /[^\S\r\n]/;
hidden terminal ML_COMMENT: /\/\*[\s\S]*?\*\//;
hidden terminal SL_COMMENT: /\/\/[^\n\r]*/;
