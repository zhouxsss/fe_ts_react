import React from 'react'
import styles from './index.module.scss'

import TopBar from './components/TopBar'
import FileTree from './components/FileTree'
import EditorMain from './components/EditorMain'
import Output from './components/Output'
import Handler from './components/Handler'

export default function () {
  return (
    <div className={styles.editor}>
      <div className={styles['editor-topbar']}>
        <TopBar />
      </div>
      <div className={styles['editor-filetree']}>
        <FileTree />
      </div>
      <div>
        <EditorMain />
      </div>
      <div>
        <Output />
      </div>
      <div className={styles['editor-handler']}>
        <Handler />
      </div>
    </div>
  )
}
