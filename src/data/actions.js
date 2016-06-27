/*
 * action types
 */
export const DIGITS_START = 'DIGITS_START'
export const DIGITS_SUCCESS = 'DIGITS_SUCCESS'
export const DIGITS_FAIL = 'DIGITS_FAIL'

function digitsStart() {
  return { type: DIGITS_START }
}

/*
 * action creators
 */
export function digitsSuccess(digitsResponse) {
  const oAuthHeaders = digitsResponse.oauth_echo_headers
  const verifyData = {
    authHeader: oAuthHeaders['X-Verify-Credentials-Authorization'],
    apiUrl: oAuthHeaders['X-Auth-Service-Provider'],
  }
  return { type: DIGITS_SUCCESS, payload: verifyData }
}

export function digitsFail(error) {
  return { type: DIGITS_FAIL, payload: error }
}

export function digitsLogin() {
  return dispatch => {
    dispatch(digitsStart)
    window.Digits.logIn()
      .done(digitsSuccess)
      .fail(digitsFail)
  }
}
