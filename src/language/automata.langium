grammar Automata

entry Model:
  classes+=Class*
  components+=Component*
  renders+=Render*;

Render:
  'render' '('?
    (
      (componentRef=[Component:ID] | componentDef=Component) | 
      '['
        (componentRefs+=[Component:ID] | componentDef=Component)
        (',' (componentRefs+=[Component:ID] | componentDef=Component))*
      ']'
    )
  ')'?;

Class:
  'class' name=ID '{'
    attributes+=Attributes+
  '}';

Component:
  ComponentDef | MarkdownDef;

ComponentDef:
  'define' class=[Class:ID] ':' name=ID '{'
    properties+=AbstractProperty*

    render=Render?
  '}';

MarkdownDef:
  'define' class='Markdown' (':' name=ID)? '{'
    markdownElements+=MarkdownElement+
  '}';

Attributes:
  name=ID (isOptional?='?')? ':' Type isArray?='[]'?;

Type:
  primitiveType=PrimitiveType | classRef=[Class:ID];

PrimitiveType returns string:
  'string' | 'number' | 'boolean';


MarkdownElement:
  BaseElement | Section | Subsection;

SectionContent:
  Subsection | BaseElement;

Section:
  '$section' name=ID? '{' text+=Text+ '}'
    content+=SectionContent*
  '!section';

Subsection:
  '$subsection' name=ID? '{' text+=Text+ '}'
    content+=BaseElement*
  '!subsection';


BaseElement:
  GenericElement | Paragraph | List | NumberedList | Image | Table | TableOfContents | Input;

GenericElement:
  '$' class=ID name=ID ('(' properties+=AbstractProperty+ ')')? '{'
    markdown+=(MarkdownElement)*
  '}';

AbstractProperty:
  name=ID ':' value=(STRING | ID | INT);

Paragraph:
  text+=(InlineElement | Text)+ '$p'?;

NumberedList:
  '$numberedList' items+=ListItem+ '$end';

List:
  '$list' items+=ListItem+ '$end';

ListItem:
  '$item' text+=Paragraph+;

Image:
  '$image' '(' url=STRING ')';

Table:
  '$Table' '{' colIds+=ID+ '}'
    rows+=Row+
  '!Table';

Row:
  cells+=Cell+ '\\'?;

Cell:
  content+=BaseElement+ '&'?;

Input:
  '$input' name=ID? ('{' properties+=AbstractProperty+ '}')?;

TableOfContents returns string:
  '$tableofcontents';

InlineElement:
  Italic | Bold | Underline | ComponentReference | Hyperlink;

Italic:
  '$italic' '{' text+=Text+ '}';

Bold:
  '$bold' '{' text+=Text+ '}';

Underline:
  '$underline' '{' text+=Text+ '}';

Hyperlink:
  '$href' '(' url=STRING ')' '{' text+=Text+ '}';

ComponentReference:
  '$ref' '(' element=[MarkdownElement:ID] ')';

Text returns string:
  FeatureName | Punctuation | ESCAPEDCHAR;

Punctuation returns string:
  '.' | '!' | '?' | '(' | ')' | ',';

FeatureName returns string:
  ID | 'section';


hidden terminal WS: /\s+/;
terminal ESCAPEDCHAR returns string: /\\./;
terminal ID: /[_a-zA-Z][\w_]*/;
terminal INT returns number: /[0-9]+/;
terminal STRING: /"(\\.|[^"\\])*"|'(\\.|[^'\\])*'/;

hidden terminal ML_COMMENT: /\/\*[\s\S]*?\*\//;
hidden terminal SL_COMMENT: /\/\/[^\n\r]*/;
