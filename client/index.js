import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, Router, Route, IndexRedirect, Redirect } from 'react-router';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import shortid from 'shortid';
import io from 'socket.io-client';

import '!style!css!./global.css'; // eslint-disable-line import/no-unresolved
import touchMiddleware from './utils/touchMiddleware';
import userIdMiddleware from './utils/userIdMiddleware';
import socketMiddleware from './utils/socketMiddleware';
import localUserMiddleware from './utils/localUserMiddleware';
import reducer from './reducer';
import App from './containers/App';
import Room from './containers/Room';

const socket = process.env.NODE_ENV === 'development'
  ? io.connect('http://localhost:8000')
  : io.connect('198.46.131.235:3000');

const store = createStore(
  combineReducers({
    ...reducer,
    routing: routerReducer,
  }),
  process.env.NODE_ENV === 'development'
    ? compose(
      applyMiddleware(
        touchMiddleware,
        userIdMiddleware,
        socketMiddleware(socket),
        localUserMiddleware
      ),
      window.devToolsExtension && window.devToolsExtension()
    )
    : applyMiddleware(
      touchMiddleware,
      userIdMiddleware,
      socketMiddleware(socket),
      localUserMiddleware
    )
);

const history = syncHistoryWithStore(browserHistory, store);

const RoomContainer = props => <Room socket={socket} {...props} />;

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRedirect to={`room/${shortid.generate()}`} />
        <Route
          path="room/:id"
          component={RoomContainer}
        />
        <Redirect from="*" to="/" />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
