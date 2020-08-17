import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Container from '@/components/layout/Container'
import routes from '@/utils/routes'
import './App.less'

function App() {
  return (
    <Container>
      <Switch>
        {routes.map((item) =>
          item.children.map((val) => (
            <Route
              key={val.path}
              exact
              path={val.path}
              component={val.component}
            />
          ))
        )}
      </Switch>
    </Container>
  )
}

export default App
