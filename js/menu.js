
var MenuList = new Vue({
el: '#MenuList',
data: {
    //            queryPoint : 'https://jsonplaceholder.typicode.com/posts',
//    queryPoint: 'http://workprojectmobile/www/php/menu-query.php',
    //            queryPoint: '/php/menu-query.php',
                queryPoint: 'http://d0008482.atservers.net/Felix/menu-query.php',
    posts: {},
    post: {},
    error: false,
    listFavorite: []
},
methods: {
    getPosts: function () {
        //Параметры запроса
        var options = {
            params: {
                //_start: 0,
                //_limit: 1
            },
            headers: {
                //'Content-Type': 'application/json'
            }
        }
        this.$http.get(this.queryPoint, options).then(function (response) {
            // Запрос на сервер, получение всех блюд
            this.posts = JSON.parse(response.data);
            Local.Set("Menu",this.posts);
            console.log(this.posts);

        }, function (error) {
            this.error = false;
            this.OfflineMenu();
            //                    alert(error.date);
            console.log("Ошибка запроса: " + error.data);
        });


    },
    OfflineMenu: function(){
        let status;
        let localMenu = Local.Get("Menu");
        this.posts = localMenu;

//        let status;
//        let localMenu = Local.Get("Menu");
//        if(localMenu > 0 ){
//            this.posts = localMenu;
//        }else{
//            status = true;
//        }
//        return status;
    },   
    favorite: function (post) {
        //Функция добавления/удаления в список избранного
        let IsSearch; //Переменная флаг, найдено/не найдено 
        if (this.listFavorite.length != 0) {
            // Цикл для поиска в массиве избранного, если не найдено помечает переменной IsSearch = true,
            // после чего добавляет в массив
            for (var i = 0; i < this.listFavorite.length; i++) {
                if (this.listFavorite[i].ID_dish == post.ID_dish) {
                    this.listFavorite.splice(i, 1);

                    Local.Set("Favorite", this.listFavorite);
                    //                            this.AddLocalFavorite(this.listFavorite);
                    IsSearch = false;
                    break;
                } else {
                    IsSearch = true;
                }
            }
            // Добавление в массив если значений небыло найдено
            if (IsSearch) {
                this.listFavorite.push(post);
                Local.Set("Favorite", this.listFavorite);
                //                            this.AddLocalFavorite(this.listFavorite);
            }
        } else {
            // Если в массиве избранных нет записей, то добавить.
            this.listFavorite.push(post);
            Local.Set("Favorite", this.listFavorite);
            //                    this.AddLocalFavorite(this.listFavorite);
        }
    },
    localFavorite: function () {
        
        //Если localStorage не пустой, считать данные в лист избранного
        this.listFavorite = Local.Get("Favorite");
    },
    checkFav: function (postFav) {
        // Функция проверки записи в списке избранного, изменяет состояние иконки
        for (let i = 0; i < this.listFavorite.length; i++) {
            if (this.listFavorite[i].ID_dish == postFav.ID_dish) {
                return true;
            }
        }
    },
    AddOrder: function (item) { // Добавить в корзину
        Order.Add(item);
    },
    Test: function(){
        Sync("Favorite");
    }
},
created: function () {
    this.getPosts() // Получить все блюда
    this.localFavorite(); // Считывает массив избранного из localStorage
    

}
});