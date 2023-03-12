import React, { useEffect, useState } from 'react'
import { ControlPanel } from './ControlPanel'
import { Editor } from './Editor'
import { Console } from './Console'
import styles from '../../styles/IDE/IDE.module.css'

export const IDE = () => {

  const [text, setText] = useState({value: '', caret: -1, target: null})
  const [errors, setErrors] = useState([])
  const [compiled, setCompiled] = useState(false)

  return (
    <div className={styles.content}>
        <ControlPanel text={text} setText={setText} setErrors={setErrors} setCompiled={setCompiled}/>
        <div className={styles.mainContainer}>
            <Editor text={text} setText={setText}/>
            <Console errors={errors} compiled={compiled}/>
        </div>
    </div>
  )
}
