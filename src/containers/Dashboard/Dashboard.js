import React, { PropTypes } from 'react'
import styles from './styles.module.css'
import { connect } from 'react-redux'

const Dashboard = React.createClass({

  propTypes: {
    children: PropTypes.object,
    user: PropTypes.object.isRequired,
  },

  render() {
    const { gId, gName, gImageUrl, gEmail } = this.props.user
    const items = [gId, gName, gImageUrl, gEmail]
    return (
      <div className={'yo'}>
        <h3 className={styles.heading}>Dashboard container</h3>
        {gId ? (<ul>
          {items.map((item, i) => <li key={i}>{item}</li>)}
        </ul>) : null}
        {this.props.children}
      </div>
    )
  },
})

export default connect(({ user }) => ({ user }))(Dashboard)
