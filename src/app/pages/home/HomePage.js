/* eslint-disable no-lone-blocks */
import React, { Suspense, lazy } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { LayoutSplashScreen } from "../../../_metronic";
{
	/* =============Dashboard============= */
}
const Dashboard = lazy(() => import("../dashboard/Dashboard"));

const Error403 = lazy(() => import("../common/Error403"));

const ListUser = lazy(() =>
	import('../user/ListUser')
);
const ListRole = lazy(()=>
	import('../role/Role'))
const AddUser = lazy(() =>
	import('../user/AddUser')
);
export default function HomePage() {
	return (
		<Suspense fallback={<LayoutSplashScreen />}>
			<Switch>
				{
					/* Redirect from root URL to /dashboard. */
					<Redirect exact from="/" to="/dashboard" />
				}
				{/* Route other */}
				<Route path="/dashboard" component={Dashboard} />

				{/* <Redirect to="Error403" /> */}
				<Route path="/Error403" component={Error403} />
				{/* <Redirect to="Topic" /> */}						
				{/* <Redirect to="User" /> */}
				<Route path="/User/List" component={ListUser} />
				{/* <Redirect to="Role" /> */}
				<Route path="/Role/List" component={ListRole} />
				<Route path="/User/AddNew" component={AddUser} />

			</Switch>
		</Suspense >
	);
}

