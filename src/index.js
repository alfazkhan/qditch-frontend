import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from "react-router-dom"
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import Reducer from './store/Reducers/Reducer'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react'
import { Loader } from './Components/Loader/Loader';


const persistConfig = {
  key: 'root',
  storage
}
const persistedReducer = persistReducer(persistConfig, Reducer)
let store = createStore(persistedReducer)
let persistor = persistStore(store)
console.log(storage)


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <PersistGate loading={<Loader/>} persistor={persistor}>
        <App />
      </PersistGate>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
