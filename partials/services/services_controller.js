(function(){
    angular
        .module('tutorialWebApp')
        .controller('ServicesCtrl', ServicesCtrl);


    function ServicesCtrl($scope, UsersCollection) {
        var UsrColl = UsersCollection.initCollection();
        $scope.users = UsrColl.getItems();
        
        
        $scope.addNewUser = function() {
            var data = {};
            data.id = $scope.id;
            data.name = $scope.name;
            data.age = $scope.age;
                UsrColl.addItems(data);
                $scope.id = '';
                $scope.name = '';
                $scope.age = '';
                $scope.bgColorId={};
                $scope.bgColorAge={};
                $scope.bgColorName={};
        };
        $scope.editUserAction = function(user) {
                user.editModeOn = true;
                UsrColl.editMode(user);

            $scope.saveChangesAction = function(user) {
                if(user.name && user.age) {
                    user.editModeOn = false;
                    UsrColl.saveChanges(user);
                }
            };
            
            $scope.cancelChangesAction = function(user) {
                user.editModeOn = false;
                UsrColl.cancelChanges(user);
            };
        };
        $scope.deleteUserAction = function(index) {
            UsrColl.deleteUser(index);
        };


        $scope.getIdValidationClass = function(addUser) {
            if(UsrColl.validateId($scope.id)) {
                $scope.idHintVisibility2 = true;
                return "validationError"
            }
            else if(addUser.newId.$error.max || addUser.newId.$error.min) {
                $scope.idHintVisibility2 = false;
                $scope.idHintVisibility1 = true;
                return "validationError"
            }
            else if (addUser.newId.$valid) {
                $scope.idHintVisibility1 = false;
                $scope.idHintVisibility2 = false;
                return "validationSuccess"
            }
            else {
                $scope.idHintVisibility1 = false;
                $scope.idHintVisibility2 = false;
                return ""
            }
        };
        $scope.getNameValidationClass = function(addUser) {
            if(addUser.newName.$error.minlength || addUser.newName.$error.maxlength) {
                return "validationError"
            }
            else if(addUser.newName.$valid) {
                return "validationSuccess"
            }
            else return ""
        };
        $scope.getAgeValidationClass = function(addUser) {
            if(addUser.newAge.$error.min || addUser.newAge.$error.max) {
                return "validationError"
            }
            else if(addUser.newAge.$valid) {
                return "validationSuccess"
            }
            else return ""
        };
        $scope.enableAddButton = function(addUser) {
            return (addUser.$invalid || UsrColl.validateId($scope.id));
        };
        $scope.checkingUsersCount = function() {
            return ($scope.users.length);
        };

        


    }
})();
