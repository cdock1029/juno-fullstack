import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import cx from 'classnames'
import { loginSuccess, logOut } from 'actions/user'

const Header = React.createClass({

  getInitialState() {
    return {
      signedIn: false,
      idToken: '',
      gId: '',
      gName: '',
      gImageUrl: '',
      gEmail: '',
    }
  },

  componentDidMount() {
    if (typeof window.gapi !== 'undefined') {
      window.gapi.signin2.render(this.refs.gSignin2, {
        scope: 'profile email openid',
        width: 100,
        height: 30,
        // longtitle: true,
        // theme: 'dark',
        onsuccess: this.onSignIn,
        onfailure: this.onSiginFailure,
      })
    }
  },

  onSignIn(googleUser) {
    console.log('onSignIn')
    const { dispatch, loginSuccess } = this.props
    const idToken = googleUser.getAuthResponse().id_token
    const profile = googleUser.getBasicProfile()
    const user = {
      idToken,
      gId: profile.getId(),
      gName: profile.getName(),
      gImageUrl: profile.getImageUrl(),
      gEmail: profile.getEmail(),
    }
    /* AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: 'us-east-1:fed1f8ad-f90c-49ce-9c05-9535ae3dbe91',
      Logins: {
        'accounts.google.com': idToken,
      },
    }) */
    dispatch(loginSuccess({ signedIn: true, ...user }))
  },

  onSignOut() {
    const { dispatch, logOut } = this.props
    const auth2 = window.gapi.auth2.getAuthInstance()
    auth2.signOut().then(() => {
      dispatch(logOut())
    })
    console.log('sign out')
  },

  onSiginFailure(response) {
    console.log('Login failure:', response)
  },

  renderGoogleButton() {
    const { signedIn } = this.props.user
    return (
      <div
        className={cx({ item: !signedIn, hidden: signedIn })}
        ref='gSignin2' />
    )
  },

  renderSignOutButton() {
    if (this.props.user.signedIn) {
      return (
        <a
          className='ui item'
          onClick={this.onSignOut}>
          <i className='google icon' />
          Sign Out
        </a>
      )
    }
    return null
  },

  renderUserItems() {
    const { gName, gEmail, gImageUrl, signedIn } = this.props.user
    return signedIn ? (
      <div className='item'>
        <img className='ui avatar image' src={gImageUrl} alt={gName} />
        <span>{gName}</span>
      </div>
    ) : null
  },

  render() {
    console.log('render - props:', this.props)
    return (
      <div className='ui top fixed menu'>
        <div className='ui container'>
          <Link className='item' to='/'><i className='home icon' /></Link>
          <Link className='item' to='/create-property'>New Property</Link>
          <div className='right menu'>
            {this.renderUserItems()}
            {this.renderGoogleButton()}
            {this.renderSignOutButton()}
          </div>
        </div>
      </div>
    )
  },
})

const mapStateToProps = ({ user }) => ({
  user,
  logOut,
  loginSuccess,
})

export default connect(mapStateToProps)(Header)
