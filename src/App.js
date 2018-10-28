import React, { Component } from 'react'
import axios from 'axios'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { quotes: [] };
    }

    async getQuotes() {
        const { data } = await axios.get('/api/quotes')
        console.log(data)
        return data
    }

    displayNotification(notificationMessage) {
        if (Notification.permission == 'granted') {
            navigator.serviceWorker.getRegistration().then(function (reg) {
                reg.showNotification(notificationMessage);
            });
        }
    }

    async componentDidMount() {
        this.setState({ quotes: await this.getQuotes() })
    }

    render() {
        return <div className="container">
            <div className="row">
                <div className="col text-center">
                    <h1>React PWA</h1>
                </div>
            </div>
            {
                this.state.quotes.map((quote, key) => {
                    return <div key={key} className="row text-center">
                        <div className="col">
                            <div className="card bg-dark shadow-sm">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-sm-10 p-1">
                                            <h6>{quote.text}</h6>
                                        </div>
                                        <div className="col-sm-2">
                                            <button className="btn btn-default" onClick={() => this.displayNotification(quote.text)}>Notify</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                })
            }
        </div>
    }
}

export default App
