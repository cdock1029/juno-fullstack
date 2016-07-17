import { loadingStart, loadingStop } from './app'


/*
 * action types
 */
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAIL = 'LOGIN_FAIL'
export const LOGOUT = 'LOGOUT'
const AWS = window.AWS

function setUpAWSIdentity(idToken, email) {
  const federatedParams = {
    IdentityPoolId: 'us-east-1:fed1f8ad-f90c-49ce-9c05-9535ae3dbe91',
    Logins: {
      'accounts.google.com': idToken,
    },
    LoginId: email,
  }
  return new window.AWS.CognitoIdentityCredentials(federatedParams)
  /*
  cognitoidentity.getId(federatedParams, (err, data) => {
    if (err) {
      console.log(err, err.stack)
    } else {
      console.log(data)
      const cognitoParams = {
        IdentityId: data.IdentityId,
        Logins: federatedParams.Logins,
      }
      cognitoidentity.getOpenIdToken(cognitoParams, (error, data2) => {
        if (error) console.log(error, error.stack)
        else {
          console.log('OpenIdToken:', data2)
          const sts = new AWS.STS()
        }
      })
    }
  }) */
}

/*
 * action creators
 */
export function loginSuccess(googleUser) {
  return dispatch => {
    console.log('loginSuccess: configuring AWS credentials')
    const credentials = setUpAWSIdentity(googleUser.idToken, googleUser.gEmail)
    return credentials.get(() => {
      console.log('loaded CREDS')
      window.CREDENTIALS = credentials
      AWS.config.credentials = credentials
      dispatch(loadingStop())
      return dispatch({ type: LOGIN_SUCCESS, payload: googleUser })
    })
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
