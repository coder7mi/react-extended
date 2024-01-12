import React from 'react'
import IndexRouter from './router/IndexRouter'
import './App.css'
import { store, persistor } from './redux/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

export default function App() {
  return (
    <div className="app">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <IndexRouter></IndexRouter>
        </PersistGate>
      </Provider>
    </div>
  )
}
