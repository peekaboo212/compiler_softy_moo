import React, { useEffect, useState } from 'react'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined'
import { useLexer } from '../../hooks/lexer'
import { useSyntactic } from '../../hooks/syntactic'
import styles from '../../styles/IDE/ControlPanel.module.css'
import ReplayIcon from '@mui/icons-material/Replay';

export const ControlPanel = ({text, setText, setErrors, setCompiled}) => {

  const showFile = async (e) => {
    e.preventDefault()
    setCompiled(false)
    const reader = new FileReader()
    reader.onload = async (e) => { 
      setText({value: e.target.result, caret: -1, target: e.target})
    };
    reader.readAsText(e.target.files[0])
  }

  const compiler = () => {
    let code = useLexer(text.value)
    let syntactic = useSyntactic(code.content, text.value)
    let listOfErrors = code.errors.concat(syntactic)
    setErrors(listOfErrors)
    setCompiled(true)
  }

  const recharge = () => {
    setCompiled(false)
    setText({value: "", caret: -1, target: ""})
  }

  return (
    <div className={styles.containerPanel}>
        <div className={styles.buttonDoc}>
          <label className={styles.label}>
            <p className={styles.p}>Select a file:</p>
            <UploadFileOutlinedIcon/>
            <input type="file" name="file" onChange={(e) => showFile(e)}  className={styles.fileInput}/>
          </label>
        </div>
        <button onClick={compiler} className={styles.buttonCompiler}>
          <p className={styles.p}>Compile</p>
          <SettingsOutlinedIcon/>
        </button>
        <button onClick={recharge} className={styles.buttonCompiler}>
          <p className={styles.p}>Reload</p>
          <ReplayIcon/>
        </button>
    </div>
  )
}
