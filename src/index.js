import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'

Notification.requestPermission(function (status) {
  console.log('Notification permission status:', status)
})

ReactDOM.render(<App />, document.getElementById('index'))
