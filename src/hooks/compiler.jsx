import React from 'react'
import moo from 'moo'

export const useCompiler = (text) => {
  let lexer = moo.compile({
    WS: /[ \t]+/,
    comment: /!![\w].*/,
    invalidSymbols: /[-\$%"^&_?¿~°¬ñ<>]/,
    operators: ['Y', 'O', '+', '-', '*', '/', '^', 'ES'],
    number:  /0|[1-9][0-9]*/,
    asignation: '=',
    string:  /"(?:\\["\\]|[^\n"\\])*"/,
    lparen:  '(',
    rparen:  ')',
    lbracket:  '{',
    rbracket:  '}',
    structure: ['VAR:', 'FUNC:', 'BODY:'],
    conditional: ['SI', 'SINO'],
    methods: ['PRINT', 'WRITE', 'READ'],
    variables: /\w/,
    // tagStart: /START:(?:[^\r"\\]|[^\n"\\])*/,
    finishTag: '#',
    finishLine: '.',
    returnLine: /\r/,
    NL: { match: /\n/, lineBreaks: true },
    tagStart: /START/,
    tagEnd: /END/,
  })

  try {
    lexer.reset(text)
    let tokens = []
    for (const token of lexer) {
      if(token.type !== "NL" && token.type !== "comment"){
        tokens.push(token)
        console.log(token)
      }
    }

    console.log(tokens)
  } catch (e) {
    console.log('error:' + e)
  }
}