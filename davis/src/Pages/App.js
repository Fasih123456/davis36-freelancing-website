import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Screen1 from './screen1';
import Record from './newrecord';
import Screen2 from './screen2';
import NodeAdd from './nodeadd';
import Screen3 from './screen3';
import Screen4 from './screen4';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const App = () => {
  return(
      <div>
          <BrowserRouter>
            <React.Fragment>
              <Route path="/" exact component={Screen1} />
              <Route path="/screen2/" exact  component={Screen2} />
              <Route path="/new-record/" exact component={Record} />
              <Route path="/node-add/" exact component={NodeAdd} />
              <Route path="/screen3/" exact component={Screen3} />
              <Route path="/screen4/" excat component={Screen4} />
            </React.Fragment>
          </BrowserRouter>
      </div>
  );
};

export default App;


