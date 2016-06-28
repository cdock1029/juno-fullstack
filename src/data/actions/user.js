/*
 * action types
 */
export const LOGIN_START = 'LOGIN_START'
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

function loginStart() {
  return { type: LOGIN_START }
}

/*
 * action creators
 */
export function loginSuccess(googleUser) {
  console.log('loginSuccess: configuring AWS credentials')
  AWS.config.credentials = setUpAWSIdentity(googleUser.idToken)
  return { type: LOGIN_SUCCESS, payload: googleUser }
}

export function loginFail(error) {
  return { type: LOGIN_FAIL, payload: error }
}

export function logOut() {
  if (window.AWS.config.credentials) {
    window.AWS.config.credentials.clearCachedId()
  }
  return { type: LOGOUT }
}


export function login() {
  return dispatch => {
    dispatch(loginStart)
    window.Digits.logIn()
      .done(loginSuccess)
      .fail(loginFail)
  }
}
