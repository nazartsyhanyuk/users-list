(function(){
    angular
        .module('tutorialWebApp')
        .factory('UsersCollection', UsersCollection);


    function UsersCollection(UserModel) {
        var items = JSON.parse(localStorage.getItem('items')) || [];//[{id: 1, name: 'Andrew', age: 20}, {id: 2, name: 'Josh', age: 21}, {id: 3,name: 'George',age: 22}];
        var Users = function(data){
            this.items = [];
            if (data) {
                this.initData(data);
            }
        };
        Users.prototype = {

            addItems: function(data) {
               if(this.validateNewUser(data)) {
                   this.items.push(new UserModel(data));
                   localStorage.setItem('items', JSON.stringify(this.items));
               }
                else {
                   alert("user with this id is already exists!");
               }
            },
            initData: function(data) {
                this.items = data.map(function(item){
                    return new UserModel(item);
                });
            },
            getItems: function() {
                return this.items;
            },
            editMode: function(currentUser) {
                currentUser.editUserMode();
                console.log(currentUser);
            },
            
            saveChanges: function(currentUser) {
                    currentUser.saveUserChanges(currentUser);
                    console.log(currentUser);
                    localStorage.setItem('items', JSON.stringify(this.items));
            },
            cancelChanges: function(currentUser) {
                currentUser.cancelChanges();
                console.log(currentUser);
            },
            validateNewUser: function(currentUser) {
                return !this.items.filter(function(item){
                    return currentUser.id==item.id
                }).length;
            },
            deleteUser: function(index) {
                this.items.splice(index, 1);
                localStorage.setItem('items', JSON.stringify(this.items));
            },
            validateId: function(id) {
                return this.items.filter(function(item){
                    return id==item.id
                }).length;
            }
            


        };
        Users.initCollection = function() {
            return new Users(items);
        };
        return Users;
    }
})();
