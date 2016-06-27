import React from 'react'
import { Link } from 'react-router'
// import AWS from 'aws-sdk'
AWS.config.region = 'us-east-1'

const Header = React.createClass({

  componentDidMount() {
    window.gapi.signin2.render('g-signin2', {
      scope: 'profile email openid',
      /* width: 200,
      height: 50,
      longtitle: true, */
      // theme: 'dark',
      onsuccess: this.onSignIn,
    })
  },

  onSignIn(googleUser) {
    const profile = googleUser.getAuthResponse()
    console.log('Signin succes:', profile)
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: 'us-east-1:fed1f8ad-f90c-49ce-9c05-9535ae3dbe91',
      Logins: {
        'accounts.google.com': profile.id_token,
      },
    })
    window.AWS = AWS
  },

  onLoginFailure(response) {
    console.log('Login failure:', response)
  },

  render() {
    return (
      <div className='ui top fixed menu'>
        <div className='ui container'>
          <Link className='item' to='/'><i className='home icon' /></Link>
          <Link className='item' to='/create-property'>New Property</Link>
          <div className='right menu'>
            <div className='item' id='g-signin2' data-onsuccess={this.onSignIn} dataTheme='dark'></div>
          </div>
        </div>
      </div>
    )
  },
})

export default Header
