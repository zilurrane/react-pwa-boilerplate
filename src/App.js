import React, { Component } from 'react'
import axios from 'axios'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = { quotes: [] }
    }

    async getQuotes() {
        const { data } = await axios.get('https://zreact-pwa-api.cfapps.io/api/quotes')
        console.log(data)
        return data
    }

    displayNotification(notificationMessage) {
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

    async componentDidMount() {
        this.setState({ quotes: await this.getQuotes() })
        navigator.mediaDevices.getUserMedia({
            video: true
        })
            .then((stream) => {
                this.player.srcObject = stream
            })
    }

    captureImage() {
        const context = canvas.getContext('2d')
        context.drawImage(this.player, 0, 0, this.canvas.width, this.canvas.height)
    }

    render() {
        return <div className='container'>
            <div className='row'>
                <div className='col text-center mt-5'>
                    <h1>React PWA</h1>
                    <h6>
                        v1.1
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
                                    <video id='player' ref={player => this.player = player} className='col-md-12' autoPlay />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col'>
                                    <button onClick={() => this.captureImage()} className='btn btn-default btn-block' id='capture'>Capture</button>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col text-center'>
                                    <canvas id='canvas' ref={canvas => this.canvas = canvas} className='col-md-12' />
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
