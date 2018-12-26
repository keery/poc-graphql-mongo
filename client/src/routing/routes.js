import App from '../container/App';
import RestaurantDetail from '../Components/RestaurantDetail';
import RestaurantList from '../Components/RestaurantList';
import RestaurantForm from '../Components/RestaurantForm';

const routes = [
    {
        component : App,
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
            {
                path      : '/add',
                component : RestaurantForm,
            },
        ],
    },
];

export default routes;
