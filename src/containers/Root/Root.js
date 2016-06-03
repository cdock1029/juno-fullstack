import React, { PropTypes } from 'react'
import Header from 'components/Header/Header'
// import styles from './styles.module.css'

const Root = React.createClass({
  propTypes: {
    children: PropTypes.object.isRequired,
  },

  render() {
    const { children } = this.props
    return (
      <div className={'ui container'}>
        <Header />
        {children}
      </div>
    )
  },
})

// App.propTypes = {}

export default Root
