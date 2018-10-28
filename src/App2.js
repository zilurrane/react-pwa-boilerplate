import React, { Component } from 'react'
import axios from 'axios'
import Webcam from 'react-webcam'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = { quotes: [] }
    this.webcamRef = React.createRef()
  }

  capture () {
    const imageSrc = this.webcam.getScreenshot()
    this.canvas.src = imageSrc
  };

  async getQuotes () {
    const { data } = await axios.get('https://zreact-pwa-api.cfapps.io/api/quotes')
    console.log(data)
    return data
  }

  displayNotification (notificationMessage) {
    if (Notification.permission == 'granted') {
      navigator.serviceWorker.getRegistration().then(function (reg) {
        reg.showNotification(notificationMessage, {
          icon: 'favicon144.png',
          vibrate: [100, 50, 100],
          data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
          }
        }
        )
      })
    }
  }

  async componentDidMount () {
    this.setState({ quotes: await this.getQuotes() })
  }

  render () {
    return <div className='container'>
      <div className='row'>
        <div className='col text-center mt-5'>
          <h1>React PWA</h1>
          <h6>
                        v1.0
          </h6>
          <h1 className='text-danger'>&hearts;</h1>
        </div>
      </div>
      {
        this.state.quotes.map((quote, key) => {
          return <div key={key} className='row text-center'>
            <div className='col'>
              <div className='card bg-dark shadow-sm'>
                <div className='card-body'>
                  <div className='row'>
                    <div className='col-sm-10 p-1'>
                      <h6>{quote.text}</h6>
                    </div>
                    <div className='col-sm-2'>
                      <button className='btn btn-default' onClick={() => this.displayNotification(quote.text)}>Notify</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        })
      }
      <div className='row'>
        <div className='col'>
          <div className='card bg-dark shadow-sm'>
            <div className='card-body'>
              <div className='row'>
                <div className='col text-center'>
                  <Webcam className='col-md-12'
                    audio={false}
                    ref={webcam => this.webcam = webcam}
                    screenshotFormat='image/jpeg'
                    videoConstraints={{
                      width: 1280,
                      height: 720,
                      facingMode: 'user'
                    }}
                  />
                </div>
              </div>
              <div className='row'>
                <div className='col'>
                  <button onClick={() => this.capture()} className='btn btn-default btn-block' id='capture'>Capture</button>
                </div>
              </div>
              <div className='row'>
                <div className='col text-center'>
                  <img ref={canvas => this.canvas = canvas} id='canvas' className='col-md-12' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  }
}

export default App
