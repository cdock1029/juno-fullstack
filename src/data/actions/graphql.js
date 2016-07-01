import { loadingStart, loadingStop } from './app'
/*
 * action types
 */
export const GRAPHQL_START = 'GRAPHQL_START'
export const GRAPHQL_SUCCESS = 'GRAPHQL_SUCCESS'
export const GRAPHQL_FAIL = 'GRAPHQL_FAIL'

function graphqlSuccess(response) {
  return dispatch => {
    console.log(response)
    const data = JSON.parse(response.Payload)
    dispatch(loadingStop())
    return dispatch({ type: GRAPHQL_SUCCESS, payload: data })
  }
}

function graphqlFail(error) {
  return dispatch => {
    dispatch(loadingStop())
    return dispatch({ type: GRAPHQL_FAIL, payload: error.message })
  }
}

export function graphqlStart(FunctionName, query) {
  return dispatch => {
    dispatch(loadingStart())
    const lambda = new window.AWS.Lambda()
    const params = {
      FunctionName,
      Payload: JSON.stringify({ query }),
    }
    lambda.invoke(params, (error, response) => {
      if (error) {
        return dispatch(graphqlFail(error))
      }
      return dispatch(graphqlSuccess(response))
    })
    return dispatch({ type: GRAPHQL_START })
  }
}
