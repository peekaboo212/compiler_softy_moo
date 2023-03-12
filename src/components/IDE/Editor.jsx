import React, { useEffect, useState, useRef } from 'react';
import styles from '../../styles/IDE/Editor.module.css'


export const Editor = ({text, setText, spaces = 4 }) => {

  const [numLines, setNumLines] = useState(null)

  const div1Ref = useRef(null);
  const div2Ref = useRef(null);

  const handleDiv1Scroll = () => {
    div2Ref.current.scrollTop = div1Ref.current.scrollTop;
  };

  const handleDiv2Scroll = () => {
    div1Ref.current.scrollTop = div2Ref.current.scrollTop;
  };

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

  const handleText = (e) => setText({value: e.target.value, caret: -1, target: e.target})

  let renderNumLInes = () => numLines.map((line, index) => (<p key={index}>{index+1}</p>))
  

  useEffect(() => {
    setNumLines(text.value.split("\n"))
  }, [text])
  

  return(
    <div className={styles.containerEditor}>
      <div ref={div1Ref} className={styles.containerNumLines} onScroll={handleDiv1Scroll}>
        {numLines != null ? renderNumLInes() : <></>}
      </div>
      <div className={styles.containerCode}>
        <textarea
          spellCheck={false}
          className={styles.containerTextarea}
          ref={div2Ref}
          onScroll={handleDiv2Scroll}
          onChange  = {handleText}
          onKeyDown = {handleTab}
          value     = {text.value}
          // cols="120"
        />
      </div>
    </div>
  )
}
