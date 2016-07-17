import React, { PropTypes } from 'react'
import styles from './styles.module.css'
import { connect } from 'react-redux'
import { graphqlStart } from 'actions/graphql'
const AWS = window.AWS
import QBOButton from 'components/QBOButton/QBOButton'

const Dashboard = React.createClass({

  propTypes: {
    children: PropTypes.object,
    user: PropTypes.object.isRequired,
    app: PropTypes.shape({
      isLoading: PropTypes.bool.isRequired,
    }),
    graphql: PropTypes.object,
    onGraphqlClick: PropTypes.func.isRequired,
  },

  getInitialState() {
    return { data: null, error: '' }
  },

  onClick() {
    const { onGraphqlClick } = this.props
    onGraphqlClick(
      'claudia-lambda',
      'query {\nuser(userId:"1") {\nname\nuserId\nage\n}\n}'
    )
  },

  onApiGatewayClick() {
    let apigClient
    if (AWS.config.credentials) {
      const {
        accessKeyId,
        secretAccessKey,
        sessionToken,
      } = AWS.config.credentials
      console.log(`accessKeyId=${accessKeyId}, secretKey=${secretAccessKey}`)
      apigClient = window.apigClientFactory.newClient({
        accessKey: accessKeyId,
        secretKey: secretAccessKey,
        sessionToken,
      })
    } else { apigClient = window.apigClientFactory.newClient() }
    const modeledParams = null // required params (none here)
    const body = null // body for post requests
    const additionalParams = { queryParams: { q1: 'foo', q2: 'bar' } }
    apigClient.triggerGet(modeledParams, body, additionalParams)
      .then(data => {
        this.setState({ data, error: '' })
      }).catch(error => {
        this.setState({ data: null, error: JSON.stringify(error, null, 2) })
      })
  },

  onRequestTokenClick() {
    const modeledParams = null // required params (none here)
    const body = null // body for post requests
    const additionalParams = { queryParams: { q1: 'quickbooks', q2: 'sucks' } }
    const {
      accessKeyId,
      secretAccessKey,
      sessionToken,
    } = AWS.config.credentials
    const apigClient = window.apigClientFactory.newClient({
      accessKey: accessKeyId,
      secretKey: secretAccessKey,
      sessionToken,
    })
    apigClient.requestTokenGet(modeledParams, body, additionalParams)
      .then(data => {
        this.setState({ data, error: '' })
      }).catch(error => {
        this.setState({ data: null, error: JSON.stringify(error, null, 2) })
      })
  },

  onClickRedirect() {
    console.log('clicked redirect')
    fetch('https://7c6zaeerdd.execute-api.us-east-1.amazonaws.com/latest/redirect')
      .then(resp => resp.json())
      .then(data => {
        this.setState({ data, error: '' })
      })
      .catch(error => {
        this.setState({ data: null, error: JSON.stringify(error, null, 2) })
      })
  },

  render() {
    let { data, error } = this.props.graphql

    if (this.state.data) data = this.state.data
    if (this.state.error) error = this.state.error

    const { gId, gName, gImageUrl, gEmail } = this.props.user
    const items = [gId, gName, gImageUrl, gEmail]
    const self = this
    return (
      <div className={'yo'}>
        <h3 className={styles.heading}>Dashboard container</h3>
        {gId ? (<ul>
          {items.map((item, i) => <li key={i}>{item}</li>)}
        </ul>) : null}
        <br />
        <button className='ui blue button' onClick={this.onClick}>GraphQL</button>
        <button className='ui red button' onClick={this.onApiGatewayClick}>
          API Gateway
        </button>
        <button className='ui purple button' onClick={this.onRequestTokenClick}>
          Request Token
        </button>
        <button className='ui yellow button' onClick={this.onClickRedirect}>
          Redirect Test
        </button>
        <button
          className='ui green button'
          onClick={() => { self.setState({ data: null, error: '' }) }}>
          Clear
        </button>
        {this.props.app.isLoading ? <div className='ui active inline loader' /> : null}
        {error ? <div className='ui red message'><pre>{error}</pre></div> : null}
        {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : null}
        {this.props.children}
      </div>
    )
  },
})

const mapStateToProps = ({ app, user, graphql }) => ({
  app,
  user,
  graphql,
})

const mapDispatchToProps = dispatch => ({
  onGraphqlClick(functionName, queryString) {
    return dispatch(graphqlStart(functionName, queryString))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
