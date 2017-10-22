import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch
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
          {/* What Switch does is, instead of rendering all routes that are active, Switch is going to render just one specific route – the very first one it finds a match for. This allous us to specify a 404 page. */}
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/battle" component={Battle}></Route>
            <Route path="/popular" component={Popular}></Route>
            {/* We can pass in a render prop to <Route />, which takes in a functional component, to tell <Router /> to render something when no match is found */}
            <Route render={ () => {
              return <p>Not found</p>
            }} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App
