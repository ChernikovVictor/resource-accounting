import React from 'react';
import ReactDOM from 'react-dom';
import App from './modules/app';
import UserInfoProvider from './modules/user-info-provider';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <UserInfoProvider>
                <App />
            </UserInfoProvider>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);
