import React, { useEffect } from 'react';

export const Editor = ({text, setText, spaces = 4}) => {

  useEffect(() => {
      if(text.caret >= 0){
        text.target.setSelectionRange(text.caret + spaces, text.caret + spaces);
      }
  }, [text]);

  const handleTab = (e) => {
    let content = e.target.value;
    let caret   = e.target.selectionStart;
    if(e.key === 'Tab'){
        e.preventDefault();
        let newText = content.substring(0, caret) + ' '.repeat(spaces) + content.substring(caret);
        setText({value: newText, caret: caret, target: e.target});
    }
  }

  const handleText = (e) => setText({value: e.target.value, caret: -1, target: e.target});
  return(
      <textarea
        onChange  = {handleText}
        onKeyDown = {handleTab}
        value     = {text.value}
        rows="20" cols="100"
      />
  )
}
