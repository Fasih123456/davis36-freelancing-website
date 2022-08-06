import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import screen1 from './screen1';
import Record from './newrecord';
import Screen2 from './screen2';
import NodeAdd from './nodeadd';
import Screen3 from './screen3';

const App = () => {
  return(
      <div>
          <BrowserRouter>
            <React.Fragment>
              <Route path="/products/" exact  component={Screen2} />
              <Route path="/product-add/" exact component={Record} />
              <Route path="/node-add/" exact component={NodeAdd} />
              <Route path="/screen3/" exact component={Screen3} />
            </React.Fragment>
          </BrowserRouter>
      </div>
  );
};

export default App;


