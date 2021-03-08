import React, { Component } from 'react'
import GuestLayout from './Route/index'
import { BrowserRouter } from 'react-router-dom';


class App extends Component {
  render() {
    return (
        <BrowserRouter>
          <GuestLayout />
        </BrowserRouter>
    )
  };
}

export default App
