import React from 'react'

let invalidSymbols = new RegExp(/[-\$%'^&_?¿~°¬ñ<>]/gm)
let comment = new RegExp(/!![\w].*/)
let linebreak = new RegExp(/\n/)
let tagStart = new RegExp(/START/)
let tagEnd = new RegExp(/END/)

const validateSymbols = (text) => {
  let invalidCarachters = [...text.matchAll(invalidSymbols)]

  if ( invalidCarachters.length > 0) {
    return(false)
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
  let error = []
  let arrayCode = text.split(linebreak)

  if(tagStart.test(arrayCode[0])){
    console.log('bien START')
  } else {
    error.push("invalid syntax: There isn't tag START")
  }
  
  if(tagEnd.test(arrayCode[arrayCode.length-1])){
    console.log('bien END')
  } else {
    error.push("invalid syntax: There isn't tag END")
  }

  if(!error.length){
    return(true)
  } else {
    return(error.join(" "))
  }
}

export const useLexer = (text) => {
  let symbols = validateSymbols(text)
  let formattedCode = deleteCommentsAndSpaces(text)
  let tagsStartEnd = validateStartEnd(formattedCode)
  let errors = []

  if(symbols != true){
    errors.push("invalid syntax: There are invalid symbols")
  }
  if(tagsStartEnd != true){
    errors.push(tagsStartEnd)
  }
  console.log(errors)
  return(formattedCode)
}