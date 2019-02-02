import * as React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';

import { FetchNaselje } from './components/FetchNaselje';
import { AddNaselje } from './components/AddNaselje'; 

export const routes =
    <Layout>
        <Route exact path='/' component={Home} />
        <Route path="/fetchnaselje" render={props => <FetchNaselje {...props} />} />
        <Route path='/addnaselje(/:nasid)'/>
        <Route path='/naselje/edit(/:nasid)' />
    </Layout>;
