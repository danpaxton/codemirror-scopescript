import {parser} from "./syntax.grammar"
import {LRLanguage, LanguageSupport, indentNodeProp, foldNodeProp, foldInside} from "@codemirror/language"
import {styleTags, tags as t} from "@lezer/highlight"
import {completeFromList, completeAnyWord } from "@codemirror/autocomplete"

export const scopescriptLanguage = LRLanguage.define({
  name: "ScopeScript",
  parser: parser.configure({
    props: [
      indentNodeProp.add({
        Application: context => context.column(context.node.from) + context.unit
      }),
      foldNodeProp.add({
        Application: foldInside
      }),
      styleTags({
        "for while if elif else return delete break continue": t.controlKeyword,
        Param: t.namespace,
        Variable: t.variableName,
        Property: t.propertyName,
        Attribute: t.attributeName,
        Boolean: t.bool,
        String: t.string,
        Number: t.number,
        None: t.null,
        UpdateOp: t.updateOperator,
        ArithOp: t.arithmeticOperator,
        LogicOp: t.logicOperator,
        BitOp: t.bitwiseOperator,
        CompareOp: t.compareOperator,
        LineComment: t.lineComment,
        Equals: t.definitionOperator,
        Arrow: t.function(t.punctuation),

        "( )": t.paren,
        "{ }": t.brace,
        "[ ]": t.squareBracket,
        ".": t.derefOperator,
        ", ;": t.separator,
      })
    ]
  }),
  languageData: {
    commentTokens: {line: "#"},
    
  }
})

export const completion = scopescriptLanguage.data.of({
  autocomplete: [completeFromList([
    {label: "if", type: "keyword"},
    {label: "elif", type: "keyword"},
    {label: "else", type: "keyword"},
    {label: "for", type: "keyword"},
    {label: "while", type: "keyword"},
    {label: "delete", type: "keyword"},
    {label: "return", type: "keyword"},
    {label: "continue", type: "keyword"},
    {label: "break", type: "keyword"},
    {label: "type", type: "function"},
    {label: "ord", type: "function"},
    {label: "len", type: "function"},
    {label: "abs", type: "function"},
    {label: "pow", type: "function"},
    {label: "keys", type: "function"},
    {label: "print", type: "function"},
    {label: "num", type: "function"},
    {label: "str", type: "function"},
    {label: "bool", type: "function"},
  ]), completeAnyWord]
})

export function scopescript() {
  return new LanguageSupport(scopescriptLanguage, [completion]);
}
