import React, { PropTypes } from 'react'
import styles from './styles.module.css'
import { connect } from 'react-redux'
import { graphqlStart } from 'actions/graphql'
const AWS = window.AWS

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
    if (false/* AWS.config.credentials */) {
      AWS.config.credentials.get(() => {
        debugger;
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
      })
    } else { apigClient = window.apigClientFactory.newClient() }
    const body = { body1: 'hello', body2: 'world' }
    apigClient.startGet(null, body)
      .then(data => {
        this.setState({ data, error: '' })
      }).catch(error => {
        this.setState({ data: null, error: JSON.stringify(error, null, 2) })
      })
  },

  render() {
    let { data, error } = this.props.graphql

    if (this.state.data) data = this.state.data
    if (this.state.error) error = this.state.error

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
        <button className='ui red button' onClick={this.onApiGatewayClick}>
          API Gateway
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
