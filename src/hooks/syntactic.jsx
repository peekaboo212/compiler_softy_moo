import React from 'react'
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
  if(tagVar.test(code)){
    console.log(code)
  }else {
    return(false)
  }
}

export const useSyntactic = (code) => {
  let errors = []

  let content = validateTagsStructure(code)
  if(content == false){
    console.log('error with tags')
    return(false)
  } else {
    validateVariables(content[0])
  }

}
