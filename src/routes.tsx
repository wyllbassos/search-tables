import React from 'react';
/*
import Landing from './pages/Landing'
import TeacherList from './pages/TeacherList'
import TeacherForm from './pages/TeacherForm'
*/

import PaginaInicial from './pages/PaginaInicial'

import { BrowserRouter, Route } from 'react-router-dom'

function Routes() {
    return (
        /*
        <BrowserRouter>
            <Route path="/" exact component={Landing}/>
            <Route path="/study" component={TeacherList}/>
            <Route path="/give-classes" component={TeacherForm}/>
        </BrowserRouter>
        */
        <BrowserRouter>
            <Route path="/" exact component={PaginaInicial}/>
        </BrowserRouter>
    )
}

export default Routes;