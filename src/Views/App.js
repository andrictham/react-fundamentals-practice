import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import './App.css'
import Nav from '../Components/Nav'
import Home from '../Views/Home'
import Battle from '../Views/Battle'
import Popular from '../Views/Popular'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Nav />
          <Route exact path="/" component={Home}></Route>
          <Route path="/battle" component={Battle}></Route>
          <Route path="/popular" component={Popular}></Route>
        </div>
      </Router>
    );
  }
}

export default App
