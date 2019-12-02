import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import './scss/globals/index.scss';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route component={Home} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
