(function () {
    angular
        .module('tutorialWebApp')
        .controller('ServicesCtrl', ServicesCtrl);


    function ServicesCtrl($scope, $filter, UsersCollection, UserModel) {
        var orderBy = $filter('orderBy');
        $scope.users = UsersCollection.initCollection();
        $scope.newUser = new UserModel();

        $scope.addNewUser = function () {
            var data = {};
            data.id = $scope.id;
            data.name = $scope.name;
            data.age = $scope.age;
            $scope.users.addItems(data);
            $scope.id = '';
            $scope.name = '';
            $scope.age = '';
            $scope.bgColorId = {};
            $scope.bgColorAge = {};
            $scope.bgColorName = {};
        };
        $scope.editUserAction = function (user) {
            user.editModeOn = true;
            $scope.users.editMode(user);

            $scope.getEditedNameValidationClass = function (formname) {
                if (formname.currentName.$error.minlength || formname.currentName.$error.maxlength) {
                    return "validationError"
                }
                else if (formname.currentName.$valid) {
                    return "validationSuccess"
                }
            };
            $scope.getEditedAgeValidationClass = function (formname) {
                if (formname.currentAge.$error.min || formname.currentAge.$error.max) {
                    return "validationError"
                }
                else if (formname.$valid) {
                    return "validationSuccess"
                }
            };


            $scope.enableSaveButton = function (currentUserName, currentUserAge) {
                return (currentUserName.$invalid || currentUserAge.$invalid);
            };

            $scope.saveChangesAction = function (user) {
                if (user.name && user.age) {
                    user.editModeOn = false;
                    $scope.users.saveChanges(user);
                }
            };

            $scope.cancelChangesAction = function (user) {
                user.editModeOn = false;
                $scope.users.cancelChanges(user);
            };
        };
        $scope.deleteUserAction = function (index) {
            $scope.users.deleteUser(index);
        };


        $scope.getIdValidationClass = function (addUser) {
            if ($scope.users.validateId($scope.id)) {
                $scope.idHintVisibility2 = true;
                return "validationError"
            }
            else if (addUser.newId.$error.max || addUser.newId.$error.min) {
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
        $scope.getNameValidationClass = function (addUser) {
            if (addUser.newName.$error.minlength || addUser.newName.$error.maxlength) {
                return "validationError"
            }
            else if (addUser.newName.$valid) {
                return "validationSuccess"
            }
            else return ""
        };
        $scope.getAgeValidationClass = function (addUser) {
            if (addUser.newAge.$error.min || addUser.newAge.$error.max) {
                return "validationError"
            }
            else if (addUser.newAge.$valid) {
                return "validationSuccess"
            }
            else return ""
        };
        $scope.enableAddButton = function (addUser) {
            return (addUser.$invalid || $scope.users.validateId($scope.id));
        };
        $scope.checkingUsersCount = function () {
            return ($scope.users.items.length);
        };
        $scope.order = function(predicate) {
            $scope.predicate = predicate;
            $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
            $scope.users.items = orderBy($scope.users.items, predicate, $scope.reverse);
        };
    }
})();
