import React from 'react'
import moo from 'moo'

let linebreak = new RegExp(/\n/)
let tagEnd = new RegExp(/#/)
let tagVar = new RegExp(/VAR:/)
let tagFunc = new RegExp(/FUNC:/)
let tagBody = new RegExp(/BODY:/)

const validateTagsStructure = (code) => {
  if(tagVar.test(code) && tagFunc.test(code) && tagBody.test(code) && tagEnd.test(code)){
    let content = code.replace('START','')
    content = content.replace('END','')
    content = content.split(tagEnd)

    if(content.length <= 3){
      return(false)
    } else {
      return(content)
    }
  }
}

const validateVariables = (code) => {
  let lexer = moo.compile({
    WS: /[ \t]+/,
    tagStart: /VAR:/,
    returnLine: /\r/,
    NL: { match: /\n/, lineBreaks: true },
    varNum: /NUM(?:\\["\\]|[^\n"\\])*./,
    varString: /STRING(?:\\["\\]|[^\n"\\])*./,
    varDecimal: /DECIMAL(?:\\["\\]|[^\n"\\])*./,
  })

  if(tagVar.test(code)){
    try {
      lexer.reset(code)
      let tokens = []
      for (const token of lexer) {
        if(token.type == "varNum" || token.type == "varString" || token.type == "varDecimal"){
          tokens.push(token)
        }
      }
      return(tokens)
    } catch (e) {
      return(false)
    }
  }else {
    return(false)
  }
}

export const useSyntactic = (code) => {
  let errors = []

  let content = validateTagsStructure(code)
  if(content){
    let variables = validateVariables(content[0])
    if(variables) {
      console.log(variables)
    } else {
      errors.push('error in var zone')
    }
  } else {
    errors.push('error with tags')
  }

  console.log(errors)
}
