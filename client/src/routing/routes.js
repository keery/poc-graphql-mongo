import App from '../container/App';
import RestaurantDetail from '../Components/RestaurantDetail';
import RestaurantList from '../Components/RestaurantList';
import RestaurantForm from '../Components/RestaurantForm';
import Home from '../Components/Home';

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
