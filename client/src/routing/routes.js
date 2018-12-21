import App from '../container/App';
import RestaurantDetail from '../Components/RestaurantDetail';
import RestaurantList from '../Components/RestaurantList';

const routes = [
    {
        component : App, // Top component of all pages.
        routes    : [
            {
                path      : '/restaurants',
                exact     : true,
                component : RestaurantList,
            },
            {
                path      : '/restaurant/:id',
                component : RestaurantDetail,
            },
        ],
    },
];

export default routes;
