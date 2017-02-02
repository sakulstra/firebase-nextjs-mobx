import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

@inject('AuthStore') @observer
class AvatarWidget extends Component {
  render () {
    return (
      <div>
        {/* this.props.AuthStore.user? <img src={this.props.AuthStore.user.photoURL} /> : null */}
        {this.props.AuthStore && this.props.AuthStore.user
            ? <button onClick={() => this.props.AuthStore.signOut()}>Logout</button>
            : <button onClick={() => this.props.AuthStore.signInWithGoogle()}>Login</button>
        }
      </div>
    )
  }
};
export default AvatarWidget
