(function(){
    angular
        .module('tutorialWebApp')
        .factory('UserModel', UserModel);

     function UserModel() {
       var CreateUser = function(data) {
           if(data) {
               this.id = data.id;
               this.name = data.name;
               this.age = data.age;
               this.oldValues = {

               }
           }
       };
         CreateUser.prototype.editUserMode = function(){
             this.oldValues = {
             //    id: this.id,
                 name: this.name,
                 age: this.age
             }

         },

         CreateUser.prototype.saveUserChanges = function(newUserData) {
                if(newUserData) {
             //this.id = newUserData.id;
             this.name = newUserData.name;
             this.age = newUserData.age;
                }
         }
         CreateUser.prototype.cancelChanges = function() {
           //  this.id = this.oldValues.id;
             this.name = this.oldValues.name;
             this.age = this.oldValues.age;
         }
         return CreateUser;
     }
})();
