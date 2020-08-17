import React from 'react'
import { Link } from 'react-router-dom'
import imgs from '../../utils/imgs'

import styles from './Header.module.scss'

const Header = () => {
  return (
    <header className={`${styles.header} ${styles['header-pd']}`}>
      <div className={styles.header__cont}>
        <Link className={styles.logo} to="/">
          <img className={styles['logo-img']} src={imgs.logo} alt="logo" />
        </Link>
      </div>
    </header>
  )
}

export default Header
