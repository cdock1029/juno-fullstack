import React from 'react'

const QBOButton = React.createClass({

  componentDidMount() {
    this.insertScript(`window.triggerIntuitLoaded = function trigger() {
      console.log('triggering intuit loaded');
      window.dispatchEvent(new Event('intuit-loaded'));
    }`)
    const intuit = this.insertScript()
    intuit.onload = window.triggerIntuitLoaded
    intuit.src = 'https://appcenter.intuit.com/Content/IA/intuit.ipp.anywhere.js'
    this.insertScript(`window.addEventListener('intuit-loaded', function() {
      console.log('on intuit-loaded event');
      intuit.ipp.anywhere.setup({
        grantUrl: 'https://7c6zaeerdd.execute-api.us-east-1.amazonaws.com/latest/requestToken',
        datasources: {
                 quickbooks : true,
                 payments : false 
           }
      });
    })`)
  },

  shouldComponentUpdate(nextProps, nextState) {
    // console.log('SCU - np, thP:', nextProps, this.props)
    // return nextProps !== this.props || nextState !== this.state
    return false
  },

  insertScript(text) {
    const script = document.createElement('script')
    if (text) {
      script.text = text
    }
    document.body.appendChild(script)
    return script
  },

  renderQBLogin() {
    // we wrap QBO's button in a template string
    // becuase it has some stuff that isn't supported by JSX and react
    // like xml name spaces
    return {
      __html: '<ipp:connectToIntuit></ipp:connectToIntuit>',
    }
  },

  render() {
    console.log('rendering QBOButton')
    return (
      <div className='item' dangerouslySetInnerHTML={this.renderQBLogin()} />
    )
  },
})

export default QBOButton
