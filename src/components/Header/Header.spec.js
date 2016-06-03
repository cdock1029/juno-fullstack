import React from 'react'
import { expect } from 'chai'
import { shallow, mount } from 'enzyme'

import Header from './Header'

describe('<Header />', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(<Header />)
  })

  it('has 3 div components', () => {
    const div = wrapper.find('div')
    expect(div).to.have.length(3)
    // expect(div.props().className).to.equal('ui top fixed menu')
    // expect(div.props().to).to.equal('/')
  })

  it('the top Div component has className="ui top fixed menu"', () => {
    const div = wrapper.find('div').at(0)
    // console.log('**DEBUG**', div.debug())
    expect(div.props().className).to.equal('ui top fixed menu')
  })
})
