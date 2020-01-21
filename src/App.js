import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Form from './pages/Form';
import StringUtils from './pages/StringUtils';

import './scss/globals/index.scss';

function App() {
  return (
    <div id="iam-js-app">
      <Router>
        <Switch>
          <Route exact path="/custom-hooks/use-form" component={Form} />
          <Route exact path="/utils/strings" component={StringUtils} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
