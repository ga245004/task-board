app
    .controller('newTaskController', function ($scope, $uibModalInstance) {
        $scope.newTask = {
            summary: '',
            content: '#New Task',
            status: 0
        };

        $scope.add = function () {
            $uibModalInstance.close($scope.newTask);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    });