import App from '../containers/App';
import RestaurantDetail from '../containers/RestaurantDetail';
import RestaurantList from '../containers/RestaurantList';
import RestaurantForm from '../containers/RestaurantForm';
import Home from '../containers/Home';

const routes = [
    {
        component : App,
        routes    : [
            {
                path      : '/',
                exact     : true,
                component : Home,
            },
            {
                path      : '/restaurants',
                component : RestaurantList,
            },
            {
                path      : '/restaurant/:id',
                component : RestaurantDetail,
            },
            {
                path      : '/add',
                component : RestaurantForm,
            },
        ],
    },
];

export default routes;
