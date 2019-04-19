import React from 'react';
import {BrowserRouter,Route} from 'react-router-dom';
//Header NavBar
import {Header} from './Header';

import HomePage from './pages/HomePage';
import NewStudent from './pages/NewStudent';

const routes = () => {
    return(
        <div>
            <BrowserRouter>
            <Header/>
                <div>
                    <Route path="/" exact component={HomePage} />
                    <Route path="/home"  component={HomePage} />
                    <Route path="/new" component={NewStudent} />
                  
                    
                </div>
            </BrowserRouter>
        </div>
    )
}

export default routes;