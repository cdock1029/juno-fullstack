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

  loadApiClient() {
    let apigClient
    if (AWS.config.credentials) {
      const {
        accessKeyId,
        secretAccessKey,
        sessionToken,
      } = AWS.config.credentials
      apigClient = window.apigClientFactory.newClient({
        accessKey: accessKeyId,
        secretKey: secretAccessKey,
        sessionToken,
      })
    } else { apigClient = window.apigClientFactory.newClient() }
    return apigClient
  },

  data(data) {
    this.setState({ data, error: '' })
  },

  error(err) {
    this.setState({ data: null, error: JSON.stringify(err, null, 2) })
  },

  onApiGatewayClick() {
    const apigClient = this.loadApiClient()
    const modeledParams = null // required params (none here)
    const body = null // body for post requests
    const additionalParams = { queryParams: { q1: 'foo', q2: 'bar' } }
    apigClient.triggerGet(modeledParams, body, additionalParams)
      .then(this.data)
      .catch(this.error)
  },

  onRequestTokenClick() {
    const apigClient = this.loadApiClient()
    const modeledParams = null // required params (none here)
    const body = null // body for post requests
    const additionalParams = { queryParams: { q1: 'quickbooks', q2: 'sucks' } }
    apigClient.requestTokenGet(modeledParams, body, additionalParams)
      .then(this.data)
      .catch(this.error)
  },

  onClickRedirect() {
    console.log('clicked redirect')
    const apigClient = this.loadApiClient()
    apigClient.redirectGet()
      .then(this.data)
      .catch(this.error)
  },
  onClickTest() {
    const apigClient = this.loadApiClient()
    apigClient.testGet()
      .then(this.data)
      .catch(this.error)
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
        <button className='ui pink button' onClick={this.onClickTest}>
          Test
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
