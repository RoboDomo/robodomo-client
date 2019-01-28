import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Dashboard from "routes/Dashboard";
import Weather from "routes/Weather";

class App extends Component {
  render() {
    return (
      <Router>
        <>
          <nav>
            <Link to="/">Dashboard</Link> | <Link to="/weather">Weather</Link>
          </nav>
          <Route path="/" exact component={Dashboard} />
          <Route path="/Dashboard" component={Dashboard} />
          <Route path="/weather" component={Weather} />
        </>
      </Router>
    );
  }
}

export default App;
