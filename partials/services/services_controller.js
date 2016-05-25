(function(){
    angular
        .module('tutorialWebApp')
        .controller('ServicesCtrl', ServicesCtrl);


    function ServicesCtrl($scope, UsersCollection) {
        var UsrColl = UsersCollection.initCollection();
        $scope.users = UsrColl.getItems();
        $scope.addUser = function() {
            var data = {};
            data.id = $scope.id;
            data.name = $scope.name;
            data.age = $scope.age;
            if(data.id && data.name && data.age) {
                UsrColl.addItems(data);
                $scope.id = '';
                $scope.name = '';
                $scope.age = '';
            }

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
        }


    }
})();
