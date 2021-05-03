import React from 'react';

import ConsultaEmTabelas from './pages/ConsultaEmTabelas';

import { BrowserRouter, Route } from 'react-router-dom';

function Routes() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={ConsultaEmTabelas} />
    </BrowserRouter>
  );
}

export default Routes;
