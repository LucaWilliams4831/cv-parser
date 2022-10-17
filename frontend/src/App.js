import React, { useState, useCallback } from 'react';
import { 
  BrowserRouter as Router, 
  Route, 
  Redirect, 
  Switch 
} from 'react-router-dom';

import { SkillContext } from './components/skill-context';
import { PositionContext } from './components/position-context';

// CSS
import 'bootstrap/dist/css/bootstrap.min.css';

import NavBar from './components/NavBar';
import Footer from './components/Footer';

import Landing from './components/Landing';
import Position from './components/Position';

const App = () => {
  const [search, setSearch] = useState("");
  const [position, setPosition] = useState("");

  const searched = useCallback((searchText) => {
    setSearch(searchText);
  }, []);

  const positioned = useCallback((positionText) => {
    setPosition(positionText);
  }, []);

  let routes;
  routes = (
    <Switch>
      <Route path="/" exact>
        <Landing />
      </Route>
      <Route path="/position" exact>
        <Position />
      </Route>
      <Redirect to="/" />
    </Switch>
  )

  return (
    <Router>
      <SkillContext.Provider value={{ search: search, searched: searched }}>
        <PositionContext.Provider value={{ position: position, positioned: positioned }}>
          {/* <NavBar /> */}
          {routes}
          {/* <Footer /> */}
        </PositionContext.Provider>
      </SkillContext.Provider>
    </Router>
  );
}

export default App;
