import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import { browserHistory } from 'react-router'
import rootReducer from './reducers'
import { updateLocation } from './location'

export default (initialState = {}) => {
  // ======================================================
  // Middleware Configuration
  // ======================================================
  const middleware = [thunk]

  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers = []
  if (__DEV__) {
    const devToolsExtension = window.devToolsExtension
    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension())
    }
  }


  const store = createStore(
        rootReducer,
        initialState,
        compose(
          applyMiddleware(...middleware),
        ...enhancers
      )
  )


        if (module.hot) {
          module.hot.accept('./reducers', () => {
            const reducers = require('./reducers').default
            store.replaceReducer(nextRootReducer)
          })
    }

  return store
}
