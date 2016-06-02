import React, { PropTypes } from 'react'
import { Router } from 'react-router'

import 'font-awesome/css/font-awesome.css'
import styles from './styles.module.css'

const App = React.createClass({
  render() {
    return (
      <div className={styles.wrapper}>
        <h1>
          <i className='fa fa-star' />
          Env: {__NODE_ENV__}
        </h1>
      </div>
    )
  },
})

export default App
