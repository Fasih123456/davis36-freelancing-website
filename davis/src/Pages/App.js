import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';


import '../css/App.css';

const App = () => {
  return(
      <div>
          <BrowserRouter>
            <React.Fragment>
              <Route path="/" exact  component={home} />
            </React.Fragment>
          </BrowserRouter>
      </div>
  );
};

export default App;
