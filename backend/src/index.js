import { graphql } from 'graphql'
import schema from './schema'

export default function _src_index_handler(event, context, callback) {
  const query = event.query
  if (!query) {
    return callback(new Error('Missing required GraphQL query string in POST body'))
  }
  if (typeof query !== 'string') {
    return callback(new Error('query property in POST body must be a string'))
  }
  console.log('handler::event.query=', query)

  console.log('remaining time =', context.getRemainingTimeInMillis())
  console.log('functionName =', context.functionName)
  console.log('AWSrequestID =', context.awsRequestId)
  console.log('logGroupName =', context.logGroupName)
  console.log('logStreamName =', context.logStreamName)
  console.log('clientContext =', context.clientContext)
  if (typeof context.identity !== 'undefined') {
    console.log('Cognito identity ID =', context.identity.cognitoIdentityId)
  }

  graphql(schema, query).then(result => {
    callback(null, result)
  })
}
