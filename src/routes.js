// Routes
import homepage from './routes/homepage';
import staff from './routes/staff';


let routes = [].concat(homepage, staff);

// Convert nested routes to simple routes
const convertNestedRoutes = (routes) => {
    try {
        if (routes.length) {
            routes.forEach((route) => {
                if (route.resources && route.resources.length) {
                    routes = routes.concat(convertNestedRoutes(route.resources));
                }
            });
        }
        return routes;
    } catch (error) {
        // Error
    }
}

routes = convertNestedRoutes(routes);

export default routes;