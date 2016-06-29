import React, { PropTypes } from 'react'
import styles from './styles.module.css'
import { connect } from 'react-redux'

const Dashboard = React.createClass({

  propTypes: {
    children: PropTypes.object,
    user: PropTypes.object.isRequired,
  },

  getInitialState() {
    return { data: null, error: '' }
  },

  onClick() {
    const lambda = new window.AWS.Lambda()
    const params = {
      FunctionName: 'claudia-lambda',
      Payload: JSON.stringify({
        query: 'query {\nuser(userId:"1") {\nname\nuserId\nage\n}\n}',
      }),
    }
    lambda.invoke(params, (error, response) => {
      if (error) {
        this.setState({ error: `Lambda error: ${error.message}`, data: null })
      } else {
        console.log(response)
        const data = JSON.parse(response.Payload)
        this.setState({ data, error: '' })
      }
    })
  },

  render() {
    const { data, error } = this.state
    const { gId, gName, gImageUrl, gEmail } = this.props.user
    const items = [gId, gName, gImageUrl, gEmail]
    return (
      <div className={'yo'}>
        <h3 className={styles.heading}>Dashboard container</h3>
        {gId ? (<ul>
          {items.map((item, i) => <li key={i}>{item}</li>)}
        </ul>) : null}
        <br />
        <button className='ui blue button' onClick={this.onClick}>GraphQL</button>
        {data ? <pre>{JSON.stringify(this.state.data, null, 2)}</pre> : null}
        {error ? <div className='ui red message'>{this.state.error}</div> : null}
        {this.props.children}
      </div>
    )
  },
})

export default connect(({ user }) => ({ user }))(Dashboard)
