import React from 'react'
import { Link } from 'react-router'
// import AWS from 'aws-sdk'
window.AWS.config.region = 'us-east-1'
const AWS = window.AWS

const Header = React.createClass({

  getInitialState() {
    return { user: null }
  },

  componentDidMount() {
    window.gapi.signin2.render('g-signin2', {
      scope: 'profile email openid',
      width: 100,
      height: 30,
      // longtitle: true,
      // theme: 'dark',
      onsuccess: this.onSignIn,
      onfailure: this.onSiginFailure,
    })
  },

  onSignIn(googleUser) {
    console.log('onSignIn')
    const idToken = googleUser.getAuthResponse().id_token
    const profile = googleUser.getBasicProfile()
    const user = {
      id: profile.getId(),
      name: profile.getName(),
      imageUrl: profile.getImageUrl(),
      email: profile.getEmail(),
    }
    console.log('Signin succes:', user)
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: 'us-east-1:fed1f8ad-f90c-49ce-9c05-9535ae3dbe91',
      Logins: {
        'accounts.google.com': idToken,
      },
    })
    this.setState({ user })
  },

  onSignOut(e) {
    console.log('sign out')
  },

  onSiginFailure(response) {
    console.log('Login failure:', response)
  },

  render() {
    console.log('render - user:', this.state.user)
    return (
      <div className='ui top fixed menu'>
        <div className='ui container'>
          <Link className='item' to='/'><i className='home icon' /></Link>
          <Link className='item' to='/create-property'>New Property</Link>
          <div className='right menu'>
            {this.user ?
              <a className='ui item' onClick={this.onSignOut}>Sign Out</a> :
              <div className='item' onClick={this.onSignOut} id='g-signin2' />}
          </div>
        </div>
      </div>
    )
  },
})

export default Header
