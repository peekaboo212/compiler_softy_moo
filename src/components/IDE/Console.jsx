import React, { useEffect } from 'react'
import styles from '../../styles/IDE/Console.module.css'

export const Console = ({errors, compiled}) => {

  let renderErrors = () => errors.map((error, index) => (<p key={index} className={styles.error}>{error}</p>))

  return (
    <div className={styles.containerConsole}>
      {compiled == true && errors.length != 0 ? renderErrors() : <></>}
      {compiled == true && errors.length == 0 ? <p className={styles.correct}>Se ejecutó correctamente</p> : <></>}
    </div>
  );
}