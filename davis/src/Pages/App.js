import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import screen1 from './screen1';
import Record from './newrecord';
import Screen2 from './screen2';
import NodeAdd from './nodeadd';

const App = () => {
  return(
      <div>
          <BrowserRouter>
            <React.Fragment>
              <Route path="/products/" exact  component={Screen2} />
              <Route path="/product-add/" excat component={Record} />
              <Route path="/node-add/" excat component={NodeAdd} />
            </React.Fragment>
          </BrowserRouter>
      </div>
  );
};

export default App;


