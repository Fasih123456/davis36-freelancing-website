import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import screen1 from './screen1';
import Record from './newrecord';


const App = () => {
  return(
      <div>
          <BrowserRouter>
            <React.Fragment>
              <Route path="/products/" exact  component={screen1} />
              <Route path="/product-add/" excat component={Record} />
            </React.Fragment>
          </BrowserRouter>
      </div>
  );
};

export default App;


