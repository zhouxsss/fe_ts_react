import React from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom'
import Header from './Header'
import { Menu } from 'antd'

import routes from '@/utils/routes'
import styles from './Container.module.scss'

const Container: React.FC = (props) => {
  const history = useHistory()
  const { path } = useRouteMatch()
  const goTo = (path: string) => {
    history.push(path)
  }
  return (
    <>
      <Header />
      <section className={styles.container}>
        <div className={styles.sider}>
          <Menu
            mode="inline"
            theme="dark"
            style={{ height: '100%' }}
            defaultOpenKeys={['0']} // 展开所有SubMenu
            selectedKeys={[path]} //默认选择和pathname匹配的menu
          >
            {routes.map((item, index) => {
              return (
                <Menu.SubMenu key={index} title={item.title}>
                  {item.children.map((child) => (
                    <Menu.Item
                      onClick={() => goTo(child.path)}
                      key={child.path}
                    >
                      {child.title}
                    </Menu.Item>
                  ))}
                </Menu.SubMenu>
              )
            })}
          </Menu>
        </div>
        <div className={styles.main}>
          {props.children}
        </div>
      </section>
    </>
  )
}

export default Container
