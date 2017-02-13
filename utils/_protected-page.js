import React, { Component } from 'react'
import { autorun } from 'mobx';
import { observer } from 'mobx-react'
import Router from 'next/router'
import { getAuthStore } from '~/env/stores'
import { LoadingPage } from '~/ui/generic'

export default function protectedPage(UI) {
    return observer(class ProtectedPage extends Component {

        componentDidMount() {
            this.disposer = autorun(() => {
                if (typeof window !== 'undefined'
                    && !getAuthStore().authIsPending
                    && !getAuthStore().isAuthenticated
                ) {
                    Router.push('/access-denied')
                }
            })
        }

        componentWillUnmount(){
            this.disposer();
        }

        render() {
            return (
                <div>
                    {
                        getAuthStore().authIsPending || !getAuthStore().isAuthenticated ?
                            <LoadingPage /> :
                            <UI />
                    }
                </div>
            )
        }
    })
}