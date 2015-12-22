var Router = require('falcor-router');
var $atom = require('falcor').Model.atom;

var data = {
    items: [
        {name: "Новости", href: "/news"}, 
        {name: "Наши тест-драйвы", href: "/drive-tests"},
        {name: "Наши видео" , href: "/video"},
        {name: "Контакты" , href: "/contacts"}
    ]
};
    
var NavigationRouter = Router.createClass([
        {
            route: "items",
            get: function() {
                return {path:["items"], value: $atom(data.items)};
            }
        },
        {
            route: 'items.add',
            call: (callPath, args) => {
                console.log(callPath, args);
                var newItem = args[0];

                return [
                    {
                        path: ['items', items.length-1],
                        value: newItem
                    },
                    {
                        path: ['items', 'length'],
                        value: items.length
                    }
                ]
            }
        }
    ]);

module.exports = NavigationRouter;