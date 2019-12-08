// Routes
import homepage from './routes/homepage';
import staff from './routes/staff';
import nhacungcap from './routes/nhacungcap';
import customer from './routes/customer';
import hanghoa from './routes/hanghoa';
import phieumuahang from './routes/phieumuahang';
import hoadonbanhang from './routes/hoadonbanhang';


let routes = [].concat(homepage, staff,nhacungcap,customer,hanghoa,phieumuahang,hoadonbanhang);

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
};

routes = convertNestedRoutes(routes);

export default routes;