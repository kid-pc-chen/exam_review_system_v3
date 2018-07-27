import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'

import { Provider } from 'react-redux'
import store from './store/store.js'
import ExamReviewer from './components/components.js'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h1 className='App-title'>Welcome to Exam Review System v3.</h1>
        </header>
        <p className='App-intro'>
          This toy project helps me to learn React.js + react-redux.
        </p>
        <div className='App-content'>
          <Provider store={store}>
            <ExamReviewer />
          </Provider>
        </div>
      </div>
    )
  }
}

export default App
