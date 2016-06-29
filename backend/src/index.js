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

  graphql(schema, query).then(result => {
    callback(null, result)
  })
}
