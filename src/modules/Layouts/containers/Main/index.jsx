// Libraries
import React, {Component, Suspense} from 'react';
import {Route,Switch, withRouter, Redirect} from 'react-router-dom';

// Routes
import routes from '../../../../routes';

class Main extends Component {
    render() {
        return (
            <Suspense fallback={<div>Loading...</div>}>
                <Switch>
                    {
                        routes.map((route, index) => {
                            return route.component ? (
                                <Route
                                    key={index}
                                    path={route.path}
                                    exact={route.exact}
                                    name={route.name}
                                    render={props => <route.component {...props} />} 
                                />
                            ) : null
                        })
                    }
                    <Redirect to={'/homepage'} />
                </Switch>
            </Suspense>            
        )
    }
}

export default withRouter(Main)