import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

@inject('BaseStore') @observer
export default class FriendlyHello extends Component {

  componentDidMount () {
    this.props.BaseStore.start()
  }

  componentWillUnmount () {
    this.props.BaseStore.stop()
  }

  render () {
    return (
      <div className='friendlyHello'>
        <style jsx>{`
                    .friendlyHello { color: blue }
                `}</style>
        {this.props.BaseStore.helloMessage}
      </div>
    )
  }
}
