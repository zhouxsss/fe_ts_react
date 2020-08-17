import React from 'react'
import { Button } from 'antd'
import styles from './TopBar.module.scss'

export default function () {
  return (
    <>
      <h3 className={styles.name}>
        <label>合约名称</label>
        <span>1111</span>
      </h3>
      <div className={styles.buttons}>
        <Button type="primary">返回</Button>
        <div>
          <Button type="primary">代码检查</Button>
          <Button type="primary">保存</Button>
        </div>
      </div>
    </>
  )
}
