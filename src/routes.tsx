import React from 'react';

import PaginaInicial from './pages/PaginaInicial';

import { BrowserRouter, Route } from 'react-router-dom';

function Routes() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={PaginaInicial} />
    </BrowserRouter>
  );
}

export default Routes;
