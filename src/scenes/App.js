import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
//
//Config
import { initGoogleClient } from '../config/googleClient';

//Components / Scenes
import {
    CreateCustomerForm,
    SplashLoading,
    RegisterCompany,
    SideBar,
    TopBar,
} from '../components';
=======
import { Navigation, CreateCustomerForm, SplashLoading, RegisterCompany, InviteTech } from '../components';
>>>>>>> e384255dc1c0f10a16708ed64374002c716a13c7

import Calendar from './Calendar';
import Auth from './Auth';
import Dashboard from './Dashboard';
import Me from './Me';

//Styles
import RootContainer from '../components/styles/containers/RootContainer';
import MainContainer from '../components/styles/containers/MainContainer';

//Constants
import { routes } from '../constants/routes';

//State
import { useStateValue } from '../state';
import { actions } from '../state/auth/authActions';

//Fire
import Firebase from '../config/firebase';

import { CssBaseline } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        height: 48,
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },
}));

function App() {
    const [{ auth }, dispatch] = useStateValue();
    const [isLoading, setIsLoading] = useState(true);
    const classes = useStyles();

    useEffect(() => {
        //Initiliaze Google API
        initGoogleClient();

        //Auth Change With Firebase
        Firebase.onAuthStateChanged(user => {
            if (user !== null) {
                actions.getOrCreateCurrentUser(dispatch, user);
                setIsLoading(false);
            } else {
                setIsLoading(false);
            }
        });
    }, [dispatch]);

    if (isLoading) {
        return <SplashLoading />;
    } else {
        return (
            <BrowserRouter>
                <div className={classes.root}>
                    <CssBaseline />
                    <TopBar />
                    <SideBar />
                    <main className={classes.content}>
                        <div className={classes.toolbar} />

                        <Route exact path={routes.AUTH} component={Auth} />
                        <Route path={routes.HOME} component={Dashboard} />
                        <Route path={routes.PROFILE} component={Me} />
                        <Route path={routes.CALENDAR} component={Calendar} />

                        <CreateCustomerForm />
                        <RegisterCompany />
                        <RegisterCompany />
                        <RegisterCompany />
                        <RegisterCompany />
                        <RegisterCompany />
                    </main>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
