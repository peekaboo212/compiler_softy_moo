import React, { useEffect, useState } from 'react'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined'
import styles from '../../styles/IDE/IDE.module.css'
import { useLexer } from '../../hooks/lexer'
import { useSyntactic } from '../../hooks/syntactic'

export const ControlPanel = ({text, setText}) => {

  const showFile = async (e) => {
    e.preventDefault()
    const reader = new FileReader()
    reader.onload = async (e) => { 
      setText({value: e.target.result, caret: -1, target: e.target})
    };
    reader.readAsText(e.target.files[0])
  }

  const compiler = () => {
    let code = useLexer(text.value)
    useSyntactic(code)
  }

  return (
    <div>
        <div>
          <label>
            Select a file:
            <UploadFileOutlinedIcon/>
            <input type="file" name="file" onChange={(e) => showFile(e)}  className={styles.fileInput}/>
          </label>
        </div>
        <div>
        <button onClick={compiler}>
          Compile
          <SettingsOutlinedIcon/>
        </button>
        </div>
    </div>
  )
}
