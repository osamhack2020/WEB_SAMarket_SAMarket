import React from 'react';
import { BrowserRouter, Route, Link, } from 'react-router-dom';
import MainPage from './pages/MainPage';
import SignInPage from './pages/SignInPage';

export default function App() {
    return (
        <BrowserRouter>
            <Route exact path="/" component={MainPage} />
            <Route path="/signin" component={SignInPage} />
        </BrowserRouter>
    );
}