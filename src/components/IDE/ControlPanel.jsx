import React from 'react'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined'
import { RoundedButton } from '../common/RoundedButton'
import styles from '../../styles/IDE/IDE.module.css'

export const ControlPanel = ({setText}) => {

  const showFile = async (e) => {
    e.preventDefault()
    const reader = new FileReader()
    reader.onload = async (e) => { 
      const text = (e.target.result)
      setText({value: text, caret: -1, target: e.target})
    };
    reader.readAsText(e.target.files[0])
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
          <RoundedButton textButton={'Compile'}>
              <SettingsOutlinedIcon/>
          </RoundedButton>
        </div>
    </div>
  )
}
