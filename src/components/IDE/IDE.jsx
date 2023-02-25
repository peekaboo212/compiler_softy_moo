import React, { useEffect, useState } from 'react'
import { ControlPanel } from './ControlPanel'
import { Editor } from './Editor'
import { Console } from './Console'
import styles from '../../styles/IDE/IDE.module.css'

export const IDE = () => {

  const [text, setText] = useState({value: '', caret: -1, target: null})

  useEffect(() => {
    console.log(text)
  }, [text])

  return (
    <div className={styles.content}>
        <ControlPanel text={text} setText={setText}/>
        <div className={styles.mainContainer}>
            <Editor text={text} setText={setText}/>
            <Console/>
        </div>
    </div>
  )
}
