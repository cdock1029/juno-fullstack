import React, { PropTypes } from 'react'
import styles from './styles.module.css'

const Dashboard = React.createClass({
  render() {
    return (
      <div className={'yo'}>
        <h3 className={styles.heading}>Dashboard container</h3>
        {this.props.children}
      </div>
    )
  },
})

// App.propTypes = {}

export default Dashboard
