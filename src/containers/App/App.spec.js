import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'

import App from './App'

describe('<App />', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(<App />)
  })

  it('has a Router component', () => {
    expect(wrapper.find('Router')).to.have.length(1)
  })

  it('has a Redirect component', () => {
    const redir = wrapper.find('Redirect')
    expect(redir).to.have.length(1)
  })

  it('the Redirect component has from=*, to=/', () => {
    const redir = wrapper.find('Redirect')
    expect(redir.props().from).to.equal('*')
    expect(redir.props().to).to.equal('/')
  })
})
