import Router from 'falcor-router';
import { Model } from 'falcor';
const $atom = Model.atom;

let data = {
    users: [
        {name: "Ivan"}, 
        {name: "Edward"},
        {name: "Richard"}
    ]
};
    
export default Router.createClass([
    {
        route: "users",
        get: function() {
            return {path:["users"], value: $atom(data.users)};
        }
    }
]);