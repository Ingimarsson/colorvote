import React from 'react';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import Navbar from './components/Navbar';

import ElectionsPage from './components/pages/ElectionsPage';
import ElectionPage from './components/pages/ElectionPage';
import TransactionsPage from './components/pages/TransactionsPage';
import VotePage from './components/pages/VotePage';

function App() {
  return (
    <Router>
      <Navbar />
      <Route exact path='/' component={ElectionsPage} />
      <Route exact path='/election/:address' component={ElectionPage} />
      <Route exact path='/transactions' component={TransactionsPage} />
      <Route exact path='/vote' component={VotePage} />
    </Router>
 );
}

export default App;
