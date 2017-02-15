import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import App from './modules/App';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import TODO_APP_REDUCERS from './reducers'

injectTapEventPlugin();

let store = createStore(TODO_APP_REDUCERS);

render((
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/" component={App} />
      </Router>
    </Provider>
), document.getElementById('app'));