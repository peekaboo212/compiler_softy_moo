import React from 'react'
import moo from 'moo'

let error = []

const findErrorLine = (txt, tokenError, message) => {
  const errorWord = tokenError.split(" ")
  const positionOfError = txt.indexOf(errorWord[0])
  const line = txt.substr(0, positionOfError).split("\n").length
  error.push(message + (line))
}

const validateTagsStructure = (code, txt) => {
  let lexer = moo.compile({
    WS: /[ \t]+/,
    varZone: /VAR:[\w\s\S]*?\#/,
    bodyZone: /BODY:[\w\s\S]*?\#/,
    returnLine: /\r/,
    NL: { match: /\n/, lineBreaks: true },
    tagStart: /START/,
    tagEnd: /END/,
    myError: moo.error,
  })

  let response = {
    state: true
  }

  lexer.reset(code)

  let tokens = []

  for (const token of lexer) {
    if(token.type == "varZone" || token.type == "bodyZone"){
      tokens.push(token)
    }
    if(token.type == "myError"){
      findErrorLine(txt, token.text, "Error at tag on line: ")
      response.state = false
    }
  }

  if(tokens.length == 2){
    if(tokens[0].type == "varZone" && tokens[1].type == "bodyZone"){
      response.content = tokens
    }
  } else {
    response.state = false
  }

  return(response)

}

const validateVariables = (code, txt) => {
  let lexer = moo.compile({
    WS: /[ \t]+/,
    tagVar: /VAR:/,
    returnLine: /\r/,
    NL: { match: /\n/, lineBreaks: true },
    varNum: /NUM(?:\\["\\]|[^\n"\\])*;/,
    varString: /STRING(?:\\["\\]|[^\n"\\])*;/,
    varDecimal: /DECIMAL(?:\\["\\]|[^\n"\\])*;/,
    tagEnd: /#/,
    myError: moo.error,
  })

  let response = {
    state: true
  }

  lexer.reset(code)
  let variables = []
  for (const token of lexer) {
    if(token.type == "varNum" || token.type == "varString" || token.type == "varDecimal"){
      variables.push(token)
    }
    if(token.type == "myError"){
      findErrorLine(txt, token.text, "Error declaring variables at line: ")
      response.state = false
    }
  }
  
  response.content = variables
  return(response)
}

const validateBody = (code, txt) => {
  
  let lexer = moo.compile({
    WS: /[ \t]+/,
    tagBody: /BODY:/,
    returnLine: /\r/,
    NL: { match: /\n/, lineBreaks: true },
    function: /ACTION (?:[\w ]*)/,
    arguments: /[(](?:(?:[\w]*)*[ ,]*)*[)]/,
    content: /\{[\w\s\S]*?\}/,
    write: /WRITE\s*"[^"]*";/,
    print: /PRINT\s*"[^"]*";/,
    read: /READ\s*=>\s*\w+;/,
    tagEnd: /#/,
    tagElse: /SINO/,
    compa: /(?:(?:SI\s"?\w+"?\s+(?:ES|NOES|MAYORQ|MAENORQ)\s+"?\w+"?))/,
    myError: moo.error,
  })
  
  let response = {
    state: true
  }

  lexer.reset(code)
  for (const token of lexer) {

    if(token.type === "content"){
      let newContent = token.value.replace(/{/, '')
      newContent = newContent.replace(/}/, '')
      validateBody(newContent)
    }
    if(token.type == "myError"){
      findErrorLine(txt, token.text, "Sintax error at line: ")
      response.state = false
    }
  }
}

export const useSyntactic = (code, txt) => {
  error = []
  let estructureTags = validateTagsStructure(code, txt)

  if(estructureTags.state == true){
    let declarationOfVariables = validateVariables(estructureTags.content[0].value, txt)
    validateBody(estructureTags.content[1].value, txt)
  }

  return(error)
}
