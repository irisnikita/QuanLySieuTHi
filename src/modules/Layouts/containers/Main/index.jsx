// Libraries
import React, { Component, Suspense } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

//Component
import Header from '../Header/index';

// Routes
import routes from '../../../../routes';

//asets
import './style.css';

class Main extends Component {
    render() {
        return (
            <>
                <Header />
               <div className='container-fluid relative-layout'>
                    <Suspense
                        fallback={
                            <div className='progress'>
                                <div
                                    className='progress-bar progress-bar-striped progress-bar-animated'
                                    role='progressbar'
                                    aria-valuenow='75'
                                    aria-valuemin='0'
                                    aria-valuemax='100'
                                    style={{width: "75%"}}
                                ></div>
                            </div>
                        }
                    >
                        <Switch>
                            {routes.map((route, index) => {
                                return route.component ? (
                                    <Route
                                        key={index}
                                        path={route.path}
                                        exact={route.exact}
                                        name={route.name}
                                        render={props => <route.component {...props} />}
                                    />
                                ) : null;
                            })}
                            <Redirect to={'/homepage'} />
                        </Switch>
                    </Suspense>
                </div>
            </>
        );
    }
}

export default withRouter(Main);
