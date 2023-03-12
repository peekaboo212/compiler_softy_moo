import React from 'react'
import moo from 'moo'

let error = []

let invalidSymbols = new RegExp(/[-\$%'^&_?¿~°¬ñ<]/gm)
let comment = new RegExp(/!![\w].*/)
let linebreak = new RegExp(/\n/g)

const validateSymbols = (text) => {
  let invalidCarachters = [...text.matchAll(invalidSymbols)]
  if ( invalidCarachters.length > 0) {
    return(invalidCarachters)
  }
  return(true)
}

const deleteCommentsAndSpaces = (text) => {
  let formattedCode = []
  let arrayCode = text.split(linebreak)

  arrayCode.map(line => {
    if(!comment.test(line) && line != ""){
      formattedCode.push(line)
    }
  })

  return(formattedCode.join('\n'))
}

const validateStartEnd = (text) => {
  let lexer = moo.compile({
    WS: /[ \t]+/,
    tags: /START[\w\s\S]*?\END/,
    returnLine: /\r/,
    NL: { match: /\n/, lineBreaks: true },
  })

  try {
    lexer.reset(text)
    for (const token of lexer) {
      // console.log(token)
    }
    return(true)
  } catch (e) {
    // console.log(e)
    return(false)
  }
}

const findErrorLine = (txt, positionError, message) => {
  const contentBeforeError = txt.substr(0, positionError)
  const lineCodes = [...contentBeforeError.matchAll(linebreak)]
  const saveError = `${message} at line ${lineCodes.length+1}`
  error.push(saveError)
}

export const useLexer = (text) => {
  error = []
  let symbols = validateSymbols(text)
  let formattedCode = deleteCommentsAndSpaces(text)
  let tagsStartEnd = validateStartEnd(formattedCode)

  if(symbols != true){
    symbols.map(error => {
      findErrorLine(text, error.index, "Invalid syntax: There are invalid symbols")
    })
  }
  if(tagsStartEnd != true){
    error.push("Invalid syntax: Missing tags START/END")
  }

  let resultsOfLexer = {
    content: formattedCode,
    errors: error
  }

  return(resultsOfLexer)
}