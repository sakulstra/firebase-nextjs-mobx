import React, { Component, PropTypes } from 'react';
import { Provider } from 'mobx-react';
import { initBaseStore } from '~/env';

export default function initializePage(UI) {
    return class PageComponent extends Component {
        static getInitialProps({req}) {
            const isServer = !!req;
            const store = initBaseStore(isServer);
            return {helloMessage: store.helloMessage, isServer}
        }

        constructor(props) {
            super(props);
            this.store = initBaseStore(props.isServer, props.helloMessage);
        }

        render() {
            return (
                <Provider BaseStore={this.store}>
                    <div>
                        <style jsx global>{`body { margin: 0; padding: 0; }`}</style>
                        <UI />
                    </div>
                </Provider>
            )
        }
    }
}