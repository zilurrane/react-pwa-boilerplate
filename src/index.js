import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import { initializeFirebase } from './push-notification'

ReactDOM.render(<App />, document.getElementById('index'))
initializeFirebase()
