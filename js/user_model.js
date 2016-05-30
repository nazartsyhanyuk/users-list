(function () {
    angular
        .module('tutorialWebApp')
        .factory('UserModel', UserModel);

    function UserModel() {
        var CreateUser = function (data) {
            this.minUserId = 1;
            this.maxUserId = 10000;
            this.minUserAge = 18;
            this.maxUserAge = 100;
            this.minUserNameLength = 2;
            this.maxUserNameLength = 12;
            this.id = '';
            this.name = '';
            this.age = '';
            this.oldValues = {};
            this.initData(data);
        };

        CreateUser.prototype.editUserMode = function () {
            this.oldValues = {
                name: this.name,
                age: this.age
            }

        };

        CreateUser.prototype.saveUserChanges = function (newUserData) {
            if (newUserData) {
                this.name = newUserData.name;
                this.age = newUserData.age;
            }
        };

        CreateUser.prototype.cancelChanges = function () {
            this.name = this.oldValues.name;
            this.age = this.oldValues.age;
        };

        CreateUser.prototype.initData = function(data) {
            if (data) {
                this.id = data.id;
                this.name = data.name;
                this.age = data.age;
            }
        };
        
        return CreateUser;
    }
})();
