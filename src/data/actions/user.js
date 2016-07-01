import { loadingStart, loadingStop } from './app'


/*
 * action types
 */
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAIL = 'LOGIN_FAIL'
export const LOGOUT = 'LOGOUT'
const AWS = window.AWS

function setUpAWSIdentity(idToken) {
  return new window.AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-east-1:fed1f8ad-f90c-49ce-9c05-9535ae3dbe91',
    Logins: {
      'accounts.google.com': idToken,
    },
  })
}

/*
 * action creators
 */
export function loginSuccess(googleUser) {
  return dispatch => {
    console.log('loginSuccess: configuring AWS credentials')
    AWS.config.credentials = setUpAWSIdentity(googleUser.idToken)
    dispatch(loadingStop())
    return dispatch({ type: LOGIN_SUCCESS, payload: googleUser })
  }
}

export function loginFail(error) {
  return dispatch => {
    dispatch(loadingStop())
    return { type: LOGIN_FAIL, payload: error }
  }
}

export function logOut() {
  AWS.config.credentials.clearCachedId()
  AWS.config.credentials = null
  return { type: LOGOUT }
}


// TODO is this needed?
export function login() {
  return dispatch => {
    dispatch(loadingStart())
    window.Digits.logIn()
      .done(loginSuccess)
      .fail(loginFail)
  }
}
