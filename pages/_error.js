import React, { Component } from 'react'
import Router from 'next/router'

export default class Error extends Component {
  static getInitialProps ({ res, jsonPageRes }) {
    const statusCode = res ? res.statusCode : (jsonPageRes ? jsonPageRes.status : null)
    return { statusCode }
  }

  render () {
    return (
      <div style={{
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
      }}>
        <img src='/static/img/error.jpg' />
        <div>{`Error | ${this.props.statusCode}`}<br />You'll be redirected in a second</div>
        <LoadingComponent ticks={5} />
      </div>
    )
  }
}

class LoadingComponent extends Component {
  state = {
    ticks: 0
  }

  tickCallback = () => {
    if (this.state.ticks === this.props.ticks) return Router.push('/')
    const {ticks} = this.state
    setTimeout(() => {
      this.setState({ ticks: ticks + 1 })
      this.tickCallback()
    }, 500)
  }

  componentDidMount () {
    this.tickCallback()
  }

  renderHashes = () => {
    let response = ''
    for (let i = 0; i <= this.state.ticks; i++) {
      response = `${response}#`
    }
    return <div>{response}Redirecting{response}</div>
  }

  render () {
    return (
      <div>
        {this.renderHashes()}
      </div>
    )
  }
}
